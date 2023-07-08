import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../core/services/company-service.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../core/models/order.model';
import { Company } from '../core/models/company.model';
import { IOrder } from '../core/interfaces/order';
import { OrderService } from '../core/services/order-service.service';

@Component({
  selector: 'app-orders-plan',
  templateUrl: './orders-plan.component.html',
  styleUrls: ['./orders-plan.component.scss']
})
export class OrdersPlanComponent implements OnInit {
  selectedPlan?: string;
  id?: string;
  company?: any;
  orderCompany?: any;
  orderType?: string;
  order?: Order;
  companyId?: any
  
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private orderService: OrderService) {}

  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('companyid');
    if (companyId !== null) {
      this.id = companyId;
      this.orderCompany = this.getCompany(companyId);
      
    }
  }

  getCompany(id: string): void {
    this.companyService.getCompanyById(id).subscribe(
      (company: Company) => {
        this.company = company;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  


  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    this.orderType = plan;
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    let price: string = '0';
  
    if (plan === 'Premium') {
      price = '30';
    } else if (plan === 'Standard') {
      price = '20';
    } else if (plan === 'Basic') {
      price = '10';
    }
  
    const order: IOrder = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'ACTIVE',
      price: price.toString(),
      createdAt: '',
      updatedAt: '',
      company: '',
    };
  
    this.order = new Order(order);
  }
  
  addOrderAndAssignToCompany(order: Order, companyId: number): void {
    this.orderService.addOrderAndAssignToCompany(order, companyId).subscribe(
      (addedOrder: Order) => {
        // Handle the success response here (e.g., display success message)
      },
      (error: any) => {
        // Handle the error response here (e.g., display error message)
      }
    );
  }







  
  
  next(): void {
   
    //o: =selectPlan(plan: string)
    if (this.order) {
      this.addOrderAndAssignToCompany(this.order, this.companyId);
    } else {
      // Handle the case when no order is selected
    }
  }
}
