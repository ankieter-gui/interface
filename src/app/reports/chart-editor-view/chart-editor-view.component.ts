import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { saveAs } from 'file-saver';
import {MockService} from '../../mock.service';

import {ReportMeta, SurveyMeta} from '../../dataModels/survey';
import {SurveysService} from '../../surveys.service';
import {ChartsService} from '../../charts.service';
import {ComplimentQuery, SurveyQueryNamingDictionary} from '../../dataModels/Query';
import {ChartConfig, ChartReportElement} from '../../dataModels/ReportElement';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ReportsService} from '../../reports.service';
import {GlobalFilter} from '../../dataModels/ReportDefinition';
import {Subject} from 'rxjs';

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
      <p><b>{{this.chartData.name?this.chartData.name:this.chartData.dataQuery.get[0][0]}}</b></p>
    <div class="chart-container">

    <section class="chart-area" *ngIf="chartData.config.type=='groupedPercentAndData' && this.echartOptions">
      <div [style.height.px]="echartOptions.pxHeight" echarts (chartInit)="onChartInit($event)" [options]="echartOptions" class="chart" [class.fullWidth]="!(chartData.dataQuery.as.includes('share') && chartData.dataQuery.as.length>1 && dataResponse)" #chartInstance></div>
      <nz-table style="min-height: 300px" *ngIf="chartData.dataQuery.as.includes('share') && chartData.dataQuery.as.length>1 && dataResponse" class="details-table" [nzTemplateMode]="true">
       <thead> <tr><th *ngFor="let header of tableHeaders">{{header | PolskieNazwy | titlecase}}</th></tr></thead>
        <tbody>
        <tr *ngFor="let row of this.tableData"><td *ngFor="let value of row">{{value | number }}</td></tr>
        </tbody>
      </nz-table>
    </section>
      <section class="chart-area" *ngIf="['multipleChoice', 'groupedBars', 'multipleBars', 'linearCustomData'].includes(chartData.config.type)  && this.echartOptions">
        <div echarts [style.height.px]="echartOptions.pxHeight" (chartInit)="onChartInit($event)" [options]="echartOptions" class="chart" style="width: 100%;"></div>
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
   <ng-container *ngIf="!isPreview">
      <section class="query-marker"  *ngIf="chartData.dataQuery.get[0].length>0 && !showLinearPicker" [@fadeInOut]>
                <figure class="indicator-card indicator-card-red" style="width: 290px" (click)="activeTab=0">
                  <div class="indicator-card-inner">
                  <div class="indicator-card-header">Pytanie</div>
                  <div class="indicator-card-content">
                  {{question | RemoveHtml}}


                  </div>
                  </div>
                </figure>
        <div class="arrow-container" *ngIf="!hideData"> <i nz-icon nzType="right"></i></div>
        <figure class="indicator-card indicator-card-green"  *ngIf="!hideData">
          <div class="indicator-card-inner">
            <div class="indicator-card-header">Dane</div>
            <div class="indicator-card-content">{{jointAs | titlecase}}</div>
          </div>
        </figure>
        <div class="arrow-container" *ngIf="!hideGroupBy"> <i nz-icon nzType="right"></i></div>
        <figure class="indicator-card indicator-card-velvet"  *ngIf="!hideGroupBy">
          <div class="indicator-card-inner">
            <div class="indicator-card-header">Grupowanie</div>
            <div class="indicator-card-content">{{chartData.dataQuery.by[0] | RemoveHtml}}</div>
          </div>
        </figure>
       <div class="arrow-container"> <i nz-icon nzType="right"></i></div>
        <figure class="indicator-card indicator-card-purple">
          <div class="indicator-card-inner">
            <div class="indicator-card-header">Filtry</div>
            <div class="indicator-card-content" *ngIf="chartData.config.filter">{{chartData.config.filter.question}} = {{chartData.config.filter.answer}}</div>
            <div class="indicator-card-content" *ngIf="!chartData.config.filter">Brak</div>
          </div>
        </figure>

      </section>

      <nz-collapse class="chart-editor-dropdown">
        <nz-collapse-panel nzHeader="Edytor">
                <div>
                  <input placeholder="Nazwa wykresu" nz-input [(ngModel)]="this.chartData.name" (blur)="refreshChart(); save()"/>
                  <nz-tabset [(nzSelectedIndex)]="activeTab">
                    <nz-tab nzTitle="Wygląd i układ">
                      <section class="query-marker">
                        <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Wykres przedstawiający procent odpowiedzi tak/nie/nie mam zdania w podziale na wydziały lub etapy studiów" (click)="pickPreset('groupedPercentAndData');">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Zgrupowany procent + dane</div>
                            <div class="indicator-card-content"><img src="./assets/preset1.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <div class="spacer"></div>
                        <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Użyj tego wykresu aby przedstawić wyniki z pytań wielokrotnego wyboru. Na przykład: dlaczego poleciłbyś UAM" (click)="pickPreset('multipleChoice');">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Wielokrotny wybór</div>
                            <div class="indicator-card-content"><img src="./assets/preset2.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <div class="spacer"></div>
