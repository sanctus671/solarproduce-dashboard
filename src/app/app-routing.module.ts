import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ContainerComponent } from './components/container/container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [   
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ PublicGuard ]
  }, 
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ PublicGuard ]
  },  
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [ PublicGuard ]
  }, 
  {
    path: 'forgot-password/:token',
    component: ResetPasswordComponent,
    canActivate: [ PublicGuard ]
  },     
  {
    path: '',
    component: ContainerComponent,
    canActivate: [ ProtectedGuard ],
    children: 
    [

        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },    
        {
          path: 'dashboard',
          component: DashboardComponent,
        },   
        {
          path: 'users',
          component: UsersComponent,
        },    
        {
          path: 'users/:id',
          component: UserComponent,
        },   
        {
          path: 'products',
          component: ProductsComponent,
        },    
        {
          path: 'products/:id',
          component: ProductComponent,
        },   
        {
          path: 'orders',
          component: OrdersComponent,
        },    
        {
          path: 'orders/:id',
          component: OrderComponent,
        },   
        {
          path: 'account',
          component: AccountComponent,
        }        
		
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
