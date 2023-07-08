import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order-service.service';
import { IOrder } from '../../../core/interfaces/order';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from 'src/app/core/services/company-service.service';
import { ICompany } from 'src/app/core/interfaces/company';
import { Company } from 'src/app/core/models/company.model';



@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'status', 'price', 'createdAt', 'updatedAt', 'company', 'actions'];
  dataSource = new MatTableDataSource<Order>
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  orderForm!: FormGroup;

  orders: any;
  constructor(
    private orderService: OrderService,
    private _liveAnnouncer: LiveAnnouncer,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getAllOrders ()
    this.orderForm = this.formBuilder.group({
      start_date: [''],
      end_date: [''],
      price: [''],
      status: ['PENDING'],
      company: ['']
    })
    this.getAllCompanies()
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) this.dataSource.paginator = this.paginator;
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((orders: IOrder[]) => {
      const convertedOrders = orders.map((order: IOrder) => new Order(order));
      this.dataSource = new MatTableDataSource(convertedOrders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	}

/*
  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
*/



  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteOrder(order: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this Order?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(order).subscribe((response) => {
          console.log(response);
          window.location.reload();
        });
        Swal.fire('Success!', 'Leave has been Deleted.', 'success');
      }
    });
  }
  
  openModalOrder() {

  }

  onSubmit() {
    this.orderService.addOrderAndAssignToCompany(this.orderForm.value, this.orderForm.value.company).subscribe((response: any) => {
      console.log(response);
      
    })
  }


  companies: Company[] = []

  getAllCompanies () {
    
    this.companyService.getAllCompanies()
    .subscribe((companies: ICompany[]) => {
      companies.map((company: ICompany) => new Company(company))      
      this.companies = companies
    })


    
  }
}




