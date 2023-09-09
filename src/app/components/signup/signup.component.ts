import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    
    public loading:boolean;
    public errors:Array<string>;

    constructor(public auth: AuthenticationService, private router: Router) {
        this.loading = false;
        this.errors = [];
    }
    
    public signup(user){
        this.errors = [];
        
        if (user.password !== user.confirm_password){
            this.errors = ["Passwords do not match."];
            return;
        }

        if (!user.name || !user.email || !user.password || !user.confirm_password){
            this.errors = ["Required fields not filled in."];
            return;
        }        
               
        this.loading = true; 
   
        this.auth.register(user).toPromise().then((data) => {
            this.loading = false;
            this.router.navigate(['']);
        }).catch((e) => {
            this.loading = false;
            
            this.errors = ["Invalid details. Please try again."]

        })
    }

    ngOnInit() {
    }

}
