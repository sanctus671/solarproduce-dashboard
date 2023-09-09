import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';


import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { EditUserComponent } from '../../dialogs/edit-user/edit-user.component';
import * as moment from 'moment';



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
    
    constructor(public userService: UserService, private route: ActivatedRoute, public dialog: MatDialog, private router:Router, public auth: AuthenticationService, public snackBar: MatSnackBar) {
        
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
                console.log(result);
                let user = result.user;
                this.userService.updateUser(user).toPromise().then(() => {
                    this.getUser();
                }); 

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
        return ["id", 'name','business_name', 'email','status', 'permission', 'created_at'];
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

