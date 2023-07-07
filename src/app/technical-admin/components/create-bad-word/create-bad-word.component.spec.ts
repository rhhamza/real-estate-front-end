import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBadWordComponent } from './create-bad-word.component';

describe('CreateBadWordComponent', () => {
  let component: CreateBadWordComponent;
  let fixture: ComponentFixture<CreateBadWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBadWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBadWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
