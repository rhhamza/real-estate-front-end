import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OffersComponent } from './offers/offers.component';
import { CompaniesComponent } from './companies/companies.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'offers',
    component: OffersComponent
  },
  {
    path: 'offers/:id',
    component: OfferDetailsComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./technical-admin/technical-admin.module').then(m => m.TechnicalAdminModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
