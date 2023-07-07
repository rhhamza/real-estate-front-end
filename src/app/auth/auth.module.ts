import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveAccountComponent } from './active-account/active-account/active-account.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';


@NgModule({
  declarations: [
    CompanyRegisterComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ActiveAccountComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
    
  ]
})
export class AuthModule { }
