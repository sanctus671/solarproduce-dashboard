import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UserService} from '../../services/user/user.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-prices-customer',
  templateUrl: './product-prices-customer.component.html',
  styleUrls: ['./product-prices-customer.component.scss']
})
export class ProductPricesCustomerComponent {
    public product: any;
    public users: Array<any>;
    public userPrices: Array<any>;
    public loading:boolean = true;
    constructor(public dialogRef: MatDialogRef<ProductPricesCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private productService: ProductService ) {
        let product = data.product; 

        this.product = product;

        this.users = [];

        this.userPrices = [];
        
        this.getUsers();

    }


    public save(){
 
        this.dialogRef.close({});
        
        
    }

    
    
    
     
    public getUsers(){
        
        
        
        this.userService.getUsers({page:1, limit:999, search:"", order:"", order_by:""}).toPromise().then((data) => {
     
            let users = data;
            this.users = users.data;
            let userPrices = [];
            for (let user of this.users){
                let userPrice = {product_id: this.product.id, user_id: user.id, name: user.name, fixed_price:"", fixed_adjustment: "", percentage_adjustment: ""};
                for (let productPrice of this.product.product_prices){
                    if (productPrice.user_id === user.id){
                        userPrice = productPrice;
                        userPrice.name = user.name;
                    }
                }
                userPrices.push(userPrice);
            }

            this.userPrices = userPrices;


            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }


    public saveUserPrice(productPrice){
        this.productService.saveProductPrice(productPrice).toPromise().then((data) => {
        }).catch(() => {
            this.loading = false;
        })
    }

    public calculateNewPrice = (userPrice) => {
        let productPrice = this.product.price;
        if (userPrice.fixed_price){
            productPrice = userPrice.fixed_price
        }
        if (userPrice.fixed_adjustment){
            productPrice += userPrice.fixed_adjustment;
        }
        if (userPrice.percentage_adjustment){
            productPrice += (productPrice * (userPrice.percentage_adjustment / 100))
        }

        if (productPrice < 0) {productPrice = 0}

        return productPrice;
    }

}
