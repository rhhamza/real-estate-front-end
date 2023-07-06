import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalAdminComponent } from './technical-admin.component';
import { UsersComponent } from './components/users/users.component';
import { OffersComponent } from './components/offers/offers.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicalAdminComponent,
    children: [
      {
        path: "",
        redirectTo: "/users",
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "offers",
        component: OffersComponent
      },
      {
        path: "create-offer",
        component: CreateOfferComponent
      },
      {
        path: "update-offer/:offer",
        component: CreateOfferComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalAdminRoutingModule { }
