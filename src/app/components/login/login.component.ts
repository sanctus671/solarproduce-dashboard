import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    public loading:boolean;
    public errors:Array<string>;

    constructor(public auth: AuthenticationService, private router: Router) {
        this.loading = false;
        this.errors = [];
    }
    
    public login(user){
        this.loading = true;
        this.errors = [];
        this.auth.login(user).toPromise().then((data) => {
            this.loading = false;
            this.router.navigate(['']);
        }).catch((e) => {
            this.loading = false;
            
            this.errors = ["Incorrect email or password"]

        })
    }

    ngOnInit() {
    }

}
