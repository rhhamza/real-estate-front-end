import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../core/models/company.model';
import { CompanyService } from '../core/services/company-service.service';

@Component({
  selector: 'app-companies-mgt',
  templateUrl: './companies-mgt.component.html',
  styleUrls: ['./companies-mgt.component.scss']
})
export class CompaniesMgtComponent implements OnInit {

  companies: any;
  company?: Company;

  constructor(private companyService: CompanyService, private router: Router) { }

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
  

  companyDelete(id:string) {

    this.companyService.deleteCompany(id).subscribe((response: any) => {
      this.companies = [];
      this.getAllCompanies();

      this.router.navigate(['/companies-mgt']);
      console.log(id);
        });
    }




}
