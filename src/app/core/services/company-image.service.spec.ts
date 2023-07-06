import { TestBed } from '@angular/core/testing';

import { CompanyImageService } from './company-image.service';

describe('CompanyImageService', () => {
  let service: CompanyImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
