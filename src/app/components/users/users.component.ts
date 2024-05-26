import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';


import {environment} from '../../../environments/environment';

import { CreateUserComponent } from '../../dialogs/create-user/create-user.component';
import { ConfirmDeleteComponent } from '../../dialogs/confirm-delete/confirm-delete.component';
import { EditUserComponent } from '../../dialogs/edit-user/edit-user.component';

import {UserService} from '../../services/user/user.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';

import * as moment from 'moment';
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    

    public displayedColumns:Array<string>;
    public selection: any;
    public query:any;
    public loading: boolean;
    public user:any;
    public users:any;
    
    constructor(public dialog: MatDialog, public snackBar: MatSnackBar, 
        public userService: UserService, public auth: AuthenticationService, ) {
        this.selection = new SelectionModel<any>(true, []);  
        this.loading = true;    
        this.users = {count:50, data: []};
        
        this.displayedColumns = ['id','name','email', 'permission','status', 'created_at', 'updated_at', 'options'];  
        this.query = {page:1, limit:50, search:"", order:"", order_by:""};        
        
        this.user = {};
        this.auth.getUserData().toPromise().then((data:any) => {
            this.user = data;
        });    
        
        this.getUsers();
        
   
        
        this.selection = new SelectionModel<any>(true, []);          

        
        
        
    }

    ngOnInit() {
   
    }   
    
    
    
     
    public getUsers(){
        
        
        
        this.userService.getUsers(this.query).toPromise().then((data) => {
            console.log(data);
            let users = data;
            this.users = {count:users.count, data:users.data};
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }

    
    public sortData(ev) {
        
        if (ev.direction && ev.active){
            this.query.order = ev.direction;
            this.query.order_by = ev.active;
            this.getUsers();
        }
    }
    
    public pageChanged(ev){
        this.query.page = ev.pageIndex + 1;
        this.query.limit = ev.pageSize;
        this.getUsers();
    }


    
    
    public addNew(){
        
        let dialogRef = this.dialog.open(CreateUserComponent, {
          width: '600px',
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                let user = result.user;
                this.userService.createUser(user).toPromise().then(() => {
                    this.getUsers();
                }); 

            }
        }); 
              
    }   
    
    public editUser(user){
        let dialogRef = this.dialog.open(EditUserComponent, {
          width: '600px',
          data: {user:JSON.parse( JSON.stringify(user))}
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                let user = result.user;
                this.userService.updateUser(user).toPromise().then(() => {
                    this.getUsers();
                }); 

            }
        });        
    }   
    
    
    public deleteUser(user){
        let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
          width: '300px',
          data: user
        });


        dialogRef.afterClosed().subscribe(result => {
            
            if (result){
                this.userService.deleteUser(result.id).toPromise().then(() => {
                    this.getUsers();
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
    
    
    public exportUsers(){

        this.userService.exportUsers(this.query).toPromise().then((result) => {

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

