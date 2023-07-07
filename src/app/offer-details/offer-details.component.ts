import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../core/services/offer.service';
import { IOffer } from '../core/interfaces/response';
import { Offer } from '../core/models/offer';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  offer!: Offer;
  
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId) this.readOfferById(offerId)
  }

  readOfferById(id: string) {
    this.offerService.readOfferById(id).subscribe((offer: IOffer) => {
      this.offer = new Offer(offer)
    })
  }
}
