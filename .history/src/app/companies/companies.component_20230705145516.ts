import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../core/services/company-service.service';
import { Router } from '@angular/router';
import { Company } from '../core/models/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies?: any;
  constructor(private companyService: CompanyService, private router: Router) {
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
