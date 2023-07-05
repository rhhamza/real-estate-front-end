import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../core/services/company-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  id!: string;
  companyid:any;
  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyid = this.route.snapshot.paramMap.get('companyid');
  }


  getCompanyById(): void {
   
    this.companyService.getCompanyById(id).subscribe(
      (companies: Company[]) => {
        this.companies = companies;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
