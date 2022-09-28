import { TestBed } from '@angular/core/testing';

import { MonthlyDuesService } from './monthly-dues.service';

describe('MonthlyDuesService', () => {
  let service: MonthlyDuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyDuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
