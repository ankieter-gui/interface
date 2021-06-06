import { TestBed } from '@angular/core/testing';

import { SurveyGeneratorService } from './survey-generator.service';

describe('SurveyGeneratorService', () => {
  let service: SurveyGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
