import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-plan',
  templateUrl: './orders-plan.component.html',
  styleUrls: ['./orders-plan.component.scss']
})
export class OrdersPlanComponent implements OnInit {
  selectedPlan?: string;
  constructor() { }

  ngOnInit(): void {
  
  }
  selectPlan(plan: string) {
    this.selectedPlan = plan;
  }
  
}



