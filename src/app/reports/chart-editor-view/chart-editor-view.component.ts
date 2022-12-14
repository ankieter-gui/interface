import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {MockService} from '../../mock.service';
import { saveAs } from 'file-saver';
import { svgAsPngUri } from 'save-svg-as-png';

import {ReportMeta, SurveyMeta} from '../../dataModels/survey';
import {SurveysService} from '../../surveys.service';
import {ChartsService} from '../../charts.service';
import {ComplimentQuery, SurveyQueryNamingDictionary} from '../../dataModels/Query';
import {ChartConfig, ChartReportElement} from '../../dataModels/ReportElement';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ReportsService} from '../../reports.service';
import {GlobalFilter, ReportDefinition} from '../../dataModels/ReportDefinition';
import {Subject} from 'rxjs';
import {IgnoreSelectorComponent} from '../../ignore-selector/ignore-selector.component';
import {SuggestionsGenerator} from '../../SuggestionsGenerator';

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

      <div *ngIf="this.chartData.name||(this.chartData.dataQuery.get[0]&&this.chartData.dataQuery.get[0][0]) || ['linearCustomData',  'multipleBarsOwnData'].includes(this.chartData.config.type)">
        <button *ngIf="!isPreview" [nz-tooltip]="'Pobierz wykres jako obrazek .png'" nz-button nzType="primary" nzSize="default"
                nzShape="circle"
                style="position: absolute;right:50px;top:-15px" (click)="saveAsPng()"><i nz-icon nzType="download"></i></button>
        <label style="margin-bottom:0.4em" nz-checkbox [(ngModel)]="this.chartData.config.showTitle" (ngModelChange)="save()"
               *ngIf="!isPreview && (this.chartData.name||(this.chartData.dataQuery.get[0]&&this.chartData.dataQuery.get[0][0])) ">
          {{ chartData.config.showTitle ? 'Wyświetlać tytuł?' : 'Wyświetlać tytuł?' }}
        </label>
        <p [style.display]="isPreview? chartData.config.showTitle?'block':'none':'block'"
           [class.title-hidden]="!chartData.config.showTitle">
            <input *ngIf="this.chartData.dataQuery.get[0] && !isPreview" nz-input [value]="this.chartData.name ? this.chartData.name : this.chartData.dataQuery.get[0] ? this.chartData.dataQuery.get[0][0] : ''" [disabled]="!this.chartData.config.showTitle" (blur)="save()" [(ngModel)]="this.chartData.name" [placeholder]="this.chartData.dataQuery.get[0][0]">
            <span *ngIf="this.chartData.dataQuery.get[0] && isPreview" style="font-weight: bold;">
              {{this.chartData.name ? this.chartData.name : this.chartData.dataQuery.get[0] ? this.chartData.dataQuery.get[0][0] : ''}}
            </span>
