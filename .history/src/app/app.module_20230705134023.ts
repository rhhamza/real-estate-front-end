import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { OffersComponent } from './offers/offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CompaniesComponent } from './companies/companies.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './core/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OffersComponent,
    OfferDetailsComponent,
    CompaniesComponent,
    ChatComponent,
    CalendarComponent,
    BlogsComponent,
    BlogDetailComponent,
    CompanyDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
