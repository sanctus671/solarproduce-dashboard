import {Component, ElementRef, ViewChild, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {UserService} from '../../services/user/user.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BusinessService } from 'src/app/services/business/business.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    public user:any;
    public editUser:any;
    public businesses:Array<any>;
    
    constructor(
      public dialogRef: MatDialogRef<EditUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, 
      private snackBar: MatSnackBar, private userService: UserService, public auth: AuthenticationService, private businessService: BusinessService) {

            this.editUser = data.user; 

            this.editUser.business_id = this.editUser.business ? this.editUser.business.id : "";

            this.editUser.same_day_delivery = this.editUser.same_day_delivery ? "" + this.editUser.same_day_delivery : "0"; 

            console.log(this.editUser);
            this.businesses = [];


            this.user = {};
            this.auth.getUserData().toPromise().then((data:any) => {
                this.user = data;


            });   
            this.getBusinesses();
        
          
                     
      }

    ngOnInit(){

    }  


     
    public getBusinesses(){
        
        
        
        this.businessService.getBusinesses( {page:1, limit:999, search:"", order:"desc", order_by:"created_at"}).toPromise().then((data) => {
            console.log(data);
            let businesses = data;
            this.businesses = businesses


        }).catch(() => {
        })
    }
    
    
    public updateUser(){
        
        
        this.dialogRef.close({user: this.editUser});
        
        
    }
}
