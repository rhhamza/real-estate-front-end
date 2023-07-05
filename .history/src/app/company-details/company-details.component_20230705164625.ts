import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../core/models/company.model';
import { CompanyService } from '../core/services/company-service.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  public company!: Company;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const companyId = params.get('companyid');
      if (companyId) {
        this.getCompanyDetails(companyId);
      }
    });
  }

  getCompanyDetails(companyId: string): void {
    this.companyService.getCompanyById(companyId).subscribe(
      (company: Company) => {
        this.company = company;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
