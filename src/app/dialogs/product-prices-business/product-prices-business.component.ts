import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business/business.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-prices-business',
  templateUrl: './product-prices-business.component.html',
  styleUrls: ['./product-prices-business.component.scss']
})
export class ProductPricesBusinessComponent {
    public product: any;
    public businesses: Array<any>;
    public businessPrices: Array<any>;
    public loading:boolean = true;
    constructor(public dialogRef: MatDialogRef<ProductPricesBusinessComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private businessService: BusinessService, private productService: ProductService ) {
        let product = data.product; 

        this.product = product;

        this.businesses = [];

        this.businessPrices = [];
        
        this.getBusinesses();
    }


    public save(){
 
        this.dialogRef.close({});
        
        
    }

    
    
    
     
    public getBusinesses(){
        
        
        
        this.businessService.getBusinesses({page:1, limit:999, search:"", order:"", order_by:""}).toPromise().then((data) => {
  
            let businesses = data;
            this.businesses = businesses;
            let businessPrices = [];
            for (let business of this.businesses){
                let businessPrice = {product_id: this.product.id, business_id: business.id, name: business.name, fixed_price:"", fixed_adjustment: "", percentage_adjustment: ""};
                for (let productPrice of this.product.product_prices){
                    if (productPrice.business_id === business.id){
                        businessPrice = productPrice;
                        businessPrice.name = business.name;
                    }
                }
                businessPrices.push(businessPrice);
            }

            this.businessPrices = businessPrices;


            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }


    public saveBusinessPrice(productPrice){
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
