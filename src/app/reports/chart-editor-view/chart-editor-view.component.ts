import {Component, Input, OnInit} from '@angular/core';
import {MockService} from '../../mock.service';

@Component({
  selector: 'app-chart-editor-view',
  template: `
    <section class="chart-column-container">
    <h2 class="chart-name">Nazwa wykresu</h2>
    <div class="chart-container">

    <section class="chart-area">
      <div echarts [options]="generateChartOptions()" class="chart"></div>
    </section>
      <section class="chart-editor">
        <i nz-icon nzType="line-chart" [nz-tooltip]="'Typ wykresu'"></i>
        <i nz-icon nzType="question" [nz-tooltip]="'Pytania'"></i>
        <i nz-icon nzType="database" [nz-tooltip]="'Agregacje'"></i>
        <i nz-icon nzType="bar-chart" [nz-tooltip]="'Wykres kolumnowy, histogram'"></i>
        <i nz-icon nzType="font-size" [nz-tooltip]="'Tekst'"></i>
      </section>
    </div>
    </section>
  `,
  styles: [
    `
      .chart-container{
        display: flex;
        justify-content: flex-start;
        justify-items: center;
      }
      .chart-editor{
        display: flex;
        flex-direction: column;
      }
      .chart-editor i{
        display: block;
        font-size: 2em;
        margin:0.5em;
        color:rgba(0,0,0,0.6);
        transition: 0.2s all;
      }
      .chart-editor i:hover{
        color:rgba(0,0,0,0.9);
        animation-fill-mode: forwards;
        cursor: pointer;
        transform: scale(1.3);
      }
      .chart-area{
        width:70%;
      }
      .chart-name{
        display: block;
        text-align: center;
      }
      .chart-column-container{
        display: flex;
        flex-direction: column;
      }
      .
    `
  ]
})
export class ChartEditorViewComponent implements OnInit {
@Input()
chartData;
  constructor(private mockService:MockService) { }

  ngOnInit(): void {
  }
  generateChartOptions(){
    return this.mockService.surveyToChart(this.mockService.mockDashboardData.surveys[0], true);
  }

}
