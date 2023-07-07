import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalAdminRoutingModule } from './technical-admin-routing.module';
import { TechnicalAdminComponent } from './technical-admin.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { OffersComponent } from './components/offers/offers.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { BadwordsComponent } from './components/badwords/badwords.component';

@NgModule({
  declarations: [
    TechnicalAdminComponent,
    UsersComponent,
    OffersComponent,
    CreateOfferComponent,
    BadwordsComponent
  ],
  imports: [
    CommonModule,
    TechnicalAdminRoutingModule,
    SharedModule
  ]
})
export class TechnicalAdminModule { }
