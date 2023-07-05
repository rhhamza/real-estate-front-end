import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesMgtComponent } from './companies-mgt.component';

describe('CompaniesMgtComponent', () => {
  let component: CompaniesMgtComponent;
  let fixture: ComponentFixture<CompaniesMgtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesMgtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
