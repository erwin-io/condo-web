import { TestBed } from '@angular/core/testing';

import { GuestMonitoringService } from './guest-monitoring.service';

describe('GuestMonitoringService', () => {
  let service: GuestMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
