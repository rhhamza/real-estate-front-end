import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, of, switchMap, toArray } from 'rxjs';
import { ICompany } from 'src/app/core/interfaces/company';
import { Offer } from 'src/app/core/models/offer';
import { OfferService } from 'src/app/core/services/offer.service';
import { CompanyService } from '../../../core/services/company-service.service';
import { Router } from '@angular/router';
import { Company } from '../../../core/models/company.model';
@Component({
  selector: 'app-companies-admin',
  templateUrl: './companies-admin.component.html',
  styleUrls: ['./companies-admin.component.scss']
})
export class CompaniesAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'createdAt', 'updatedAt'];
  dataSource = new MatTableDataSource<Company>
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private companyService: CompanyService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllCompanies ()
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) this.dataSource.paginator = this.paginator;
  }

  getAllCompanies () {
    
    this.companyService.getAllCompanies()
    .subscribe((companies: ICompany[]) => {
      companies.map((company: ICompany) => new Company(company))      
      this.dataSource = new MatTableDataSource(companies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }



  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteCompany(company: number) {    
    this.companyService.deleteCompany(company).subscribe((response) => {
      console.log(response);
      
    })
  }
}