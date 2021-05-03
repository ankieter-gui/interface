import {Component, Input, OnInit} from '@angular/core';
import {MockService} from '../../mock.service';
import {ChartReportElement} from '../../dataModels/ReportElement';

@Component({
  selector: 'app-chart-editor-view',
  template: `
    <section class="chart-column-container">
      <mat-form-field class="chart-title-input chart-name">
       <h2> <input matInput placeholder="nazwa wykresu" [(ngModel)]="this.chartData.name"></h2>
      </mat-form-field>
      <section class="query-display">
        <nz-tag [nzColor]="'blue'" class="unit">Pytanie 1</nz-tag><i nz-icon nzType="right"></i>
        <nz-tag [nzColor]="'blue'" class="unit">Wszystkie odpowiedzi</nz-tag><i nz-icon nzType="right"></i>
        <nz-tag [nzColor]="'magenta'" class="unit">jako procent</nz-tag>
<!--        <nz-tag [nzColor]="'red'" class="unit">wydział</nz-tag>-->
<!--        <nz-tag [nzColor]="'red'" class="unit">średnia</nz-tag>-->
      </section>
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
      <div *ngIf="textVisible">
      Opis:
      <ckeditor style="border: 1px dashed rgba(0,0,0,0.4);margin:1em;" [(ngModel)]="chartData.text" type="inline"></ckeditor>
      </div>
    </section>
  `,
  styles: [
    `
      .chart-title-input{
       max-width: 600px;
        width: 50%;
        font-family: "Open Sans"!important;
        margin: auto;
      }
      .chart-container{
        display: flex;
        justify-content: flex-start;
        justify-items: center;
      }
      .chart-editor{
        display: flex;
        justify-items: center;
        justify-content: center;
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
       width:95%;
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
  textVisible:boolean=false;
@Input()
chartData:ChartReportElement;
  constructor(private mockService:MockService) { }

  ngOnInit(): void {
  }
  generateChartOptions(){
    return this.mockService.surveyToChart(this.mockService.mockDashboardData.surveys[0], true);
  }

}
