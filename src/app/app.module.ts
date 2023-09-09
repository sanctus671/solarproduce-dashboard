import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';


export const DDMMYYYY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthenticationModule } from './services/authentication/authentication.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ContainerComponent } from './components/container/container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './components/account/account.component';

import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { CreateUserComponent } from './dialogs/create-user/create-user.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';

import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { SelectDatesComponent } from './dialogs/select-dates/select-dates.component';

import { LoadingComponent } from './dialogs/loading/loading.component';
import { MatIconRegistry } from '@angular/material/icon';


@NgModule({
  declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ContainerComponent, 
        DashboardComponent,
        AccountComponent,
        UsersComponent,
        UserComponent,
        CreateUserComponent,
        EditUserComponent,  
        ConfirmDeleteComponent,
        SelectDatesComponent,
        LoadingComponent,
        SignupComponent
  ],
  imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        AuthenticationModule,
        FormsModule,
        ReactiveFormsModule,
        HighchartsChartModule,
        MatMomentDateModule,
        DragDropModule,
        NgxMatSelectSearchModule
  ],
  entryComponents:[
        ConfirmDeleteComponent,    
        CreateUserComponent,
        EditUserComponent,   
        SelectDatesComponent ,       
        LoadingComponent,
  ],
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DDMMYYYY_FORMATS}],
    
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
      }    
}
