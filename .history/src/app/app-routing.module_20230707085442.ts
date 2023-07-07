import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OffersComponent } from './offers/offers.component';
import { CompaniesComponent } from './companies/companies.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import {CompaniesMgtComponent} from './companies-mgt/companies-mgt.component'
import {  OrdersPlanComponent } from './orders-plan/orders-plan.component'
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
    path: 'companies/:companyid',
    component: CompanyDetailsComponent 
  },
  {
    path: 'companies-mgt',
    component: CompaniesMgtComponent
  },
  {
    path: 'orders-plan',
    component: OrdersPlanComponent
  },
  
  

  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'blogs/:blog',
    component: BlogDetailComponent
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
