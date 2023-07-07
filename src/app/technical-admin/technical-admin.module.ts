import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalAdminRoutingModule } from './technical-admin-routing.module';
import { TechnicalAdminComponent } from './technical-admin.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { OffersComponent } from './components/offers/offers.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { CompaniesAdminComponent } from './components/companies-admin/companies-admin.component';
import { OrderAdminComponent } from './components/order-admin/order-admin.component';
import { BadwordsComponent } from './components/badwords/badwords.component';

@NgModule({
  declarations: [
    TechnicalAdminComponent,
    UsersComponent,
    OffersComponent,
    CreateOfferComponent,
    CompaniesAdminComponent,
    OrderAdminComponent,
    BadwordsComponent
  ],
  imports: [
    CommonModule,
    TechnicalAdminRoutingModule,
    SharedModule
  ]
})
export class TechnicalAdminModule { }
