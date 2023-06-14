import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OffersComponent } from './offers/offers.component';
import { CompaniesComponent } from './companies/companies.component';

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
    path: 'offer-details',
    component: OffersComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
