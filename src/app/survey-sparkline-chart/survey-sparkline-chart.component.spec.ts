import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySparklineChartComponent } from './survey-sparkline-chart.component';

describe('SurveySparklineChartComponent', () => {
  let component: SurveySparklineChartComponent;
  let fixture: ComponentFixture<SurveySparklineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveySparklineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySparklineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
