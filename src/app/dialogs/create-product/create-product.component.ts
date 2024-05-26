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
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})


export class CreateProductComponent  implements OnInit{
    public user: any;
    public newProduct: any;

    public users:Array<any>;
    public customerPrices:any;

    public showCustomerPrices:boolean;


    constructor(public dialogRef: MatDialogRef<CreateProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any,    
                private snackBar: MatSnackBar, private productService: ProductService, public auth: AuthenticationService, 
                private uploadsService: UploadsService, public userService: UserService ) {
                
        this.newProduct = {gallery_images: [], categories: [], public:"1"};
        this.customerPrices = [];

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
                this.customerPrices[user.id] = {user_id:user.id, name: user.name, price:""};
            }


        }).catch(() => {
        })




    }

    ngOnInit() {}
    
    
    public saveProduct(){
        
        let saveProduct:any = {};
        Object.assign(saveProduct, this.newProduct);
        saveProduct.gallery_images = JSON.stringify(this.newProduct.gallery_images);
        saveProduct.categories = JSON.stringify(this.newProduct.categories);
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

            if (Array.isArray(this.newProduct[index])){
                this.newProduct[index].push(data.file);
            }
            else{
                this.newProduct[index] = data.file;
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