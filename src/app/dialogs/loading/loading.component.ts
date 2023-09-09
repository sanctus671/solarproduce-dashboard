import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    
    
    public title:string;
    constructor(
        public dialogRef: MatDialogRef<LoadingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.title = data.title ? data.title : "Loading"
        }



    onNoClick(): void {
      this.dialogRef.close();
    }
}
