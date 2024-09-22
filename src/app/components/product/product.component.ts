import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';


import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { EditProductComponent } from '../../dialogs/edit-product/edit-product.component';
import * as moment from 'moment';



@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    public product:any;
    public loading:boolean;
    public query:any;
    public galleryImages:Array<string>;
    
    constructor(public productService: ProductService, private route: ActivatedRoute, public dialog: MatDialog, private router:Router, public auth: AuthenticationService, public snackBar: MatSnackBar) {
        
        this.loading = true;
        this.product = {id: +this.route.snapshot.paramMap.get('id')};
        this.getProduct();  

        this.galleryImages = [];
      
             
        this.query = {product_id:this.product.id};  
    }

    ngOnInit() {
        
        
        
    }
    
        
    public getProduct(){
        this.productService.getProduct(this.product.id).toPromise().then((data) => {
            this.product = data;

            this.galleryImages = JSON.parse(this.product.gallery_images);

            if (this.product.categories){
                this.product.added_categories = JSON.parse(this.product.categories).toString();
            }
            

            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }    
    
    
    public editProduct(){
        
        let dialogRef = this.dialog.open(EditProductComponent, {
          width: '600px',
          data: {product:JSON.parse( JSON.stringify(this.product))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
          
                let product = result.product;
                this.productService.updateProduct(product).toPromise().then(() => {
                    this.getProduct();
                }); 

            }
        }); 
              
    }    
    
    public getName(){
        if (this.product.profile){
            return this.product.profile.first_name;
        }
        else{
            return "Product " + this.product.id;
        }
    }     
    
    
    public getFields(){
        return ["id", 'name','price', 'unit','minimum_quantity', 'availability','status','added_categories', 'created_at'];
    }

    public formatFieldValue(field:string){
        if (field === "created_at" || field === "updated_at"){
            return this.formatDate(this.product[field]);
        }
        else if (field === "price"){
            return this.formatPrice(this.product["price"]);
        }
        else if (field === "status"){
            return this.product["status"] === "special" ? "On special" : "Not on special"
        }
        else{
            return this.product[field];
        }
    }

    

    private formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
    }    
      
      
    public formatFieldName(field){
        
        if (field)
        
        return field.replace(new RegExp("_", 'g'), " ").replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }


    
    public formatDate(date){
        

        let localeOffset = -(new Date().getTimezoneOffset());
        return moment(date).add(localeOffset, 'm').format("DD/MM/YYYY, h:mma");        
		//return moment(date).format("DD/MM/YYYY, h:mma");       
    }


}

