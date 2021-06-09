import { TestBed } from '@angular/core/testing';

import { CachedDataDownloadSynchronizerService } from './cached-data-download-synchronizer.service';

describe('CachedDataDownloadSynchronizerService', () => {
  let service: CachedDataDownloadSynchronizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachedDataDownloadSynchronizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
