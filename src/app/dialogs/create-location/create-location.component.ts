import {Component, ElementRef, ViewChild, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {LocationService} from '../../services/location/location.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UploadsService } from 'src/app/services/uploads/uploads.service';
import { UserService } from 'src/app/services/user/user.service';

export interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})


export class CreateLocationComponent  implements OnInit{
    public newLocation: any;


    constructor(public dialogRef: MatDialogRef<CreateLocationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
                
        this.newLocation = {};


    }

    ngOnInit() {}
    
    
    public saveLocation(){
        
        let saveLocation:any = {};
        Object.assign(saveLocation, this.newLocation);
        
        this.dialogRef.close({location: saveLocation});
        
        
    }

}