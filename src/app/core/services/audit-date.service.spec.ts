import { TestBed } from '@angular/core/testing';

import { AuditDateService } from './audit-date.service';

describe('AuditDateService', () => {
  let service: AuditDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
