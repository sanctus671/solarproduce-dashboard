import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    
    public account:any;
    public loading:boolean;
    constructor(public authService:AuthenticationService,public snackBar: MatSnackBar) {
        this.loading = true;
        this.getAccount();
        this.account = {};
     
    }

    ngOnInit() {
    }
    
    public getAccount(){
        this.authService.getUserData().toPromise().then((data:any) => {
            this.loading = false;
            this.account = data;
        })
    }
    
    public update(){
        this.account.loading = true;
        
        let accountSettings = {};
        Object.assign(accountSettings, this.account);
        if (!accountSettings["password"]){
            delete accountSettings["password"];
        }
        this.authService.updateUserData(accountSettings).toPromise().then(() => {
            this.account.loading = false;
            this.account.password = "";
            this.snackBar.open('Account settings updated', 'Dismiss', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });         
            this.getAccount();    
        })
    }

}
