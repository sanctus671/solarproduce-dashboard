import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';


import {environment} from '../../../environments/environment';

import { CreateOrderComponent } from '../../dialogs/create-order/create-order.component';
import { ConfirmDeleteComponent } from '../../dialogs/confirm-delete/confirm-delete.component';
import { EditOrderComponent } from '../../dialogs/edit-order/edit-order.component';

import {OrderService} from '../../services/order/order.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';

import * as moment from 'moment';
@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    

    public displayedColumns:Array<string>;
    public selection: any;
    public query:any;
    public loading: boolean;
    public user:any;
    public orders:any;
    
    constructor(public dialog: MatDialog, public snackBar: MatSnackBar, 
        public orderService: OrderService, public auth: AuthenticationService, ) {
        this.selection = new SelectionModel<any>(true, []);  
        this.loading = true;    
        this.orders = {count:50, data: []};
        
        this.displayedColumns = ['id','ordered_by','location', 'status', 'items', 'created_at', 'updated_at', 'options'];  
        this.query = {page:1, limit:50, search:"", order:"", order_by:""};        
        
        this.user = {};
        this.auth.getUserData().toPromise().then((data:any) => {
            this.user = data;
        });    
        
        this.getOrders();
        
   
        
        this.selection = new SelectionModel<any>(true, []);          

        
        
        
    }

    ngOnInit() {
   
    }   
    
    
    
     
    public getOrders(){
        
        
        
        this.orderService.getOrders(this.query).toPromise().then((data) => {
            console.log(data);
            let orders = data;
            this.orders = {count:orders.count, data:orders.data};
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }

    
    public sortData(ev) {
        
        if (ev.direction && ev.active){
            this.query.order = ev.direction;
            this.query.order_by = ev.active;
            this.getOrders();
        }
    }
    
    public pageChanged(ev){
        this.query.page = ev.pageIndex + 1;
        this.query.limit = ev.pageSize;
        this.getOrders();
    }


    
    
    public addNew(){
        
        let dialogRef = this.dialog.open(CreateOrderComponent, {
          width: '1200px',
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                let order = result.order;
                this.orderService.createOrder(order).toPromise().then(() => {
                    this.getOrders();
                }); 

            }
        }); 
              
    }   
    
    public editOrder(order){
        let dialogRef = this.dialog.open(EditOrderComponent, {
          width: '1200px',
          data: {order:JSON.parse( JSON.stringify(order))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                let order = result.order;
                this.orderService.updateOrder(order).toPromise().then(() => {
                    this.getOrders();
                }); 

            }
        });        
    }   
    
    
    public deleteOrder(order){
        let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
          width: '300px',
          data: order
        });


        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                this.orderService.deleteOrder(result.id).toPromise().then(() => {
                    this.getOrders();
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
    
    
    public exportOrders(){

        this.orderService.exportOrders(this.query).toPromise().then((result) => {

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

