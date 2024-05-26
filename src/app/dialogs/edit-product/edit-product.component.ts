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
import { UserService } from 'src/app/services/user/user.service';

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

    public users:Array<any>;
    public customerPrices:any;

    public showCustomerPrices:boolean;

    constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any,    
                private snackBar: MatSnackBar, private productService: ProductService, public auth: AuthenticationService, 
                private uploadsService: UploadsService, private userService: UserService ) {
                
        let product = data.product;    

        console.log(product);
        
        
        if (product.gallery_images){
            product.gallery_images = JSON.parse(product.gallery_images);
        }
        else{
            product.gallery_images = [];
        }
        
        if (product.categories){
            product.categories = JSON.parse(product.categories);
        }
        else{
            product.categories = [];
        }
        this.customerPrices = product.user_prices ? JSON.parse(product.user_prices) : {};

        product.public  = product.public === 1 ? "1" : "0";


        this.updateProduct = product;



        this.user = {};
        this.auth.getUserData().toPromise().then((data: any) => {
            this.user = data;
        });

        this.users = [];
        this.userService.getUsers({page:1, limit:999, search:"", order:"", order_by:""}).toPromise().then((data) => {
            console.log(data);
            let users = data.data;

            this.users = users;

            for (let user of users){
                if (!this.customerPrices[user.id]){
                    this.customerPrices[user.id] = {user_id:user.id, name: user.name, price:""};
                }
                
            }


        }).catch(() => {
        })
    }

    ngOnInit() {}
    
    
    public saveProduct(){
        
        let saveProduct:any = {};
        Object.assign(saveProduct, this.updateProduct);
        saveProduct.gallery_images = JSON.stringify(this.updateProduct.gallery_images);
        saveProduct.categories = JSON.stringify(this.updateProduct.categories);
        saveProduct.user_prices = JSON.stringify(this.customerPrices);
        
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