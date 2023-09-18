import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';


import {environment} from '../../../environments/environment';

import { CreateProductComponent } from '../../dialogs/create-product/create-product.component';
import { ConfirmDeleteComponent } from '../../dialogs/confirm-delete/confirm-delete.component';
import { EditProductComponent } from '../../dialogs/edit-product/edit-product.component';

import {ProductService} from '../../services/product/product.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';

import * as moment from 'moment';
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    

    public displayedColumns:Array<string>;
    public selection: any;
    public query:any;
    public loading: boolean;
    public user:any;
    public products:any;
    
    constructor(public dialog: MatDialog, public snackBar: MatSnackBar, 
        public productService: ProductService, public auth: AuthenticationService, ) {
        this.selection = new SelectionModel<any>(true, []);  
        this.loading = true;    
        this.products = {count:50, data: []};
        
        this.displayedColumns = ['id','name','price', 'availability','status', 'created_at', 'updated_at', 'options'];  
        this.query = {page:1, limit:50, search:"", order:"", order_by:""};        
        
        this.user = {};
        this.auth.getUserData().toPromise().then((data:any) => {
            this.user = data;
        });    
        
        this.getProducts();
        
   
        
        this.selection = new SelectionModel<any>(true, []);          

        
        
        
    }

    ngOnInit() {
   
    }   
    
    
    
     
    public getProducts(){
        
        
        
        this.productService.getProducts(this.query).toPromise().then((data) => {
            console.log(data);
            let products = data;
            this.products = {count:products.count, data:products.data};
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }

    
    public sortData(ev) {
        
        if (ev.direction && ev.active){
            this.query.order = ev.direction;
            this.query.order_by = ev.active;
            this.getProducts();
        }
    }
    
    public pageChanged(ev){
        this.query.page = ev.pageIndex + 1;
        this.query.limit = ev.pageSize;
        this.getProducts();
    }


    
    
    public addNew(){
        
        let dialogRef = this.dialog.open(CreateProductComponent, {
          width: '600px',
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                let product = result.product;
                this.productService.createProduct(product).toPromise().then(() => {
                    this.getProducts();
                }); 

            }
        }); 
              
    }   
    
    public editProduct(product){
        let dialogRef = this.dialog.open(EditProductComponent, {
          width: '600px',
          data: {product:JSON.parse( JSON.stringify(product))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                let product = result.product;
                this.productService.updateProduct(product).toPromise().then(() => {
                    this.getProducts();
                }); 

            }
        });        
    }   
    
    
    public deleteProduct(product){
        let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
          width: '300px',
          data: product
        });


        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                this.productService.deleteProduct(result.id).toPromise().then(() => {
                    this.getProducts();
                });                

                          

                
            
            }
        });          
    }  

    public formatField(field){
        return field.replace(new RegExp("_id", 'g'), "").replace(new RegExp("_", 'g'), " ").replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });;
    } 
    
    public formatDate(date){
        if (date){
            return moment(date).format("DD/MM/YYYY, h:mma")
        }
    }
    
    
    public exportProducts(){

        this.productService.exportProducts(this.query).toPromise().then((result) => {

            var link = document.createElement("a");
            link.download = result.file;
            link.href = result.file;
            link.click();  


            this.snackBar.open('Export downloading...', 'Dismiss', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'start'
            });  

        });    
          
    }       
    
    
}

