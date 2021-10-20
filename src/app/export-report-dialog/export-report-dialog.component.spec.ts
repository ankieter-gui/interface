import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExportReportDialogComponent} from './export-report-dialog.component';

describe('ExportReportDialogComponent', () => {
  let component: ExportReportDialogComponent;
  let fixture: ComponentFixture<ExportReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportReportDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
