import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const companyId = this.route.snapshot.paramMap.get('company');
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required]
      
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
          setTimeout(() => {
            this.router.navigate(['admin', 'offers']);
          }, 3000);
          
        })
      } else {
        this.companyService.updateCompany(this.company.id, this.companyForm.value).subscribe((response: ICompany) => {
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

  readCompanyById(id: string) {
    this.companyService.getCompanyById(id).subscribe((response: ICompany) => {
      this.company = new Company(response)
      this.companyForm.patchValue({
        name: this.company.name,
        phone: this.company.phone,
        address: this.company.address,
        email: this.company.email,
       // status: 'PENDING'
      })
    })
  }

}


