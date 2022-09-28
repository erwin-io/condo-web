import { TestBed } from '@angular/core/testing';

import { IncidentsReportsService } from './incidents-reports.service';

describe('IncidentsReportsService', () => {
  let service: IncidentsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
