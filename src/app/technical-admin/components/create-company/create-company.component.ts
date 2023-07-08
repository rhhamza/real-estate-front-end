import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { map, of, switchMap, toArray } from 'rxjs';
import { ICompany } from 'src/app/core/interfaces/company';
import { IOffer } from 'src/app/core/interfaces/response';
import { Company } from 'src/app/core/models/company.model';
import { Offer } from 'src/app/core/models/offer';
import { CompanyService } from 'src/app/core/services/company-service.service';
import { OfferService } from 'src/app/core/services/offer.service';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  companyForm!: FormGroup;
  submitted = false;
  company?: Company;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const companyId = this.route.snapshot.paramMap.get('company');
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      logo: ['']
    })

    if (companyId) {
      this.readCompanyById(companyId)
    }
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.companyForm?.controls; }

  onSubmit() {
      this.submitted = true;
      console.log(this.companyForm.value);
      
      if (this.companyForm?.invalid) {
          return;
      }

      let body = {
        ...this.companyForm.value,
        logo: this.base64,
        reference: this.generateRandomText(8)    
      }

      if (!this.company) {
        this.companyService.addCompany(body).subscribe((response: ICompany) => {
        
          this.submitted = false;
          this.companyForm.reset();
          this.notifier.notify(
            'success',
            'company succesfully Added'
          );
          
        })
      } else {
        this.companyService.updateCompany(this.company.id, body).subscribe((response: ICompany) => {
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

  readCompanyById(id: string) {
    this.companyService.getCompanyById(id).subscribe((response: ICompany) => {
      this.company = new Company(response)
      this.croppedImage = this.company.logo
      this.companyForm.patchValue({
        name: this.company.name,
        phone: this.company.phone,
        address: this.company.address,
        email: this.company.email,
       // status: 'PENDING'
      })
    })
  }

  imageChangedEvent: any = '';
    croppedImage: any = '';
    base64! :string;


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


