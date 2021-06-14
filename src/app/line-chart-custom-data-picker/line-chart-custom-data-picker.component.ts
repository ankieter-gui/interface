import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportDefinition} from '../dataModels/ReportDefinition';
import {ChartReportElement} from '../dataModels/ReportElement';

@Component({
  selector: 'app-line-chart-custom-data-picker',
  template: `
    <nz-table #dataTable [nzData]="this.chart.config.handCodedData">
    <thead>
    <tr><th>Opis</th><th>Wartość</th></tr>
    </thead>
      <tbody>
      <tr *ngFor="let entry of dataTable.data"> <td><input nz-input [(ngModel)]="entry.label" (blur)="save()"></td><td><input nz-input (blur)="save()" [(ngModel)]="entry.value"></td></tr>
      <tr> <td rowspan="2"><button nz-button (click)="addRow()">Dodaj</button></td></tr>
      </tbody>
    </nz-table>
  `,
  styles: [
  ]
})
export class LineChartCustomDataPickerComponent implements OnInit {
  @Output()
  saveEmitter=new EventEmitter();
  @Input()
  chart:ChartReportElement
  @Input()
  reportId

  save(){
    this.saveEmitter.emit()
  }
  addRow(){
    this.chart.config.handCodedData = [...this.chart.config.handCodedData, {label:"", value:""}]
  }

  constructor() { }

  ngOnInit(): void {
    if (!this.chart.config.handCodedData){
      this.chart.config.handCodedData = [ {label:"", value:""} ]
    }

  }

}
