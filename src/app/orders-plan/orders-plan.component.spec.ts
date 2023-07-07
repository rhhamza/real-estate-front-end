import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPlanComponent } from './orders-plan.component';

describe('OrdersPlanComponent', () => {
  let component: OrdersPlanComponent;
  let fixture: ComponentFixture<OrdersPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
