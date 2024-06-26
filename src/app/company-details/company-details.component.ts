import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../core/models/company.model';
import { CompanyService } from '../core/services/company-service.service';
import { CompanyImageService } from '../core/services/company-image.service';
import { CompanyImage } from '../core/models/company-image.model';
import { OfferService } from '../core/services/offer.service';
import { IOffer } from '../core/interfaces/response';
import { map, switchMap, toArray } from 'rxjs';
import { Offer } from '../core/models/offer';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  id?: string;
  company?:any;
  companyImage?:CompanyImage;


  constructor(private route: ActivatedRoute, private companyService: CompanyService, private companyImageService: CompanyImageService, private offerService: OfferService) { }

  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('companyid');
    if (companyId !== null) {
      this.id = companyId;
      this.getCompanyDetails(companyId);
      this.getCompanyImage(companyId);
      this.readLatestOffers()
    }
  }
  

  getCompanyDetails(id: string): void {
    this.companyService.getCompanyById(id).subscribe(
      (company: Company) => {
        this.company = company;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCompanyImage(id: string): void {
    
    this.companyImageService.getImageById(id).subscribe(
      (companyImage: CompanyImage) => {
        this.companyImage = companyImage;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  offers!: Offer[]

  readLatestOffers () {
    this.offerService.readAllOffers().pipe(
      switchMap((offers: IOffer[]) => offers), 
      map((offer: Offer) => new Offer(offer)),
      toArray(),
    ).subscribe((offers: Offer[]) => {
      this.offers = offers
    })
  }
  

}
