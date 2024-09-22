import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';


import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { EditOrderComponent } from '../../dialogs/edit-order/edit-order.component';
import * as moment from 'moment';



@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    public order:any;
    public loading:boolean;
    public query:any;
    public purchases:Array<any>;
    
    constructor(public orderService: OrderService, private route: ActivatedRoute, public dialog: MatDialog, private router:Router, public auth: AuthenticationService, public snackBar: MatSnackBar) {
        
        this.loading = true;
        this.order = {id: +this.route.snapshot.paramMap.get('id')};
        this.getOrder();  
      
             
        this.query = {order_id:this.order.id};  
    }

    ngOnInit() {
        
        
        
    }
    
        
    public getOrder(){
        this.orderService.getOrder(this.order.id).toPromise().then((data) => {
            this.order = data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }    
    
    
    public editOrder(){
        
        let dialogRef = this.dialog.open(EditOrderComponent, {
          width: '1200px',
          data: {order:JSON.parse( JSON.stringify(this.order))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
         
                let order = result.order;
                this.orderService.updateOrder(order).toPromise().then(() => {
                    this.getOrder();
                }); 

            }
        }); 
              
    }    
    
    public getName(){
        if (this.order.profile){
            return this.order.profile.first_name;
        }
        else{
            return "Order " + this.order.id;
        }
    }     
    
    
    public getFields(){
        return ["order_#",'po_number', 'ordered_by','location','location_address', 'status','delivery_date', 'created_at', 'updated_at'];
    }
    
      
      
    public formatFieldName(field){
        
        if (field)
        
        return field.replace(new RegExp("_", 'g'), " ").replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    public formatFieldValue(field:string){
        if (field === "created_at" || field === "updated_at"){
            return this.formatDate(this.order[field]);
        }
        else if (field === "order_#"){
            return this.order["id"];
        }
        else if (field === "ordered_by"){
            return this.order["user"] ? this.order["user"]["name"] : "";
        }
        else if (field === "location"){
            return this.order["location"] ? this.order["location"]["name"] : "";
        }
        else if (field === "location_address"){
            return this.order["location"] ? this.order["location"]["address"] : "";
        }
        else{
            return this.order[field];
        }
    }


    
    public formatDate(date){
        

        //let localeOffset = -(new Date().getTimezoneOffset());
        //return moment(date).add(localeOffset, 'm').format("DD/MM/YYYY, h:mma");        
		return moment(date).format("DD/MM/YYYY, h:mma");       
    }


}

