import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    public loading:boolean;
    public errors:Array<string>;

    constructor(public auth: AuthenticationService, private route: ActivatedRoute, public snackBar: MatSnackBar) {
        this.loading = false;
        this.errors = [];
    }
    
    public reset(form){
        let user = form.value;
        user.token = this.route.snapshot.paramMap.get('token');
        this.loading = true;
        this.errors = [];
        this.auth.resetPassword(user).toPromise().then((data) => {
            this.loading = false;
            form.reset();
            this.snackBar.open('Password Reset', 'Dismiss', {duration: 3000});            

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


