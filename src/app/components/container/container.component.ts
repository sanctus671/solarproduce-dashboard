import { Component, OnInit,ViewEncapsulation,ViewChild,ElementRef } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

    public user:any;
    public sidebarOpened:boolean;
    
   
    constructor(public auth: AuthenticationService) { 
        this.sidebarOpened = window.innerWidth > 1300 ? true : false;

        this.user = {};
        let storedData = <string>localStorage.getItem('userData');
        if (storedData){
            //this.user = JSON.parse(storedData);
        }
        this.auth.getUserData().toPromise().then((data:any) => {
            this.user = data;
        }).catch(() => {
           this.logout();
        });
   
    }

    ngOnInit() {

    }


    public itemSelected(ev){
        
    }
    
    
    toggleMenu(){
        this.sidebarOpened = !this.sidebarOpened;
    }


    
    public logout(){
        this.auth.logout();
    }

}
