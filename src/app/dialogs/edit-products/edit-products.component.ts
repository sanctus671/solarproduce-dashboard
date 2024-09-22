import {Component, ElementRef, ViewChild, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormControl, FormBuilder} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ProductService} from '../../services/product/product.service';
import {BusinessService} from '../../services/business/business.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UploadsService } from 'src/app/services/uploads/uploads.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProductPricesBusinessComponent } from '../product-prices-business/product-prices-business.component';
import { ProductPricesCustomerComponent } from '../product-prices-customer/product-prices-customer.component';

@Component({
    selector: 'app-edit-products',
    templateUrl: './edit-products.component.html',
    styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent {


    public products:Array<any>;
    public businesses:Array<any>;
    public users:Array<any>;
    public loading: boolean;
    public user:any;
    public updatingStatus:string = "";
    
    constructor(public dialogRef: MatDialogRef<EditProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,    
                private snackBar: MatSnackBar, private productService: ProductService, public auth: AuthenticationService, 
                private uploadsService: UploadsService, private userService: UserService, private businessService: BusinessService, public dialog: MatDialog ) {



        this.loading = true;    
        this.products = [];
        this.businesses = [];
        this.users = [];
             
        
        this.user = {};
        this.auth.getUserData().toPromise().then((data:any) => {
            this.user = data;
        });    
        
        this.getProducts();
        this.getBusinesses();
        this.getUsers();
        
    }

    ngOnInit() {
   
    }   
    
    
    public editBusinessPrices(product){
        let dialogRef = this.dialog.open(ProductPricesBusinessComponent, {
            width: '1000px',
            data: {product:JSON.parse( JSON.stringify(product))}
          });
  
          dialogRef.afterClosed().subscribe(result => {
              
              if (result){
                    this.getProducts();
  
              }
          });  
    }

    public editCustomerPrices(product){
        let dialogRef = this.dialog.open(ProductPricesCustomerComponent, {
            width: '1000px',
            data: {product:JSON.parse( JSON.stringify(product))}
          });
  
          dialogRef.afterClosed().subscribe(result => {
              
              if (result){
                this.getProducts();
  
              }
          });
    }

    public updateProduct(product){
        this.updatingStatus = "Saving...";
        this.productService.updateProduct(product).toPromise().then(() => {
            //this.getProducts();
            this.updatingStatus = "Saved";
        }).catch(() => {
            
            this.updatingStatus = "Error saving";
        }); 
    }

     
    public getProducts(){
        
        
        
        this.productService.getProducts( {page:1, limit:999, search:"", order:"desc", order_by:"category"}).toPromise().then((data) => {
     
            let products = data;
            this.products = products.data
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }


     
    public getBusinesses(){
        
        
        
        this.businessService.getBusinesses( {page:1, limit:999, search:"", order:"desc", order_by:"created_at"}).toPromise().then((data) => {
         
            let businesses = data;
            this.businesses = businesses.data
        }).catch(() => {
        })
    }


     
    public getUsers(){
        
        
        
        this.userService.getUsers( {page:1, limit:999, search:"", order:"desc", order_by:"created_at"}).toPromise().then((data) => {
         
            let users = data;
            this.users = users.data
        }).catch(() => {
        })
    }

}
