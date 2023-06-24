import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalAdminRoutingModule } from './technical-admin-routing.module';
import { TechnicalAdminComponent } from './technical-admin.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TechnicalAdminComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    TechnicalAdminRoutingModule,
    SharedModule
  ]
})
export class TechnicalAdminModule { }
