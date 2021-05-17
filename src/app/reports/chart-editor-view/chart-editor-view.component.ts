import {Component, Input, OnInit} from '@angular/core';
import {MockService} from '../../mock.service';
import {ChartReportElement} from '../../dataModels/ReportElement';
import {SurveyMeta} from '../../dataModels/survey';
import {SurveysService} from '../../surveys.service';
import {ChartsService} from '../../charts.service';

@Component({
  selector: 'app-chart-editor-view',
  template: `
    <section class="chart-column-container">
      <mat-form-field class="chart-title-input chart-name">
       <input matInput placeholder="nazwa wykresu" [(ngModel)]="this.chartData.name">
      </mat-form-field>
      <section class="query-display">
<!--        <nz-tag [nzColor]="'blue'" class="unit">Pytanie 1</nz-tag><i nz-icon nzType="right"></i>-->
<!--        <nz-tag [nzColor]="'blue'" class="unit">Wszystkie odpowiedzi</nz-tag><i nz-icon nzType="right"></i>-->
<!--        <nz-tag [nzColor]="'magenta'" class="unit">jako procent</nz-tag>-->
<!--        <nz-tag [nzColor]="'red'" class="unit">wydział</nz-tag>-->
<!--        <nz-tag [nzColor]="'red'" class="unit">średnia</nz-tag>-->
      </section>
    <div class="chart-container">

    <section class="chart-area">
      <div *ngIf="this.echartOptions" echarts [options]="echartOptions" class="chart"></div>
    </section>
<!--      <section class="chart-editor">-->
<!--        <i nz-icon nzType="line-chart" [nz-tooltip]="'Typ wykresu'"></i>-->
<!--        <i nz-icon nzType="question" [nz-tooltip]="'Pytania'"></i>-->
<!--        <i nz-icon nzType="database" [nz-tooltip]="'Agregacje'"></i>-->
<!--        <i nz-icon nzType="bar-chart" [nz-tooltip]="'Wykres kolumnowy, histogram'"></i>-->
<!--        <i nz-icon nzType="font-size" [nz-tooltip]="'Tekst'"></i>-->
<!--      </section>-->
    </div>
      <div *ngIf="true" style="border: 1px dashed rgba(0,0,0,0.2); width:100%;">

      <ckeditor  [(ngModel)]="chartData.text" type="inline"></ckeditor>
      </div>
      <section class="query-marker editor-flex-row">
        <section class="editor-column">
        <div class="entry" *ngFor="let field of chartData.dataQuery.get[0]; let i =index;"><nz-tag nzMode="closeable" (nzOnClose)="removeGet(i)">{{field}}</nz-tag>    <i nz-icon nzType="right"></i> <nz-tag >{{chartData.dataQuery['as'][i]}}</nz-tag></div>
        </section>
        <section class="editor-column">
          <div class="entry" *ngFor="let aggregation of chartData.dataQuery.by; let i =index;"><nz-tag nzMode="closeable" (nzOnClose)="removeBy(i)">{{aggregation}}</nz-tag></div>
        </section>
      </section>
      <nz-collapse  class="chart-editor-dropdown">
        <nz-collapse-panel nzHeader="Edytor wykresu">
                <div class="editor-flex-row">
                  <div class="editor-column">
                    <div> <span style='font-family: "Gilroy ExtraBold", sans-serif'>Weźmy odpowiedzi z</span><input nz-input placeholder="Wyszukaj..." [(ngModel)]="questionSearchString"></div>
                    <nz-tag *ngFor="let q of questionNames|NameFilter: questionSearchString" (click)="questionPickerClick(q);refreshChart()" > {{q}}</nz-tag>

                  </div>
                  <div>
                    <div class="editor-column">
                      <div> <span style='font-family: "Gilroy ExtraBold", sans-serif'>Wobec</span><input nz-input placeholder="Wyszukaj..." [(ngModel)]="bySearchString"></div>
                      <nz-tag *ngFor="let q of questionNames|NameFilter: bySearchString" (click)="chartData.dataQuery.by.push(q);refreshChart()"> {{q}}</nz-tag>

                    </div>
                  </div>
                  <div>
                    <span style='font-family: "Gilroy ExtraBold", sans-serif'>Filtry</span>
                  </div>
                </div>
        </nz-collapse-panel>
      </nz-collapse>

    </section>
  `,
  styles: [
    `
      .editor-column{
        width:32%;
      }
      .chart-title-input{
       max-width: 600px;
        width: 50%;
        font-family: "Gilroy ExtraBold"!important;
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
       width:100%;
      }
      .chart-name{
        display: block;
        text-align: center;
      }
      .chart-column-container{
        display: flex;

        flex-direction: column;
      }
      .editor-flex-row{
        display:flex;
        flex-direction: row;
      }
      .
    `
  ]
})
export class ChartEditorViewComponent implements OnInit {
  textVisible:boolean=false;
  get questionNames(){
    return this.questions?Object.keys(this.questions):[];
  }
  @Input()
  questions;
@Input()
chartData:ChartReportElement;

questionSearchString:string
bySearchString:string

  removeBy(i){
  this.chartData.dataQuery.by.splice(i,1)
  this.refreshChart()
  }
  removeGet(i){
    this.chartData.dataQuery.get[0].splice(i,1)
    this.chartData.dataQuery.as.splice(i,1)
  this.refreshChart()
  }
  questionPickerClick(question){
    this.chartData.dataQuery.get[0].push(question); this.chartData.dataQuery['as'].push('count');
    if (this.chartData.dataQuery.by.length==0){
      this.chartData.dataQuery.by.push(question)
    }
  }

  constructor(private surveyService:SurveysService, private chartsService:ChartsService) { }

  ngOnInit(): void {
    this.refreshChart()
  }
  async refreshChart(){
   await this.downloadQueryResponse();
   await this.generateChart();
  }

  dataResponse;
  async downloadQueryResponse(){
    this.dataResponse = await (this.surveyService.query(1, this.chartData.dataQuery).toPromise())
    console.log(this.dataResponse);
  }
  echartOptions;
  generateChart(){
    console.log(this.chartsService.generateChart(this.dataResponse, this.chartData))
   this.echartOptions = this.chartsService.generateChart(this.dataResponse, this.chartData)

  }


}