<!--          <b>{{this.chartData.name ? this.chartData.name : this.chartData.dataQuery.get[0][0]}}</b>-->
        </p>
        <p *ngIf="this.error" style="color:red;">{{this.error}}</p>
        <div class="chart-container summary-container" *ngIf="this.chartData.config.type=='summary' || this.chartData.config.type=='groupSummary'">
          <figure *ngIf="!chartData.config.type || isError" style="margin:auto;"><img
            src="../../../assets/Continuous-Animations_guidelines.gif">
          <p *ngIf="this.error" style="color:red;">{{this.error}}</p>
          </figure>
          <section class="chart-area" *ngIf="this.echartOptions">
            <div [style.height.px]="echartOptions.pxHeight" echarts (chartInit)="onChartInit($event)" [options]="echartOptions"
                 class="chart"
                 [class.fullWidth]="!(chartData.dataQuery.as.includes('share') && chartData.dataQuery.as.length>1 && dataResponse)"
                 #chartInstance>
            </div>
            <nz-table
              *ngIf="chartData.dataQuery.as.length>1 && dataResponse && chartData.generator"
              class="details-table details-table-summary" [nzTemplateMode]="true">
              <thead style="white-space: nowrap;">

              <tr>
                <th style="white-space: nowrap; background:transparent!important;padding:0px;"
                    *ngFor="let header of chartData.generator.tableData.headers">{{header | PolskieNazwy}}</th>
              </tr>
              </thead>
              <tbody>
              <tr style="line-height: 1!important; padding:0px!important;" *ngFor="let row of chartData.generator.tableData.data">
                <td
                  style="white-space: nowrap; padding-right:0px!important;padding-top:0px!important;padding-bottom:0px!important;height:23px"
                  [class.leftpadding]="i>0"
                  *ngFor="let value of row; let i=index;">{{
                  this.reportsService.getLabelFor(namingDictionary, this.question, value) == value ?
                    this.round(value, chartData.generator.tableData.headers[i]) :
                    ['share','mode'].includes(this.chartData.generator.tableData.headers[i]) ?
                      this.reportsService.getLabelFor(namingDictionary, this.question, value):
                      round(value,chartData.generator.tableData.headers[i]) }}</td>
              </tr>
              </tbody>
            </nz-table>
          </section>

        </div>
        <div class="chart-container" *ngIf="this.chartData.config.type!='summary' && this.chartData.config.type!='groupSummary'">
          <figure *ngIf="!chartData.config.type || isError" style="margin:auto;">
            <p *ngIf="this.error" style="color:red;">Błąd: {{this.error}}</p>
            <img
            src="../../../assets/Continuous-Animations_guidelines.gif"></figure>
          <section class="chart-area" *ngIf="chartData.config.type=='groupedPercentAndData' && this.echartOptions">
            <div [style.height.px]="echartOptions.pxHeight" echarts (chartInit)="onChartInit($event)" [options]="echartOptions"
                 class="chart"
                 [class.fullWidth]="!(chartData.dataQuery.as.includes('share') && chartData.dataQuery.as.length>1 && dataResponse)"
                 #chartInstance>
            </div>
            <nz-table
              *ngIf="(chartData.dataQuery.as.includes('share') || chartData.dataQuery.as.includes('mean') )&& chartData.dataQuery.as.length>1 && dataResponse && chartData.generator && chartData.generator.tableData && chartData.generator.tableData.headers"
              class="details-table" [nzTemplateMode]="true">
              <thead style="white-space: nowrap;">
              <tr>
                <th style="white-space: nowrap; background:transparent!important;"
                    *ngFor="let header of this.chartData.generator.tableData.headers">{{header | PolskieNazwy | titlecase}}</th>
              </tr>
              </thead>
              <tbody>
              <tr style="line-height: 1.428!important;" *ngFor="let row of this.chartData.generator.tableData.data">
                <td style="white-space: nowrap"
                    *ngFor="let value of row; let i =index">{{this.reportsService.getLabelFor(namingDictionary, this.question, value) == value ?
                  this.round(value, chartData.generator.tableData.headers[i]) :
                  ['share','mode'].includes(this.chartData.generator.tableData.headers[i]) ?
                    this.reportsService.getLabelFor(namingDictionary, this.question, value):
                    round(value,chartData.generator.tableData.headers[i]) }}</td>
              </tr>
              </tbody>
            </nz-table>
          </section>
          <section class="chart-area"
                   *ngIf="['multipleChoice', 'groupedBars', 'multipleBars', 'linearCustomData', 'summary','groupSummary', 'multipleBarsOwnData'].includes(chartData.config.type)  && this.echartOptions">
            <div echarts [style.height.px]="echartOptions.pxHeight" (chartInit)="onChartInit($event)" [options]="echartOptions"
                 class="chart"
                 style="width: 100%;"></div>
            <div style="position: absolute;right: 5%;bottom:50px; border: 1px solid rgba(0,0,0,0.05); padding:0.7em; background-color:white;"

                 *ngIf="chartData.generator && chartData.generator.allAnswers">Wszystkie
              odpowiedzi: {{chartData.generator.allAnswers}}</div>
          </section>
        </div>

      </div>
      <ng-container *ngIf="!isPreview">
        <section class="query-marker"
                 *ngIf="(this.chartData.dataQuery.get[0]&&this.chartData.dataQuery.get[0][0]) && (chartData.dataQuery.get[0].length>0 && !showLinearPicker)"
                 [@fadeInOut]>
          <figure class="indicator-card indicator-card-red" style="width: 290px" (click)="activeTab=1">
            <div class="indicator-card-inner">
              <div class="indicator-card-header">Pytanie</div>
              <div class="indicator-card-content">
                {{question | RemoveHtml}}
              </div>
            </div>
          </figure>
          <div class="arrow-container" *ngIf="!hideData"><i nz-icon nzType="right"></i></div>
          <figure class="indicator-card indicator-card-green" *ngIf="!hideData" (click)="activeTab=1">
            <div class="indicator-card-inner">
              <div class="indicator-card-header">Dane</div>
              <div class="indicator-card-content">{{jointAs | titlecase}}</div>
            </div>
          </figure>
          <div class="arrow-container" *ngIf="!hideGroupBy"><i nz-icon nzType="right"></i></div>
          <figure class="indicator-card indicator-card-velvet" *ngIf="!hideGroupBy" (click)="activeTab=1">
            <div class="indicator-card-inner" *ngIf="chartData.dataQuery.by && chartData.dataQuery.by[0]">
              <div class="indicator-card-header">Grupowanie</div>
              <div class="indicator-card-content">{{chartData.dataQuery.by[0] | RemoveHtml}}</div>
            </div>
          </figure>
          <div class="arrow-container"><i nz-icon nzType="right"></i></div>
          <figure class="indicator-card indicator-card-purple filtry-card" (click)="activeTab=4">
            <div class="indicator-card-inner">
              <div class="indicator-card-header"> Filtry <span *ngIf="this.chartData.config.filters">({{this.chartData.config.filters.length}})</span></div>
              <div class="indicator-card-content">{{filtersAsString}}
              </div>

            </div>
          </figure>
        </section>
        <nz-collapse class="chart-editor-dropdown" style="position: relative">

          <nz-collapse-panel nzHeader="Edytor" [nzActive]="isEditing" (nzActiveChange)="isEditing=$event">

            <div *ngIf="isEditing">
              <!--                  <input placeholder="Nazwa wykresu" nz-input [(ngModel)]="this.chartData.name" (blur)="refreshChart(); save()"/>-->
              <nz-tabset [(nzSelectedIndex)]="activeTab">
                <nz-tab nzTitle="Wygląd i układ">
                  <section class="query-marker">
                    <figure class="indicator-card indicator-card-velvet preset"
                            nz-tooltip="Wykres przedstawiający procent odpowiedzi tak/nie/nie mam zdania w podziale na wydziały lub etapy studiów"
                            (click)="pickPreset('groupedPercentAndData');">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Ocena aspektu w skali</div>
                        <div class="indicator-card-content"><img src="./assets/preset1.png" style="width: 100%"></div>
                      </div>
                    </figure>
                    <div class="spacer"></div>
                    <figure class="indicator-card indicator-card-velvet preset"
                            nz-tooltip="Użyj tego wykresu aby przedstawić wyniki z pytań wielokrotnego wyboru. Na przykład: dlaczego poleciłbyś UAM"
                            (click)="pickPreset('multipleChoice');">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Wielokrotny wybór</div>
                        <div class="indicator-card-content"><img src="./assets/preset2.png" style="width: 100%"></div>
                      </div>
                    </figure>
                    <div class="spacer"></div>
                    <figure class="indicator-card indicator-card-velvet preset"
                            [nz-tooltip]="'Kiedy chcesz przedstawić dane z różnych wydziałów obok siebie. Przydatne przy prezentowaniu średniej ocen'"
                            (click)="pickPreset('multipleBars')">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Wiele słupków (oceny)</div>
                        <div class="indicator-card-content"><img src="./assets/preset4.png" style="width: 100%"></div>
                      </div>
                    </figure>
                    <div class="spacer"></div>
                    <figure class="indicator-card indicator-card-velvet preset"
                            [nz-tooltip]="'Wykres słupkowy z własnymi danymi wprowadzonymi ręcznie'"
                            (click)="pickPreset('multipleBarsOwnData')">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Wiele słupków - własne dane</div>
                        <div class="indicator-card-content"><img src="./assets/preset4.png" style="width: 100%"></div>
                      </div>
                    </figure>
                    <div class="spacer"></div>
                    <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Użyj tego wykresu do prezentacji frekwencji"
                            (click)="pickPreset('groupedBars');">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Frekwencja</div>
                        <div class="indicator-card-content"><img src="./assets/wydzialy.png" style="width: 100%"></div>
                      </div>
                    </figure>
                    <div class="spacer"></div>
                    <figure class="indicator-card indicator-card-velvet preset" nz-tooltip="Prezentacja frekwencji na przestrzeni lat"
                            (click)="pickPreset('linearCustomData');">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Liniowy z własnymi danymi</div>
                        <div class="indicator-card-content"><img src="./assets/ocena_lata.png" style="width: 100%"></div>
                      </div>
                    </figure>
                    <div class="spacer"></div>
                    <figure class="indicator-card indicator-card-velvet preset"
                            (click)="pickPreset('summary');">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Podsumowanie</div>
                        <div class="indicator-card-content"><img src="./assets/podsumowanie.PNG" style="width: 100%"></div>
                      </div>
                    </figure>
                    <div class="spacer"></div>
                    <figure class="indicator-card indicator-card-velvet preset"
                            (click)="pickPreset('groupSummary');">
                      <div class="indicator-card-inner">
                        <div class="indicator-card-header">Grupowe podsumowanie</div>
                        <div class="indicator-card-content"><img src="./assets/grupowePodsumowanie.png" style="width: 100%"></div>
                      </div>
                    </figure>
                  </section>
                </nz-tab>
                <nz-tab nzTitle="Konfiguracja grup" *ngIf="this.chartData.config.type=='groupSummary'">
                        <app-group-summary-picker (saveEmitter)="refreshChart()" [chartData]="chartData" [questions]="this.questions" [questionNames]="this.questionNames"></app-group-summary-picker>
                </nz-tab>
                <nz-tab nzTitle="Pytanie i dane" *ngIf="!showLinearPicker && this.chartData.config.type && !['groupSummary', 'multipleBarsOwnData', 'multipleBarsOwnData'].includes(this.chartData.config.type)">
                  <section class="question-selector dane" *ngIf="!hideData">
                    <div style="display: flex;flex-direction: row"><span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Dane:</span>
                    </div>
                    <div style="display: flex; flex-direction: row; width: 100%">
                      <nz-table #aggregationTable nzTemplateMode>
                        <thead>
                        </thead>
                        <tbody>
                        <tr>
                          <td style="cursor: pointer!important;"
                              *ngFor='let q of ["max","min","mode","mean","median","std","var","count", "rows","sum"]'
                              (click)="$event.preventDefault();$event.stopPropagation();asPickerClick(q);refreshChart()"><label><input
                            style="pointer-events:none;" type="checkbox" (click)="$event.preventDefault()"
                            [checked]="chartData.dataQuery.as.includes(q)"> {{q |  PolskieNazwy}}</label></td>
                        </tr>
                        </tbody>
                      </nz-table>
                      <!--                          <label  nz-checkbox [nzChecked]="chartData.dataQuery.as.includes(q)" (click)="asPickerClick(q);refreshChart()">{{q | PolskieNazwy | titlecase}}</label>-->
                    </div>
                  </section>
                  <section class="tab-flex-container">
                    <section class="question-selector pytania">
                      <div style="display: flex;flex-direction: row; margin-right: 20px"><span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Weź pytania:</span>
                        <nz-input-group  [nzPrefixIcon]="'search'"><input nzBorderless nz-input
                                                                                                        placeholder="Wyszukaj..."
                                                                                                        [(ngModel)]="questionSearchString">
                        </nz-input-group>
                      </div>
                      <div style="display: flex; flex-direction: column">

                        <nz-table #questionTable [nzData]="questionNamesWithSuggestions|NameFilter: questionSearchString">
                          <thead>
                          <tr>
                            <th>Zaznaczono</th>
                            <th>Pytanie</th>
                          </tr>
                          </thead>
                          <tbody>

                          <tr *ngFor="let q of questionTable.data" (click)="questionPickerClick(q);refreshChart()" style="cursor: pointer">
                            <td><label style="pointer-events: none" nz-checkbox
                                       [nzChecked]="chartData.dataQuery.get.flat().includes(q)"></label></td>
                            <td>{{q}}</td>
                          </tr>
                          </tbody>
                        </nz-table>
                      </div>
                    </section>
                    <section class="question-selector pytania" *ngIf="!hideGroupBy">
                      <div style="display: flex;flex-direction: row;margin-right: 20px"><span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Grupuj przez:</span>
                        <nz-input-group class="force-input-borderless" [nzPrefixIcon]="'search'"><input nzBorderless nz-input
                                                                                                        placeholder="Wyszukaj..."
                                                                                                        [(ngModel)]="bySearchString">
                        </nz-input-group>
                      </div>
                      <div style="display: flex; flex-direction: column">
                        <nz-table #groupTable [nzData]="groupByWithSuggestions|NameFilter: bySearchString">
                          <thead>
                          <tr>
                            <th>Zaznaczono</th>
                            <th>Pytanie</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr *ngFor="let q of groupTable.data" (click)="buPickerClick(q);refreshChart()" style="cursor: pointer">
                            <td><label style="pointer-events: none" nz-checkbox [nzChecked]="chartData.dataQuery.by[0]==q"></label></td>
                            <td>{{q}}</td>
                          </tr>
                          </tbody>
                        </nz-table>
                      </div>
                    </section>
                  </section>
                </nz-tab>
                <nz-tab nzTitle="Dane" *ngIf="chartData.config.type==='multipleBarsOwnData'">
                  <app-multiple-bars-with-custom-data-data-picker [chartElement]="chartData" (saveEmitter)="refreshChart()"></app-multiple-bars-with-custom-data-data-picker>
                </nz-tab>
                <nz-tab nzTitle="Dane" *ngIf="showLinearPicker">
                  <app-line-chart-custom-data-picker (saveEmitter)="refreshChart()" [reportId]="reportId"
                                                     [chart]="this.chartData"></app-line-chart-custom-data-picker>
                </nz-tab>
                <nz-tab nzTitle="Dane do wykresu frekwencji" *ngIf="chartData.config.type=='groupedBars'"
                        (nzClick)="barsPicker.updateFields()">
                  <app-grouped-bars-percentage-data-picker #barsPicker [dataResponse]="dataResponse" [namingDictionary]="namingDictionary"
                                                           (saveEmitter)="refreshChart()" [reportId]="reportId"
                                                           [chart]="this.chartData"></app-grouped-bars-percentage-data-picker>
                </nz-tab>
                <nz-tab nzTitle="Filtry" *ngIf="!showLinearPicker && this.chartData.config.type && this.chartData.config.type!='multipleBarsOwnData'">
                  <app-filters-selector [namingDictionary]="namingDictionary" [allQuestions]="questions"
                                        (filtersChange)="refreshFilter($event)" [(filters)]="this.chartData.config.filters" [multipleQuestionsAllowed]="true"
                                        [reportId]="reportId"></app-filters-selector>
                </nz-tab>

                <nz-tab nzTitle="Ustawienia statystyk" *ngIf="['groupedPercentAndData', 'summary', 'groupSummary'].includes(chartData.config.type)">
                  <app-ignore-selector #ignoreSelector [chart]="chartData" *ngIf="this.dataResponse" (dataChanged)="refreshChart()"
                                       [lastDataResponse]="this.dataResponse"></app-ignore-selector>
                </nz-tab>
                <nz-tab nzTitle="Kolory i kolejność"
                        *ngIf=" chartData.config.order && chartData.config.type!=='multipleChoice'">
                  <app-colors-and-order-selector [dictionary]="namingDictionary" (update)="refreshChart()"
                                                 [lastDataResponse]="this.dataResponse" [chart]="chartData"></app-colors-and-order-selector>

                </nz-tab>
                <nz-tab nzTitle="Kolory i kolejność"
                        *ngIf="chartData.config.type=='multipleChoice'">
                  <app-simple-color-selector (update)="refreshChart()" [chart]="chartData"></app-simple-color-selector>

                </nz-tab>
              </nz-tabset>
             <div style="display: flex;flex-direction: row"> <button style="margin-right:2em;" nz-button (click)="requestJSONConfig()">Pobierz JSON wykresu</button><input nz-input (blur)="assignAdvancedQueryAsConfig(); refreshChart()" [(ngModel)]="advancedQuery" placeholder="lub wklej wykres zapisany jako json">
             </div>
             </div>
            <div  *ngIf="this.chartData.config.type!=='groupedBars'">Nazwa całego zestawu danych (np.: łącznie, razem, UAM):
              <input nz-input (blur)="refreshChart(true)" placeholder="Nazwa dla zagregowanych wyników - może to być 'Razem', 'łącznie' itd"
                     [(ngModel)]="chartData.config.allTogetherLabel" value="UAM">
            </div>
            <label style="margin-top:1em;" nz-checkbox [(ngModel)]="this.parentElement.alwaysBreakAfter">Złam stronę po tym wykresie.</label>


            <!--            <div><label nz-checkbox [(ngModel)]="this.chartData.config.shortLabels"-->
