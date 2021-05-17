import { TestBed } from '@angular/core/testing';

import { ReportGeneratorService } from './report-generator.service';

describe('ReportGeneratorService', () => {
  let service: ReportGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
