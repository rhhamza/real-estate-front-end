import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompaniesAdminComponent } from "./components/companies-admin/companies-admin.component";
import { OrderAdminComponent } from "./components/order-admin/order-admin.component";
import { BadWordsComponent } from "./components/badwords/badwords.component";
import { CreateBadWordComponent } from './components/create-bad-word/create-bad-word.component';
import { TechnicalAdminRoutingModule } from './technical-admin-routing.module';
import { TechnicalAdminComponent } from './technical-admin.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { OffersComponent } from './components/offers/offers.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    TechnicalAdminComponent,
    UsersComponent,
    OffersComponent,
    CreateOfferComponent,
    CompaniesAdminComponent,
    OrderAdminComponent,
    BadWordsComponent,
    CreateBadWordComponent,
    CalendarComponent
  ],
  imports: [CommonModule, TechnicalAdminRoutingModule, SharedModule],
})
export class TechnicalAdminModule {}
