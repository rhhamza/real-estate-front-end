import { UserService } from './core/services/user.service';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { CompanyService } from './core/services/company-service.service';
import { CompaniesMgtComponent } from './companies-mgt/companies-mgt.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { LayoutsModule } from "./layouts/layouts.module";
import { SharedModule } from "./shared/shared.module";
import { HomePageComponent } from "./home-page/home-page.component";
import { OffersComponent } from "./offers/offers.component";
import { OfferDetailsComponent } from "./offer-details/offer-details.component";
import { CompaniesComponent } from "./companies/companies.component";
import { ChatComponent } from "./chat/chat.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { BlogDetailComponent } from "./blog-detail/blog-detail.component";
import { CompanyDetailsComponent } from "./company-details/company-details.component";
import { PublicationService } from "./core/services/publication.service";
import { DatePipe } from "@angular/common";
import { PublicationCommentService } from "./core/services/publication-comment.service";
import { PublicationReactionService } from "./core/services/publication-reaction.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddPublicationModalComponent } from "./add-publication-modal/add-publication-modal.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
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
    CompanyDetailsComponent,
    AppointmentFormComponent,
    CompaniesMgtComponent,
    AddPublicationModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    CompanyService,
    UserService, 
    PublicationService,
    PublicationCommentService,
    PublicationReactionService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
