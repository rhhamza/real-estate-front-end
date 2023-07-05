import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company-service.service';
import { Router } from '@angular/router';
import { Company } from '../core/models/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companyService!:CompanyService;
  router!: Router

  companies?: any;
  constructor(companyService: CompanyService, router: Router) {
    this.companyService = companyService;
    this.router=router;

   }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      (companies: Company[]) => {
        this.companies = companies;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