<!--                        <figure class="indicator-card indicator-card-velvet preset"  nz-tooltip="Użyj tego wykresu aby przedstawić wyniki z pytań wielokrotnego wyboru wraz z danymi statystycznymi jak np. odchylenie. Na przykład: dlaczego poleciłbyś UAM">-->
<!--                          <div class="indicator-card-inner">-->
<!--                            <div class="indicator-card-header">Wielokrotny wybór + dane</div>-->
<!--                            <div class="indicator-card-content"><img src="./assets/preset3.png" style="width: 100%"></div>-->
<!--                          </div>-->
<!--                        </figure>-->
<!--                        <div class="spacer"></div>-->
                        <figure class="indicator-card indicator-card-velvet preset" [nz-tooltip]="'Kiedy chcesz przedstawić dane z różnych wydziałów obok siebie. Przydatne przy prezentowaniu średniej ocen'" (click)="pickPreset('multipleBars')">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Wiele słupków</div>
                            <div class="indicator-card-content"><img src="./assets/preset4.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <div class="spacer"></div>
                        <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Użyj tego wykresu do prezentacji frekwencji" (click)="pickPreset('groupedBars');">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Słupkowy zgrupowany</div>
                            <div class="indicator-card-content"><img src="./assets/wydzialy.png" style="width: 100%"></div>
                          </div>
                        </figure>
                        <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Prezentacja frekwencji na przestrzeni lat" (click)="pickPreset('linearCustomData');">
                          <div class="indicator-card-inner">
                            <div class="indicator-card-header">Liniowy z własnymi danymi</div>
                            <div class="indicator-card-content"><img src="./assets/ocena_lata.png" style="width: 100%"></div>
                          </div>
                        </figure>
                      </section>
                    </nz-tab>
                    <nz-tab nzTitle="Pytanie i dane" *ngIf="!showLinearPicker && this.chartData.config.type">
                      <section class="question-selector dane" *ngIf="!hideData">
                        <div style="display: flex;flex-direction: row"> <span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Dane:</span></div>
                        <div style="display: flex; flex-direction: row; width: 100%">
                          <nz-table #aggregationTable nzTemplateMode>
                            <thead>

                            </thead>
                            <tbody>
                            <tr><td style="cursor: pointer!important;" *ngFor='let q of ["max","min","mode","mean","median","std","var","count","sum"]'  (click)="$event.preventDefault();$event.stopPropagation();asPickerClick(q);refreshChart()"> <label><input style="pointer-events:none" type="checkbox" (click)="$event.preventDefault()" [checked]="chartData.dataQuery.as.includes(q)"> {{q |  PolskieNazwy | titlecase}}</label></td></tr>
                            </tbody>
                          </nz-table>
<!--                          <label  nz-checkbox [nzChecked]="chartData.dataQuery.as.includes(q)" (click)="asPickerClick(q);refreshChart()">{{q | PolskieNazwy | titlecase}}</label>-->

                        </div>
                      </section>
                      <section class="tab-flex-container">
                      <section class="question-selector pytania">
                      <div style="display: flex;flex-direction: row"> <span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Odpowiedzi na pytanie:</span> <nz-input-group class="force-input-borderless" [nzPrefixIcon]="'search'"><input   nzBorderless nz-input placeholder="Wyszukaj..." [(ngModel)]="questionSearchString"> </nz-input-group></div>
                      <div style="display: flex; flex-direction: column">
                        <nz-table #questionTable [nzData]="questionNames|NameFilter: questionSearchString">
                          <thead>
                          <tr>
                            <th>Zaznaczono</th>
                            <th>Pytanie</th>

                          </tr>
                          </thead>
                          <tbody>
                          <tr *ngFor="let q of questionTable.data" (click)="questionPickerClick(q);refreshChart()" style="cursor: pointer">
                            <td>  <label style="pointer-events: none" nz-checkbox [nzChecked]="chartData.dataQuery.get[0].includes(q)"></label></td>
                            <td>{{q}}</td>


                          </tr>
                          </tbody>
                        </nz-table>

                      </div>
                      </section>

                        <section class="question-selector pytania" *ngIf="!hideGroupBy">
                        <div style="display: flex;flex-direction: row"> <span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Grupuj przez:</span> <nz-input-group class="force-input-borderless" [nzPrefixIcon]="'search'"><input   nzBorderless nz-input placeholder="Wyszukaj..." [(ngModel)]="bySearchString"> </nz-input-group></div>
                        <div style="display: flex; flex-direction: column">
                          <nz-table #groupTable [nzData]="questionNames|NameFilter: bySearchString">
                            <thead>
                            <tr>
                              <th>Zaznaczono</th>
                              <th>Pytanie</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let q of groupTable.data" (click)="buPickerClick(q);refreshChart()" style="cursor: pointer">
                              <td>  <label style="pointer-events: none" nz-checkbox [nzChecked]="chartData.dataQuery.by[0]==q"></label></td>
                              <td>{{q}}</td>


                            </tr>
                            </tbody>
                          </nz-table>
