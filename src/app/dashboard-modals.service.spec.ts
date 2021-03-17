import { TestBed } from '@angular/core/testing';

import { DashboardModalsService } from './dashboard-modals.service';

describe('DashboardModalsService', () => {
  let service: DashboardModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
