import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../core/services/company-service.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../core/models/order.model';
import { Company } from '../core/models/company.model';
import { IOrder } from '../core/interfaces/order';
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

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

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
    if (plan === 'Premium'){const price = 30};
    if(plan === 'Standard'){const price = 20};
    if(plan === 'Basic'){const price = 10};


    const order: IOrder =({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      price:
      // Set other properties of the order as needed
    });




  }
}
