import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReviewTestmonialComponent } from './components/review-testmonial/review-testmonial.component';
import { BlogComponent } from './components/blog/blog.component';
import { RouterModule } from '@angular/router';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    ReviewTestmonialComponent,
    BlogComponent,
    OfferCardComponent,
    SwitcherComponent,
    CompanyCardComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    FeatherModule.pick(allIcons),
    NgbNavModule,
    CarouselModule,
    RouterModule,
    FullCalendarModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule
  ],
  exports: [
    FeatherModule,
    SwiperModule,
    NgbNavModule,
    CarouselModule,
    ReviewTestmonialComponent,
    BlogComponent,
    RouterModule,
    OfferCardComponent,
    SwitcherComponent,
    CompanyCardComponent,
    FullCalendarModule,
    NgbModalModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ],
})
export class SharedModule { }
