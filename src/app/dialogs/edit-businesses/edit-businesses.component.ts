import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business/business.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-businesses',
  templateUrl: './edit-businesses.component.html',
  styleUrls: ['./edit-businesses.component.scss']
})
export class EditBusinessesComponent {

    public businesses: Array<any>;
    public businessPrices: Array<any>;
    public loading:boolean = true;
    constructor(public dialogRef: MatDialogRef<EditBusinessesComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private businessService: BusinessService, private productService: ProductService ) {


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


            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }


    public saveBusinessPrice(business){
        this.businessService.updateBusiness(business).toPromise().then((data) => {
        }).catch(() => {
            this.loading = false;
        })
    }

    


}