<!--                          <label *ngFor="let q of questionNames|NameFilter: bySearchString" nz-checkbox [nzChecked]="chartData.dataQuery.by[0]==q" (click)="buPickerClick(q);refreshChart()">{{q| RemoveHtml}}</label>-->

                        </div>
                        </section>
                      </section>
                    </nz-tab>
                    <nz-tab nzTitle="Dane" *ngIf="showLinearPicker">
                      <app-line-chart-custom-data-picker (saveEmitter)="refreshChart()" [reportId]="reportId" [chart]="this.chartData"></app-line-chart-custom-data-picker>
                    </nz-tab>
                    <nz-tab nzTitle="Dane do wykresu frekwencji" *ngIf="chartData.config.type=='groupedBars'" (nzClick)="barsPicker.updateFields()">
                      <app-grouped-bars-percentage-data-picker #barsPicker [dataResponse]="dataResponse" [namingDictionary]="namingDictionary" (saveEmitter)="refreshChart()" [reportId]="reportId" [chart]="this.chartData"></app-grouped-bars-percentage-data-picker>
                    </nz-tab>
                    <nz-tab nzTitle="Filtry" *ngIf="!showLinearPicker && this.chartData.config.type">
                      <app-filters-selector [namingDictionary]="namingDictionary" [allQuestions]="namingDictionary" (globalFilterChange)="refreshFilter($event)" [(globalFilter)]="this.chartData.config.filter"  [reportId]="reportId"></app-filters-selector>

                    </nz-tab>


                  </nz-tabset>


                </div>
          <button style="margin:1em; width:50%" *ngIf="!this.isPreview" nz-button (click)="saveAsPng()">Zapisz wykres jako png</button>
<!--          <input nz-input placeholder="Wpisz query" [(ngModel)]="advancedQuery" (ngModelChange)="refreshChart()">-->
        </nz-collapse-panel>
