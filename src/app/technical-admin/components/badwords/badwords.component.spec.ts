import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BadWordsComponent } from "./badwords.component";

describe("BadwordsComponent", () => {
  let component: BadWordsComponent;
  let fixture: ComponentFixture<BadWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadWordsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
