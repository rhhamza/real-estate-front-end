import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICompany } from 'src/app/core/interfaces/company';
import { CompanyService } from '../../../core/services/company-service.service';
import { Company } from '../../../core/models/company.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-companies-admin',
  templateUrl: './companies-admin.component.html',
  styleUrls: ['./companies-admin.component.scss']
})
export class CompaniesAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address','status', 'createdAt', 'updatedAt', 'actions','update-status'];
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

  deleteCompany(companyid: string) {  
    Swal.fire({
      title: 'Are you sure you want to delete this Company?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {  
    this.companyService.deleteCompany(companyid).subscribe((response) => {
      console.log(response);
      window.location.reload();
      
    })
  }

    });
  }


  acceptCompany(companyid: string) {  
    Swal.fire({
      title: 'Are you sure you want to accept this Company?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accept it!',
    }).then((result) => {
      if (result.isConfirmed) {  
    this.companyService.acceptCompany(companyid).subscribe((response) => {
      console.log(response);
      window.location.reload();
      
    })
  }

    });
  }
  rejectCompany(companyid: string) {  
    Swal.fire({
      title: 'Are you sure you want to reject this Company?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject it!',
    }).then((result) => {
      if (result.isConfirmed) {  
    this.companyService.rejectCompany(companyid).subscribe((response) => {
      console.log(response);
      window.location.reload();
      
    })
  }

    });
  }


}