import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TechnicalAdminComponent } from "./technical-admin.component";
import { UsersComponent } from "./components/users/users.component";
import { OffersComponent } from "./components/offers/offers.component";
import { CreateOfferComponent } from "./components/create-offer/create-offer.component";
import { CompaniesAdminComponent } from "./components/companies-admin/companies-admin.component";
import { OrderAdminComponent } from "./components/order-admin/order-admin.component";
import { BadWordsComponent } from "./components/badwords/badwords.component";
import { CreateBadWordComponent } from "./components/create-bad-word/create-bad-word.component";
import { CreateCompanyComponent} from "./components/create-company/create-company.component"
import { UpdateCompanyComponent } from "./components/update-company/update-company.component";import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  {
    path: "",
    component: TechnicalAdminComponent,
    children: [
      {
        path: "",
        redirectTo: "/users",
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "create-company",
        component:  CreateCompanyComponent,
      },

     
      {
        path: "offers",
        component: OffersComponent,
      },
      {
        path: "companies-admin",
        component: CompaniesAdminComponent,
      },
      {
        path: "orders-admin",
        component: OrderAdminComponent,
      },
      {
        path: "calender",
        component: CalendarComponent
      },
      {
        path: "create-offer",
        component: CreateOfferComponent,
      },
      {
        path: "update-company/:company",
        component: CreateCompanyComponent,
      },
      {
        path: "update-offer/:offer",
        component: CreateOfferComponent,
      },
      {
        path: "badwords",
        component: BadWordsComponent,
      },
      {
        path: "create-badword",
        component: CreateBadWordComponent,
      },
      {
        path: "update-badword/:badword",
        component: CreateBadWordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalAdminRoutingModule {}
