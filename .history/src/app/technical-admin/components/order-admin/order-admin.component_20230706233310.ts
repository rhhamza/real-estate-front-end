import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
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
import { Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order-service.service';
import { IOrder } from 'src/app/core/interfaces/order';
@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'status', 'price', 'createdAt', 'updatedAt', 'company'];
  dataSource = new MatTableDataSource<Order>
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private orderService: OrderService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllOrders ()
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) this.dataSource.paginator = this.paginator;
  }

  getAllOrders () {
    
    this.orderService.getAllOrders()
    .subscribe((orders: IOrder[]) => {
      orders.map((order: IOrder) => new Order(order))      
      this.dataSource = new MatTableDataSource(orders);
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

  deleteCompany(order: number) {    
    this.orderService.deleteOrder(order).subscribe((response) => {
      console.log(response);
      
    })
  }
}