<!--                        [nz-tooltip]="'Jeżeli etykieta jest zbyt długa, zostanie ona ucięta'">Krótkie etykiety</label></div>-->

          </nz-collapse-panel>

        </nz-collapse>
      </ng-container>
    </section>



  `,
  styles: [
    `
      .foo.sn-viewport--out {
        display: none;
      }

      .details-table-summary {

      }

      .foo.sn-viewport--in {
        display: block;
      }

      @media screen and (min-width: 1920px) {

        /*.chart-editor-dropdown{*/
        /*  position: absolute;*/
        /*  left:110%;*/
        /*}*/
        /*.inner-content{width:800px}*/
      }


      .chart-area td:not(.leftpadding) {
        padding-top: 9px !important;
        padding-bottom: 9px !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .chart-area th {
        max-width: 70px;

        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .spacer {
        width: 25px;
      }

      .editor-column {
        width: 32%;
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

      .arrow-container {
        margin-left: 15px;
        margin-right: 15px;
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center; /* align vertical */
      }

      .indicator-card {
        width: 140px;
        height:150px;

        cursor: pointer;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
        border-radius: 7px;
        transition: all 0.1s ease-out;
      }

      .indicator-card:hover {
        transform: scale(1.03);
      }

      .indicator-card .indicator-card-header {
        font-family: "Gilroy ExtraBold";
        font-size: 14pt;
      }
      .filtry-card .indicator-card-content {
        max-height: 100px;

        overflow-y: scroll;
      }
      .indicator-card .indicator-card-content {
        font-family: "Gilroy Light";
        padding-top: 25px;
        font-size: 8pt;
        max-height: 100px;

        overflow-y: hidden;
      }

      .indicator-card-inner {
        padding:15px;
      }
      .chart-title-input{
        max-width: 600px;
        width: 50%;
        font-family: "Gilroy ExtraBold" !important;
        margin: auto;
      }

      .chart-container {
        display: flex;
        justify-content: flex-start;
        justify-items: center;
      }

      .details-table td {
        text-align: center;
      }

      .details-table th {
        text-align: center;
      }

      .title-hidden {
        color: rgba(0, 0, 0, 0.3);
      }

      .chart-editor {
        display: flex;
        justify-items: center;
        justify-content: center;
        flex-direction: column;
      }

      .chart-editor i {
        display: block;
        font-size: 2em;
        margin: 0.5em;
        color:rgba(0,0,0,0.6);
        transition: 0.2s all;
      }
      .chart-editor i:hover{
        color: rgba(0, 0, 0, 0.9);
        animation-fill-mode: forwards;
        cursor: pointer;
        transform: scale(1.3);
      }

      .chart-area {
        display: flex;
        flex-direction: row;
        width: 100%;
      }

      .leftpadding {
        padding-left: 12px !important;
      }

      .chart {
        transition: 0.2s all ease-in-out;
        min-width: 80%;
      }

      .details-table {

        flex-grow: 1;
      }

      .ant-table-thead > tr > th {
        background: transparent !important;
      }

      .chart-name {
        display: block;
        text-align: center;
      }

      .chart-column-container {
        display: flex;

        flex-direction: column;
      }

      .editor-flex-row {
        display:flex;
        flex-direction: row;
      }

      .editor-flex-column {
        display: flex;
        flex-direction: row;
      }

      .
    `
  ]
})
export class ChartEditorViewComponent implements OnInit {
  @Input()
  parentElement;
  @Input()
  isLast = false;
  isEditing = false;

  textVisible: boolean = false;

  get questionNames() {
    return this.questions ? this.questions : [];
  }
  get questionNamesWithSuggestions(){
    let names = this.questionNames.filter(d=>!this.questionSuggestions.includes(d))
    return [...this.questionSuggestions, ...names]
  }
  get groupByWithSuggestions(){
    let names = this.questionNames.filter(d=>!this.groupBySuggestions.includes(d))
    return [...this.groupBySuggestions, ...names]
  }
  @ViewChild(IgnoreSelectorComponent) ignoreSelector:IgnoreSelectorComponent;
  @Input() forceUpdate;
  @Input()
  questions;
  @Input()
  isPreview = false;
  @Input()
  chartData: ChartReportElement;
  @Output() chartDataChange = new EventEmitter<ChartReportElement>();
  activeTab = 0;
  questionSearchString: string;
  bySearchString: string;
  advancedQuery: string;
  asSearchString: string;
  onPickQuestion;
  @Input()
  reportId;
  @Input()
  report: ReportDefinition;
  hideData = false;
  showLinearPicker = false;
  hideGroupBy = false;
  summarySelectedQuestions = [];
  error=''
  round(value, category="") {
   let x = Math.round(value * 100 + Number.EPSILON) / 100;
    if (['mean', 'mode', 'std', 'var'].includes(category)) return x.toFixed(2);
    return x;
  }

  @Input()
  globalFilter: GlobalFilter[];
  @Input()
  namingDictionary;

  get question() {
    const ret = {
      'groupedPercentAndData': this.chartData.dataQuery.get[0][0],
      'multipleBars': this.chartData.dataQuery.get[0][0],
      'multipleChoice': this.chartData.dataQuery.get.length > 1 ? this.chartsService.sanitizeLabels(this.chartData.dataQuery.get.map(d => d[0]))[1] : this.chartData.dataQuery.get[0][0],
      'groupedBars': this.chartData.dataQuery.get[0][0]
    }[this.chartData.config.type];
    if (ret) {
      return ret;
    } else {
      return this.chartData.dataQuery.get[0][0];
    }
  }

  removeBy(i) {
    this.chartData.dataQuery.by.splice(i, 1);
    this.refreshChart();
  }

  refreshFilter(filter) {
    this.chartData.config.filters = filter;
    this.refreshChart(true);
  }

  removeGet(i) {
    this.chartData.dataQuery.get[0].splice(i, 1);
    this.chartData.dataQuery.as.splice(i, 1);
    this.refreshChart();
  }

  save() {
    this.chartDataChange.emit(this.chartData);
  }
  questionSuggestions:string[]=[];
  groupBySuggestions:string[]=[];
  pickPreset(name) {
    this.byPickerClick = (type) => {
    };
    this.onPickQuestion = () => {
    };
    this.showLinearPicker = false;
    const suggestionsGenerator = new SuggestionsGenerator()
    let questionSuggestionsFunction = suggestionsGenerator.getQuestionsGenerator(this.chartData)
    this.questionSuggestions = questionSuggestionsFunction(this.questionNames)
    let groupBySuggestionsFunction = suggestionsGenerator.getGroupByGenerator(this.chartData)
    this.groupBySuggestions = groupBySuggestionsFunction(this.questionNames)

    let fun = {
      'multipleBarsOwnData':()=>{},
      'groupSummary':()=>{
        this.chartData.dataQuery.by[0] = '*';
        this.hideGroupBy = true;
        this.chartData.dataQuery.as[0] = 'mean';

      },
      'groupedPercentAndData': () => {
        this.hideData = false;
        this.hideGroupBy = false;
        this.chartData.dataQuery.as[0] = 'share';
        console.log(JSON.stringify(this.chartData.dataQuery))
        this.onPickQuestion = (question)=>{
          if (this.chartData.dataQuery.get[0] && this.chartData.dataQuery.get[0].length > 0 && this.chartData.dataQuery.get[0][0] == question) {
            console.log("equals")
            this.chartData.dataQuery.get = [[]]
          }else {
            this.chartData.dataQuery.get[0][0] = question
          }
        }
        this.byPickerClick= (q)=>{
         console.log(this.chartData.dataQuery.by)
          if (this.chartData.dataQuery.by.length > 0 && this.chartData.dataQuery.by[0] == q){
            console.log("equals")
            this.chartData.dataQuery.by = []
          }else{
          this.chartData.dataQuery.by[0] = q;
          this.chartData.dataQuery.by[1] = "*"
        }}
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
      'multipleBars': () => {
        this.hideData = true;
        this.hideGroupBy = false;
        this.chartData.dataQuery.as[0] = 'share';
        this.onPickQuestion = (question) => {
          this.chartData.dataQuery.get[0][0] = question;
        };
        this.byPickerClick = (by) => {
          this.chartData.dataQuery.by[0] = by;
          this.chartData.dataQuery.by[1] = '*';
        };
      },
      'linearCustomData': () => {
        this.showLinearPicker = true;
      },
      'summary': () => {
        this.summarySelectedQuestions = [...new Set(this.chartData.dataQuery.get.flat())];
        let update = () => {
          this.chartData.dataQuery.get = [];
          for (let i = 0; i < this.summarySelectedQuestions.length; i++) {
            this.chartData.dataQuery.get.push([this.summarySelectedQuestions[i]])
          //  this.chartData.dataQuery.get.push(Array(this.chartData.dataQuery.as.length).fill(this.summarySelectedQuestions[i]));
          }
        };
        this.asPickerClick = (s) => {
          // @ts-ignore
          if (this.chartData.dataQuery.as.includes(s)) {
            this.chartData.dataQuery.as = this.chartData.dataQuery.as.filter(d => d != s);
          } else {
            // @ts-ignore
            this.chartData.dataQuery.as.push(s);

          }
          update();
        };
        this.chartData.dataQuery.by[0] = '*';
        this.hideGroupBy = true;
        this.chartData.dataQuery.as[0] = 'mean';

        this.onPickQuestion = (question) => {

          const exists = this.summarySelectedQuestions.includes(question);
          if (exists) {
            if (this.summarySelectedQuestions.length == 1) {
              this.summarySelectedQuestions = [];
            } else {
              this.summarySelectedQuestions = this.summarySelectedQuestions.filter(s => s != question);
            }

          } else {
            this.summarySelectedQuestions.push(question);
          }
          //complimenting
          update();
        };
      },

    }[name]
    this.chartData.config.type=name;
    fun()
    this.activeTab=1;
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
    if (!this.byPickerClick) this.chartData.dataQuery.by[0] = type
    this.byPickerClick(type)
  }
  byPickerClick=(type:string)=>{}
  constructor(private surveyService:SurveysService, private chartsService:ChartsService, public reportsService:ReportsService) { }

  ngOnInit(): void {
    this.isEditing = this.isLast;
  if (this.forceUpdate)
    this.forceUpdate.subscribe(async (v) => {
      await this.refreshChart(false)
    });
    if (this.chartData.config.type){
      this.pickPreset(this.chartData.config.type)
    }
    this.refreshChart()
  }

  saveAsPng(){
    const svgString = this.chartInstance.renderToSVGString();
    const svgString2 = this.chartInstance.getDataURL({
      type: 'svg',
      backgroundColor: '#fff',
    })
    console.log(svgString);
    // Then, convert the SVG string to a SVG element
    const element = document.createElement('div');
    element.innerHTML = svgString;

    // Then, convert the SVG element to a PNG image
    svgAsPngUri(element.firstChild, {}, (uri) => {
      // Finally, save the PNG image using the file-saver library
      saveAs(uri, 'echarts.png');
    });
  }



  isError = false;

  async refreshChart(shallSave=true){
    if (!this.chartData.dataQuery.get || !this.chartData.dataQuery.get[0]) {
      if (shallSave) {
        this.save();
      }
      return;
    }
    let query = this.advancedQuery ? JSON.parse(this.advancedQuery) : ComplimentQuery(this.chartData.dataQuery, this.globalFilter, this.chartData.config.filters ? this.chartData.config.filters : [this.chartData.config.filter],this.chartData.config.ignoreAnswersForCalculations)

    if (shallSave) {
      this.chartData.lastQueryCache = query;
      this.save();
    }

    try {
      await this.downloadQueryResponse(query);
      if (this.dataResponse || ['linearCustomData', 'multipleBarsOwnData'].includes(this.chartData.config.type) ) {
        await this.generateChart(query);
        if (this.ignoreSelector) setTimeout(()=>this.ignoreSelector.onExternalDataChange(), 100);
      }
      this.isError = false;
    } catch (e){
      console.log(e);
      this.isError = true;
    }
  }
  @Input()
  surveyId
  dataResponse;
  chartInstance;
onChartInit(e){
  this.chartInstance=e
}


  get filtersAsString() {
    if (this.chartData.config.filters && this.chartData.config.filters.length > 0) {
      return this.chartData.config.filters.map(d => d.question + '=' + d.answer).join('; ');
    }
    if (this.chartData.config.filter) {
      return `${this.chartData.config.filter.question} = ${this.chartData.config.filter.answer}`;
    }
    return 'Brak';
  }

 //write

  async downloadQueryResponse(query) {
    let _dataResponse:any;
    this.error=''
    // if (this.isPreview && this.chartData.lastCachesResponse && !('error' in this.chartData.lastCachesResponse)){
    //   _dataResponse = this.chartData.lastCachesResponse;
    // }else {
       _dataResponse = await (this.reportsService.getData(this.reportId,query).toPromise());

    // }
    if (_dataResponse.index && _dataResponse["index"].length==0){
      this.dataResponse=undefined;
      this.echartOptions=undefined;
      this.error = "Brak danych do narysowania wykresu. Czy filtry nie powodują, że żadna odpowiedź na ankietę nie jest brana pod uwagę?"
      this.isError=true;
      return;
    }
    if ('error' in _dataResponse && this.chartData.config.type!="multipleBarsOwnData" && this.chartData.config.type!='linearCustomData') {
      this.dataResponse=undefined;
      this.echartOptions=undefined;
        this.error=_dataResponse.error;
        this.isError=true;
    } else {
      if (_dataResponse.index) {
        let indexOf9999 = _dataResponse['index'].indexOf(9999)
        console.log(indexOf9999)
        if (indexOf9999 >= 0) {
          for (let key of Object.keys(_dataResponse).filter(x => x != 'index')) {
            _dataResponse[key].splice(indexOf9999, 1)

          }
          _dataResponse['index'].splice(indexOf9999, 1)
          console.log(_dataResponse)
        }
      }
      this.dataResponse = _dataResponse;
      // this.chartData.lastCachesResponse = this.dataResponse;
    }
    console.log(this.dataResponse);


  }
  echartOptions;
  generateChart(fullQuery){

    this.echartOptions = this.chartsService.generateChart(this.dataResponse, this.chartData, this.reportId, this.namingDictionary, this.report.dictionaryOverrides,undefined, fullQuery);

  }

  assignAdvancedQueryAsConfig(){
    this.chartData.config=JSON.parse(this.advancedQuery)
  }
  requestJSONConfig(){
    this.advancedQuery=JSON.stringify(this.chartData.config)
  }


}
