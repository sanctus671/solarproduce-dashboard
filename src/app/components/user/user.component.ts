import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';


import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { EditUserComponent } from '../../dialogs/edit-user/edit-user.component';
import * as moment from 'moment';
import { CreateLocationComponent } from 'src/app/dialogs/create-location/create-location.component';
import { EditLocationComponent } from 'src/app/dialogs/edit-location/edit-location.component';
import { LocationService } from 'src/app/services/location/location.service';



@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    public user:any;
    public loading:boolean;
    public query:any;
    public purchases:Array<any>;
    
    constructor(public userService: UserService, private route: ActivatedRoute, public dialog: MatDialog, private router:Router, public auth: AuthenticationService, 
        public snackBar: MatSnackBar, private locationService: LocationService) {
        
        this.loading = true;
        this.user = {id: +this.route.snapshot.paramMap.get('id')};
        this.getUser();  
      
             
        this.query = {user_id:this.user.id};  
    }

    ngOnInit() {
        
        
        
    }
    
        
    public getUser(){
        this.userService.getUser(this.user.id).toPromise().then((data) => {
            this.user = data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }    
    
    
    public editUser(){
        
        let dialogRef = this.dialog.open(EditUserComponent, {
          width: '600px',
          data: {user:JSON.parse( JSON.stringify(this.user))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
      
                let user = result.user;
                this.userService.updateUser(user).toPromise().then(() => {
                    this.getUser();
                }); 

            }
        }); 
              
    }      
    
    
    public addLocation(){
        
        let dialogRef = this.dialog.open(CreateLocationComponent, {
          width: '600px',
          data: {user:JSON.parse( JSON.stringify(this.user))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
         
                let newLocation = result.location;
                newLocation.user_id = this.user.id; 

                this.locationService.createLocation(newLocation).toPromise().then(() => {

                    this.getUser();
                }).catch(() => {
                    this.getUser();

                })

            }
        }); 
              
    }  
    
    
    public editLocation(location){
        
        let dialogRef = this.dialog.open(EditLocationComponent, {
          width: '600px',
          data: {user:JSON.parse( JSON.stringify(this.user)), location:JSON.parse( JSON.stringify(location))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
           
                this.locationService.updateLocation(result.location).toPromise().then(() => {

                    this.getUser();
                }).catch(() => {
                    this.getUser();

                })

            }
        }); 
              
    }  
    
    public getName(){
        if (this.user.profile){
            return this.user.profile.first_name;
        }
        else{
            return "User " + this.user.id;
        }
    }     
    
    
    public getFields(){
        return ["id", 'name', 'business', 'email','phone','status', 'permission','same_day_delivery', 'created_at'];
    }
    
      
      
    public formatFieldName(field){
        
        if (field)
        
        return field.replace(new RegExp("_", 'g'), " ").replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    public getFieldValue(field){
        if (field === "created_at" || field === "updated_at"){
            return this.formatDate(this.user[field]);
        }
        else if (field === "business"){
            if (this.user.business){
                return this.user.business.name;
            }
            else{
                return this.user.business_name;
            }
        }
        else if (field === "permission"){
            if (this.user.permission === "admin"){
                return "Administrator";
            }
            else{
                return "User";
            }
        }
        else if (field === "same_day_delivery"){
            return this.user[field] === 1 ? "Yes" : "No"; 
        }
        else{
            return this.user[field] 
        }        
    }


    
    public formatDate(date){
        

        let localeOffset = -(new Date().getTimezoneOffset());
        return moment(date).add(localeOffset, 'm').format("DD/MM/YYYY, h:mma");        
		//return moment(date).format("DD/MM/YYYY, h:mma");       
    }


}

