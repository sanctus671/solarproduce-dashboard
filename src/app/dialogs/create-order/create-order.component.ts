import {Component, ElementRef, ViewChild, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {OrderService} from '../../services/order/order.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


import {UserService} from '../../services/user/user.service';
import {ProductService} from '../../services/product/product.service';

export interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})


export class CreateOrderComponent  implements OnInit{
    public user: any;
    public newOrder: any;

    public users:Array<any>;
    public locations: Array<any>;
    public products: Array<any>;

    constructor(public dialogRef: MatDialogRef<CreateOrderComponent>, @Inject(MAT_DIALOG_DATA) public data: any,    
                private snackBar: MatSnackBar, private orderService: OrderService, public auth: AuthenticationService,
                private userService: UserService, private productService:ProductService ) {
                
        this.newOrder = {order_products:[]};

        this.user = {};
        this.auth.getUserData().toPromise().then((data: any) => {
            this.user = data;
        });

        this.users = [];
        this.products = [];
        this.locations = [];


        this.userService.getUsers({page:1, limit:999, search:"", order:"", order_by:""}).toPromise().then((data:any) => {
            let users = data;
            this.users = users.data;
        });
        this.productService.getProducts({page:1, limit:999, search:"", order:"", order_by:""}).toPromise().then((data:any) => {
            let products = data;
            this.products = products.data;
        });
        this.userService.getLocations().toPromise().then((data:Array<any>) => {
            this.locations = data;
        });
        
    }

    public productSelected(ev, index){
      
        for (let product of this.products){
            if (product.id === ev.value){
                this.newOrder.order_products[index].unit = product.unit;
                break;
            }
        }
    }

    ngOnInit() {}
    
    
    public saveOrder(){
        

        
        this.dialogRef.close({order: this.newOrder});
        
        
    }
}