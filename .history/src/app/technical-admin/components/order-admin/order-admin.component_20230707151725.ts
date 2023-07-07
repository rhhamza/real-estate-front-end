import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order-service.service';
import { IOrder } from '../../../core/interfaces/order';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  displayedColumns: any[] = ['id', 'startDate', 'endDate', 'status', 'price', 'createdAt', 'updatedAt', 'company', 'actions'];
  dataSource = new MatTableDataSource<Order>
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  orders: any;
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

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((orders: IOrder[]) => {
      const convertedOrders = orders.map((order: IOrder) => new Order(order));
      this.dataSource = new MatTableDataSource(convertedOrders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
  
}




