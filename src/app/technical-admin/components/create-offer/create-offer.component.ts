import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOffer } from 'src/app/core/interfaces/response';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/core/models/offer';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  offerForm!: FormGroup;
  submitted = false;
  offer?: Offer;
  base64?: string;

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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
      description: ['', Validators.required],
      picture: ['']
    })

    if (offerId) {
      this.readOfferById(offerId)
    }
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.offerForm?.controls; }

  onSubmit() {
      this.submitted = true;
      
      if (this.offerForm?.invalid) {
          return;
      }      
      
      let body = {
        ...this.offerForm.value,
        picture: this.base64,
        reference: this.generateRandomText(8),
        user: {
          id: 1
        }
      }

      console.log(body);
      

      let userid = localStorage.getItem('userId')

      if (!this.offer) {
        if (userid)
        this.offerService.createOffer(body, userid).subscribe((response: IOffer) => {
          this.submitted = false;
          this.offerForm.reset();
          this.notifier.notify(
            'success',
            'Offer succesfully Added'
          );
          
        })
      } else {      
        console.log("tes");
          
        this.offerService.updateOffer(this.offer.id, this.offerForm.value).subscribe((response: IOffer) => {
          this.notifier.notify(
            'success',
            'Offer succesfully Updated'
          );

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
      this.croppedImage = this.offer.picture      
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.convertToBase64(file);
  }

  imageChangedEvent: any = '';
    croppedImage: any = '';


    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: any) {
      const blob = event.blob;
      this.convertToBase64(blob);
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.base64);
    }
    
    convertToBase64(file: File) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
    
          // Set the desired image dimensions
          const maxWidth = 800;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;
    
          // Calculate new dimensions to maintain aspect ratio
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
    
          // Set the canvas dimensions
          canvas.width = width;
          canvas.height = height;
    
          // Draw the image on the canvas
          if (ctx)
          ctx.drawImage(img, 0, 0, width, height);
    
          // Get the compressed base64 string
          const base64String = canvas.toDataURL(file.type);
    
          // Use the base64 string as needed (e.g., send it to the server)
          this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(base64String);
          this.base64 = base64String;
        };
        img.src = event.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
}
