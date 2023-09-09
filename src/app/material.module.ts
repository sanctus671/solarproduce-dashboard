import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  imports: [MatButtonModule,MatInputModule,MatCardModule,MatProgressSpinnerModule,MatFormFieldModule,
  MatSnackBarModule,MatToolbarModule,MatSidenavModule,MatIconModule,MatAutocompleteModule,MatListModule,MatDividerModule,MatTableModule,MatSortModule, MatPaginatorModule, MatDialogModule,
  MatMenuModule, MatCheckboxModule,MatSelectModule,MatProgressBarModule,MatRadioModule, MatDatepickerModule, MatTooltipModule, MatChipsModule ],
  exports: [MatButtonModule,MatInputModule,MatCardModule,MatProgressSpinnerModule,MatFormFieldModule,
  MatSnackBarModule,MatToolbarModule,MatSidenavModule,MatIconModule,MatAutocompleteModule,MatListModule,MatDividerModule,MatTableModule,MatSortModule, MatPaginatorModule, MatDialogModule,
  MatMenuModule, MatCheckboxModule,MatSelectModule,MatProgressBarModule,MatRadioModule, MatDatepickerModule, MatTooltipModule, MatChipsModule ],
})
export class MaterialModule { }
