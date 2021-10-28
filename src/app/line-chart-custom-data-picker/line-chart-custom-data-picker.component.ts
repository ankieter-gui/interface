import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportDefinition} from '../dataModels/ReportDefinition';
import {ChartReportElement} from '../dataModels/ReportElement';

@Component({
  selector: 'app-line-chart-custom-data-picker',
  template: `
    <nz-table #dataTable [nzData]="this.chart.config.handCodedData">
    <thead>
    <tr><th>Opis</th><th>Druga linia opisu (opcjonalnie)</th><th>Wartość</th><th></th></tr>
    </thead>
      <tbody>
      <tr *ngFor="let entry of dataTable.data"> <td><input nz-input [(ngModel)]="entry.label" (blur)="save()"></td>
        <td><input nz-input (blur)="save()" [(ngModel)]="entry.secondLine"></td>
        <td><input nz-input (blur)="save()" [(ngModel)]="entry.value"></td>

        <td><button nz-button nzType="default" nzShape="circle" (click)="remove(entry)"><i nz-icon nzType="delete"></i></button></td>
      </tr>
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
    this.chart.config.handCodedData = [...this.chart.config.handCodedData, {label:"", secondLine:"", value:""}]
  }
  remove(entry){
    this.chart.config.handCodedData = this.chart.config.handCodedData.filter(d=>d!=entry)
    this.save();
  }
  constructor() { }

  ngOnInit(): void {
    if (!this.chart.config.handCodedData){

      this.chart.config.handCodedData = [ {label:"",secondLine:'', value:""} ]
    }

  }

}
