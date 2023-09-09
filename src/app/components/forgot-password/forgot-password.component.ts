import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    public loading:boolean;
    public errors:Array<string>;

    constructor(public auth: AuthenticationService, public snackBar: MatSnackBar) {
        this.loading = false;
        this.errors = [];
    

    }
    
    public recover(form){
        let user = form.value;
        
        this.loading = true;
        this.errors = [];
        this.auth.recoverPassword(user).toPromise().then((data) => {
            this.loading = false;
            form.reset();
            this.snackBar.open('Recovery Email Sent', 'Dismiss', {duration: 3000});

        }).catch((e) => {
            this.loading = false;

            
            for (var index in e.error.error.errors){
                this.errors = this.errors.concat(e.error.error.errors[index]);
            }
        })
    }

    ngOnInit() {
    }

}