<!--        <nz-collapse-panel nzHeader="Zaawansowany edytor">-->
<!--            <input nz-input placeholder="Wpisz query" [(ngModel)]="advancedQuery" (ngModelChange)="refreshChart()">-->
<!--          <hr>-->
<!--          <p>Wykresy z całkowicie własnymi, wpisanymi ręcznie danymi</p>-->
<!--        </nz-collapse-panel>-->
      </nz-collapse>
   </ng-container>

    </section>

  `,
  styles: [
    `
      td{
        padding:15px!important;
      }

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
       flex-grow:1;
        min-width: 50%;
      }
      .fullWidth{
        width:100%;
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
        width:140px;
        min-height: 100px;
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
        font-size:8pt;
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
        display: flex;

        flex-direction: column;
       width:100%;

      }

      .chart{
        min-width: 80%;
      }
      .details-table{

        flex-grow: 1;
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
      .editor-flex-column{
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
  @Input() forceUpdate;
  @Input()
  questions;
  @Input()
  isPreview=false;
@Input()
chartData:ChartReportElement;
@Output() chartDataChange = new EventEmitter<ChartReportElement>()
activeTab=0;
questionSearchString:string
bySearchString:string
  advancedQuery:string;
asSearchString:string
  onPickQuestion;
@Input()
reportId
hideData=false;
showLinearPicker=false;
hideGroupBy=false;
@Input()
globalFilter:GlobalFilter
  @Input()
  namingDictionary
  pickPreset(name){
    this.byPickerClick=(type)=>{}
    this.onPickQuestion = ()=>{}
    this.showLinearPicker=false;
    let fun = {
      'groupedPercentAndData':()=>{
        this.hideData=false;
        this.hideGroupBy=false;
        this.chartData.dataQuery.as[0]='share'
        this.onPickQuestion = (question)=>{this.chartData.dataQuery.get[0][0] = question}
        this.byPickerClick= (q)=>{
          this.chartData.dataQuery.by[0] = q;
          this.chartData.dataQuery.by[1] = "*"
        }
      },
      'multipleChoice':()=>{
        this.hideData=true;
        this.hideGroupBy=true;
        this.chartData.dataQuery.as[0]='share'
        this.chartData.dataQuery.by[0] = '*'
        this.onPickQuestion=(question)=>{
          const exists = this.chartData.dataQuery.get.filter(d=>d[0]==question).length>0
          if (exists) {
            this.chartData.dataQuery.get = this.chartData.dataQuery.get.filter(d => d[0] != question)
          }
          else{
            this.chartData.dataQuery.get.push([question])
          }
          this.chartData.dataQuery.get = (this.chartData.dataQuery.get.filter(d=>d[0]!=undefined))
        }
      },
      "groupedBars":()=>{
        this.hideData=true;
        this.hideGroupBy=true;
        this.chartData.dataQuery.as[0] = 'share'
        this.chartData.dataQuery.by[0] = "*"
        this.onPickQuestion = (question)=>{this.chartData.dataQuery.get[0][0] = question}
      },
      "multipleBars":()=>{
        this.hideData=true;
        this.hideGroupBy=false;
        this.chartData.dataQuery.as[0]='share'
        this.onPickQuestion = (question)=>{this.chartData.dataQuery.get[0][0] = question}
        this.byPickerClick = (by)=>{this.chartData.dataQuery.by[0] = by; this.chartData.dataQuery.by[1]= "*"}
      },
      "linearCustomData":()=>{
       this.showLinearPicker = true;
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
  refreshFilter(filter){
  this.chartData.config.filter=filter
  this.refreshChart(true);
  }
  removeGet(i){
    this.chartData.dataQuery.get[0].splice(i,1)
    this.chartData.dataQuery.as.splice(i,1)
  this.refreshChart()
  }
  save(){
    this.chartDataChange.emit(this.chartData)
  }
  get question(){
   return {"groupedPercentAndData": this.chartData.dataQuery.get[0][0], "multipleBars": this.chartData.dataQuery.get[0][0], "multipleChoice":this.chartData.dataQuery.get.length>1?this.chartsService.sanitizeLabels(this.chartData.dataQuery.get.map(d=>d[0]))[1]:this.chartData.dataQuery.get[0][0], "groupedBars":this.chartData.dataQuery.get[0][0]}[this.chartData.config.type]
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
  get jointAs(){
   return  this.chartData.dataQuery.as.map(d=>SurveyQueryNamingDictionary[d]??d).join(', ')
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
    this.byPickerClick(type)
  }
  byPickerClick=(type:string)=>{}
  constructor(private surveyService:SurveysService, private chartsService:ChartsService, public reportsService:ReportsService) { }

  ngOnInit(): void {
  if (this.forceUpdate)
    this.forceUpdate.subscribe(async (v) => {
      await this.refreshChart(false)
    });
    if (this.chartData.config.type){
      this.pickPreset(this.chartData.config.type)
    }
    this.refreshChart()
  }
  async refreshChart(shallSave=true){

    if (shallSave) this.save()
    try {
      await this.downloadQueryResponse();
      await this.generateChart();
    } catch (e){
      console.log(e)
    }
  }
  @Input()
  surveyId
  dataResponse;
  chartInstance;
onChartInit(e){
  this.chartInstance=e
}
 base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
saveAsPng(){

  let src = this.chartInstance.getDataURL({
    pixelRatio: 2,
    backgroundColor: '#fff'
  });
  console.log(decodeURIComponent(src.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')))
  var blob = this.base64toBlob(decodeURIComponent(src.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')), "image/png")
  saveAs(blob, "wykres_"+this.chartData.name+".png")
}
  async downloadQueryResponse(){

      let _dataResponse: any = await (this.reportsService.getData(this.reportId, this.advancedQuery?JSON.parse(this.advancedQuery):ComplimentQuery(this.chartData.dataQuery, this.globalFilter, this.chartData.config.filter)).toPromise())
      console.log(_dataResponse);
      if ("error" in _dataResponse) {

      } else {
        this.dataResponse = _dataResponse
      }
      console.log(this.dataResponse);


  }
  echartOptions;
  generateChart(){


      this.echartOptions = this.chartsService.generateChart(this.dataResponse, this.chartData, this.reportId, this.namingDictionary)

  }
  get tableHeaders(){
    let pairs = this.chartsService.transformDataIntoPairs(this.dataResponse)
    //quite complex fragment dealing with tranforming the data from:
    //{"mean Price":[20,2,5]}
    //into
    //["mean"]
    return pairs.filter(d=> this.chartData.dataQuery.as.includes(d[0].split(" ")[0]) && d[0].split(" ")[0]!="share").map(d=>d[0].split(" ")[0])
  }
  get tableData(){
    let transpose = m => m[0].map((x,i) => m.map(x => x[i]))
    let tableContent = this.chartsService.transformDataIntoPairs(this.dataResponse).filter(d=> this.chartData.dataQuery.as.includes(d[0].split(" ")[0]) && d[0].split(" ")[0]!="share").map(d=>d[1])
    return transpose(tableContent)
  }

}
