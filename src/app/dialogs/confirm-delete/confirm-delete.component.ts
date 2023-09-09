import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent{

    constructor(
        public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        
        }



    onNoClick(): void {
      this.dialogRef.close();
    }
}
