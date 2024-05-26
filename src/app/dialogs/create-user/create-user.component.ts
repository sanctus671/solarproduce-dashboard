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

export interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})


export class CreateUserComponent  implements OnInit{
    public user: any;
    public newUser: any;
    public businesses:Array<any>;


    @ViewChild('projectInput') projectInput: ElementRef<HTMLInputElement>;

    constructor(public dialogRef: MatDialogRef<CreateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any,    
                private snackBar: MatSnackBar, private userService: UserService, public auth: AuthenticationService, private businessService: BusinessService ) {
                
        this.newUser = {};

        this.user = {};
        this.businesses = [];
        this.auth.getUserData().toPromise().then((data: any) => {
            this.user = data;
       
        });
        this.getBusinesses();
    }

    ngOnInit() {}


     
    public getBusinesses(){
        
        
        
        this.businessService.getBusinesses( {page:1, limit:999, search:"", order:"desc", order_by:"created_at"}).toPromise().then((data) => {
            console.log(data);
            let businesses = data;
            this.businesses = businesses.data
        }).catch(() => {
        })
    }
    
    
    public saveUser(){
        
        
        this.dialogRef.close({user: this.newUser});
        
        
    }


}