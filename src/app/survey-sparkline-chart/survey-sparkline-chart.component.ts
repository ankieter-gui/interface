import {Component, Input, OnInit} from '@angular/core';
import {MockService} from '../mock.service';

@Component({
  selector: 'app-survey-sparkline-chart',
  template: `
    <div echarts [options]="mockService.surveyToChart(survey)" class="chart"></div>
  `,
  styles: [
    `
    .chart{
      height:100px;
    }
    `
  ]
})
export class SurveySparklineChartComponent implements OnInit {
  @Input()
  survey;
  constructor(public mockService:MockService) { }

  ngOnInit(): void {
  }

}
