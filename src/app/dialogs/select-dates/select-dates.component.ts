import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-select-dates',
  templateUrl: './select-dates.component.html',
  styleUrls: ['./select-dates.component.scss'],
})
export class SelectDatesComponent{

    public startDate:any;
    public endDate:any;
    
    constructor(
      public dialogRef: MatDialogRef<SelectDatesComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
        
      
        this.startDate = moment().subtract(1, 'year').toDate();
      this.endDate = new Date();
        
        
                  
      }

    ngOnInit(){

    }    

    
}
