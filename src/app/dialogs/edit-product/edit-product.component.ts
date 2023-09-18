import {Component, ElementRef, ViewChild, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ProductService} from '../../services/product/product.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UploadsService } from 'src/app/services/uploads/uploads.service';

export interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})


export class EditProductComponent  implements OnInit{
    public user: any;
    public updateProduct: any;

    constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any,    
                private snackBar: MatSnackBar, private productService: ProductService, public auth: AuthenticationService, 
                private uploadsService: UploadsService ) {
                
        let product = data.product;    
        
        if (product.gallery_images){
            product.gallery_images = JSON.parse(product.gallery_images);
        }

        product.categories = [];
        if (product.product_categories){
            for (let category of product.product_categories){
                product.categories.push( "" + category.category_id);
            }
        }

        this.updateProduct = product;

        this.user = {};
        this.auth.getUserData().toPromise().then((data: any) => {
            this.user = data;
        });
    }

    ngOnInit() {}
    
    
    public saveProduct(){
        
        let saveProduct:any = {};
        Object.assign(saveProduct, this.updateProduct);
        saveProduct.gallery_images = JSON.stringify(this.updateProduct.gallery_images);
        
        this.dialogRef.close({product: saveProduct});
        
        
    }

    fileChangeListener(index:string, $event: any): void {

        const files = $event.srcElement.files;

        const formData: FormData = new FormData();

        const mediaFile: File = files[0];
        formData.append('media_file', mediaFile, mediaFile.name);

        const snackBarRef = this.snackBar.open('File is uploading...', '', {
          duration: 10000
        });

        this.uploadsService.uploadFile(formData).toPromise().then((data) => {

            if (Array.isArray(this.updateProduct[index])){
                this.updateProduct[index].push(data.file);
            }
            else{
                this.updateProduct[index] = data.file;
            }
            

            snackBarRef.dismiss();
        }).catch(() => {
            snackBarRef.dismiss();
        });

    }

    selectFile(id, ev) {
        document.getElementById(id).click();
    }    
}