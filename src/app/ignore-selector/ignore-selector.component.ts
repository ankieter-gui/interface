import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalFilter, ReportDefinition} from '../dataModels/ReportDefinition';
import {ChartsService} from '../charts.service';
import {ChartReportElement} from '../dataModels/ReportElement';
import {ReportsService} from '../reports.service';

@Component({
  selector: 'app-ignore-selector',
  template: `
    <section *ngIf="this.selections && this.chart.generator">
      <input nz-input [(ngModel)]="searchString" placeholder="Szukaj..." style="margin-bottom: 1em">
      <div style="overflow-y: scroll;" [style.maxHeight]="'700px'">
        <nz-table
          [nzTemplateMode]="true">
          <thead style="white-space: nowrap;">
          <tr>
            <th style="white-space: nowrap; background:transparent!important;">Nie uwzględniać?</th>
            <th style="white-space: nowrap; background:transparent!important;">Wartość i etykieta</th>
          </tr>
          </thead>
          <tbody>
          <tr style="line-height: 1.428!important;" *ngFor="let row of this.selections|filterByField:1:searchString" (click)="row[0]=!row[0]; update()">
            <td  style="cursor: pointer">  <label nz-checkbox [(ngModel)]="row[0]" (nzCheckedChange)="update()" ></label></td>
            <td  >{{this.chart.generator.getLabelFor(this.chart.dataQuery.get[0][0], row[1])}} ({{row[1]}})</td>
          </tr>
          </tbody>
        </nz-table>
      </div>
    </section>
  `,
  styleUrls: ['./ignore-selector.component.css']
})
export class IgnoreSelectorComponent implements OnInit {
  searchString;
  @Output()
  dataChanged = new EventEmitter();

  @Input()
  lastDataResponse;

  selections: [boolean, any][];

  @Input()
  chart: ChartReportElement;

 lastLabels=[]
  onExternalDataChange(){

   let allLabels;
   if(this.chart.generator.namingDictionary[this.chart.dataQuery.get[0][0]]){
   allLabels = Object.keys(this.chart.generator.namingDictionary[this.chart.dataQuery.get[0][0]])}else{

      allLabels=Object.keys(this.chart.generator.namingDictionary[this.chart.dataQuery.join[0].of[0]])}

    // console.log((Object.entries(this.lastDataResponse).filter(d => d[0] != 'index' && d[0].includes('share')).map(d => d[1])));
    // let allLabels = this.chartService.getAllShareLabels((Object.entries(this.lastDataResponse).filter(d => d[0] != 'index' && d[0].includes('share')).map(d => d[1]))[0]);
    console.log(allLabels);
    if(this.lastLabels && this.lastLabels.every(i=>allLabels.includes(i))){

    }else{

      this.chart.config.ignoreAnswersForCalculations=[];
    }
    this.lastLabels=allLabels;
    this.selections = allLabels.map(d => [this.chart.config.ignoreAnswersForCalculations ? this.chart.config.ignoreAnswersForCalculations.includes(d) : false, d]);
  }
  getSelected(){
    return this.selections.filter(d=>d[0]).map(d=>d[1])
  }
  update(){
   console.log(this.selections)
    this.chart.config.ignoreAnswersForCalculations=this.getSelected()
    console.log(this.getSelected())
    this.dataChanged.emit()
  }
  constructor(private chartService: ChartsService, private reportService: ReportsService) {


  }

  ngOnInit(): void {
    this.onExternalDataChange()
  }

}
