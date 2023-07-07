import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOffer } from 'src/app/core/interfaces/response';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/core/models/offer';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  offerForm!: FormGroup;
  submitted = false;
  offer?: Offer;

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const offerId = this.route.snapshot.paramMap.get('offer');
    this.offerForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      sqm: ['', Validators.required],
      location: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      description: ['', Validators.required]
    })

    if (offerId) {
      this.readOfferById(offerId)
    }
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.offerForm?.controls; }

  onSubmit() {
      this.submitted = true;
      console.log(this.offerForm.value);
      
      if (this.offerForm?.invalid) {
          return;
      }

      let body = {
        ...this.offerForm.value,
        reference: this.generateRandomText(8)    
      }

      if (!this.offer) {
        this.offerService.createOffer(body).subscribe((response: IOffer) => {
          this.submitted = false;
          this.offerForm.reset();
          this.notifier.notify(
            'success',
            'Offer succesfully Added'
          );
          setTimeout(() => {
            this.router.navigate(['admin', 'offers']);
          }, 3000);
          
        })
      } else {
        this.offerService.updateOffer(this.offer.id, this.offerForm.value).subscribe((response: IOffer) => {
          this.notifier.notify(
            'success',
            'Offer succesfully Updated'
          );
          setTimeout(() => {
            this.router.navigate(['admin', 'offers']);
          }, 3000);
        })
      }
   
  }
  
  generateRandomText(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  readOfferById(id: string) {
    this.offerService.readOfferById(id).subscribe((response: IOffer) => {
      this.offer = new Offer(response)
      this.offerForm.patchValue({
        title: this.offer.title,
        category: this.offer.category,
        type: this.offer.type,
        price: this.offer.price,
        sqm: this.offer.sqm,
        location: this.offer.location,
        bedrooms: this.offer.bedrooms,
        bathrooms: this.offer.bathrooms,
        description: this.offer.description
      })
    })
  }
}
