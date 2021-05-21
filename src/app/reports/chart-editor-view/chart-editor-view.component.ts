import {Component, Input, OnInit} from '@angular/core';
import {MockService} from '../../mock.service';

import {SurveyMeta} from '../../dataModels/survey';
import {SurveysService} from '../../surveys.service';
import {ChartsService} from '../../charts.service';
import {ComplimentQuery} from '../../dataModels/Query';
import {ChartConfig, ChartReportElement} from '../../dataModels/ReportElement';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  animations:[    trigger('fadeInOut', [
    state('in', style({ opacity: 1, transform: 'translateY(0)' })),
    transition('void => *', [

      style({ opacity: 0, transform: 'translateY(15%)' }),

      animate('200ms')

    ]),
    transition('* => void', [
      // animate(200, style({ opacity:0,transform: 'translateY(15%)' }))
    ])
  ])],
  selector: 'app-chart-editor-view',
  template: `
    <ng-template #suffixIconSearch>
      <i nz-icon nzType="search"></i>
    </ng-template>
    <section class="chart-column-container">
<!--      <mat-form-field class="chart-title-input chart-name">-->
<!--       <input matInput placeholder="nazwa wykresu" [(ngModel)]="this.chartData.name">-->
<!--      </mat-form-field>-->
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
<!--      <div *ngIf="true" style="border: 1px dashed rgba(0,0,0,0.2); width:100%;">-->

<!--      <ckeditor  [(ngModel)]="chartData.text" type="inline"></ckeditor>-->
<!--      </div>-->
      <section class="query-marker"  *ngIf="chartData.dataQuery.get[0].length>0" [@fadeInOut]>
                <figure class="indicator-card indicator-card-red" (click)="activeTab=0">
                  <div class="indicator-card-inner">
                  <div class="indicator-card-header">Pytanie</div>
                  <div class="indicator-card-content">
                  {{chartData.dataQuery.get[0][0] | RemoveHtml}}


                  </div>
                  </div>
                </figure>
        <div class="arrow-container"> <i nz-icon nzType="right"></i></div>
        <figure class="indicator-card indicator-card-green">
          <div class="indicator-card-inner">
            <div class="indicator-card-header">Dane</div>
            <div class="indicator-card-content">{{chartData.dataQuery.as.join(', ')}}</div>
          </div>
        </figure>
        <div class="arrow-container"> <i nz-icon nzType="right"></i></div>
        <figure class="indicator-card indicator-card-velvet">
          <div class="indicator-card-inner">
            <div class="indicator-card-header">Grupowanie</div>
            <div class="indicator-card-content">{{chartData.dataQuery.by[0] | RemoveHtml}}</div>
          </div>
        </figure>
       <div class="arrow-container"> <i nz-icon nzType="right"></i></div>
        <figure class="indicator-card indicator-card-purple">
          <div class="indicator-card-inner">
            <div class="indicator-card-header">Filtry</div>
            <div class="indicator-card-content">Brak</div>
          </div>
        </figure>

      </section>
      <nz-collapse class="chart-editor-dropdown">
        <nz-collapse-panel nzHeader="Prosty edytor" [nzActive]="true">
                <div class="editor-flex-row">
                  <nz-tabset [(nzSelectedIndex)]="activeTab">
                    <nz-tab nzTitle="Wygląd i układ">
                      <section class="query-marker">
                        <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Wykres przedstawiający procent odpowiedzi tak/nie/nie mam zdania w podziale na wydziały lub etapy studiów" (click)="pickPreset('groupedPercentAndData');">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Zgrupowany procent + dane</div>
                            <div class="indicator-card-content"><img src="/assets/preset1.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <div class="spacer"></div>
                        <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Użyj tego wykresu aby przedstawić wyniki z pytań wielokrotnego wyboru. Na przykład: dlaczego poleciłbyś UAM">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Wielokrotny wybór</div>
                            <div class="indicator-card-content"><img src="/assets/preset2.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <div class="spacer"></div>
                        <figure class="indicator-card indicator-card-velvet preset"  nz-tooltip="Użyj tego wykresu aby przedstawić wyniki z pytań wielokrotnego wyboru wraz z danymi statystycznymi jak np. odchylenie. Na przykład: dlaczego poleciłbyś UAM">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Wielokrotny wybór + dane</div>
                            <div class="indicator-card-content"><img src="/assets/preset3.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <div class="spacer"></div>
                        <figure class="indicator-card indicator-card-velvet preset" [nz-tooltip]="'Kiedy chcesz przedstawić dane z różnych wydziałów obok siebie. Przydatne przy prezentowaniu średniej ocen'">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Wiele słupków</div>
                            <div class="indicator-card-content"><img src="/assets/preset4.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <div class="spacer"></div>
                        <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Użyj tego wykresu do prezentacji frekwencji">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Słupkowy zgrupowany</div>
                            <div class="indicator-card-content"><img src="/assets/wydzialy.png" style="width: 100%"></div>
                          </div>
                        </figure>
                      </section>
                    </nz-tab>
                    <nz-tab nzTitle="Pytanie i dane">
                      <section class="question-selector dane">
                        <div style="display: flex;flex-direction: row"> <span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Dane:</span></div>
                        <div style="display: flex; flex-direction: row">
                          <label *ngFor='let q of ["share","max","min","mode","mean","median","std","var","count","sum"]' nz-checkbox [nzChecked]="chartData.dataQuery.as.includes(q)" (click)="asPickerClick(q);refreshChart()">{{q | PolskieNazwy}}</label>

                        </div>
                      </section>
                      <section class="tab-flex-container">
                      <section class="question-selector pytania">
                      <div style="display: flex;flex-direction: row"> <span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Odpowiedzi na pytanie:</span> <nz-input-group class="force-input-borderless" [nzPrefixIcon]="'search'"><input   nzBorderless nz-input placeholder="Wyszukaj..." [(ngModel)]="questionSearchString"> </nz-input-group></div>
                      <div style="display: flex; flex-direction: column">
                        <label *ngFor="let q of questionNames|NameFilter: questionSearchString" nz-checkbox [nzChecked]="chartData.dataQuery.get[0].includes(q)" (click)="questionPickerClick(q);refreshChart()">{{q| RemoveHtml}}</label>

                      </div>
                      </section>

                        <section class="question-selector pytania">
                        <div style="display: flex;flex-direction: row"> <span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Grupuj przez:</span> <nz-input-group class="force-input-borderless" [nzPrefixIcon]="'search'"><input   nzBorderless nz-input placeholder="Wyszukaj..." [(ngModel)]="bySearchString"> </nz-input-group></div>
                        <div style="display: flex; flex-direction: column">
                          <label *ngFor="let q of questionNames|NameFilter: bySearchString" nz-checkbox [nzChecked]="chartData.dataQuery.by[0]==q" (click)="buPickerClick(q);refreshChart()">{{q| RemoveHtml}}</label>

                        </div>
                        </section>
                      </section>
                    </nz-tab>
                    <nz-tab nzTitle="Filtry">

                    </nz-tab>

                  </nz-tabset>


                </div>
        </nz-collapse-panel>
        <nz-collapse-panel nzHeader="Zaawansowany edytor">

        </nz-collapse-panel>
      </nz-collapse>

    </section>
  `,
  styles: [
    `
      .spacer{
        width:25px;
      }
      .editor-column{
        width:32%;
      }
      .indicator-card-red{
        border-bottom: 10px solid #FF4C61 ;
      }
      .indicator-card-green{
        border-bottom: 10px solid #69AF81 ;
      }
      .indicator-card-velvet{
        border-bottom: 10px solid #6970AF ;
      }
      .indicator-card-purple{
        border-bottom: 10px solid #A569AF ;
      }

      .tab-flex-container{
        display: flex;
        flex-direction: row;
      }
      .question-selector{
        margin-top:15px;
      }
      .indicator-card.preset{
        cursor: pointer;
        width:200px;
        height:200px;
        transition: 0.2s all;
      }
      .indicator-card.preset:hover{
        transform: scale(1.01);
      }
      .query-selector .dane{
        width:50%;
      }
      .pytania{
        width:50%;
      }
      .query-marker{
        margin-top:2em;
        display: flex;
        flex-direction: row;
        justify-content: center;
        justify-items: center;
        flex-wrap: wrap;
      }
      .query-marker > i{
        display: block;

        text-align: center;
      }
      .arrow-container{
        margin-left: 15px;
        margin-right: 15px;
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center; /* align vertical */
      }
      .indicator-card{
        width:210px;
        min-height: 153px;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        border-radius: 7px;

      }
      .indicator-card .indicator-card-header{
        font-family: "Gilroy ExtraBold";
        font-size:14pt;
      }
      .indicator-card .indicator-card-content{
        font-family: "Gilroy Light";
        padding-top:25px;
        font-size:12pt;
      }
      .indicator-card-inner{
        padding:15px;
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
        min-height:300px;
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
activeTab=0;
questionSearchString:string
bySearchString:string
asSearchString:string
  onPickQuestion;
  pickPreset(name){
    let fun = {
      'groupedPercentAndData':()=>{
        this.chartData.dataQuery.as[0]='share'
        this.onPickQuestion = (question)=>{this.chartData.dataQuery.get[0][0] = question}
      }
    }[name]
    this.chartData.config.type=name;
    fun()
    this.activeTab=1;
  }
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
    this.onPickQuestion(question);
    // this.chartData.dataQuery.get[0][0]= question;
    // console.log(this.chartData.dataQuery)
    // if (this.chartData.dataQuery.as.length==0){
    //   this.chartData.dataQuery['as'].push('count');
    // }
    // if (this.chartData.dataQuery.by.length==0){
    //   this.chartData.dataQuery.by.push(question)
    // }
  }
  asPickerClick(type){
   if (this.chartData.dataQuery.as.includes(type)){
     this.chartData.dataQuery.as = this.chartData.dataQuery.as.filter(d => d !== type)
   }else{
     this.chartData.dataQuery.as.push(type)
   }
  }
  buPickerClick(type){
    this.chartData.dataQuery.by[0] = type
  }

  constructor(private surveyService:SurveysService, private chartsService:ChartsService) { }

  ngOnInit(): void {

    this.refreshChart()
  }
  async refreshChart(){
    try {
      await this.downloadQueryResponse();
      await this.generateChart();
    } catch (e){
      console.log(e)
    }
  }

  dataResponse;
  async downloadQueryResponse(){

      let _dataResponse: any = await (this.surveyService.query(1, ComplimentQuery(this.chartData.dataQuery)).toPromise())
      console.log(_dataResponse);
      if ("error" in _dataResponse) {

      } else {
        this.dataResponse = _dataResponse
      }
      console.log(this.dataResponse);


  }
  echartOptions;
  generateChart(){

      console.log(this.chartsService.generateChart(this.dataResponse, this.chartData))
      this.echartOptions = this.chartsService.generateChart(this.dataResponse, this.chartData)

  }


}
