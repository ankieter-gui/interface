import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartReportElement, HandCodedDataType} from '../dataModels/ReportElement';

@Component({
  selector: 'app-multiple-bars-with-custom-data-data-picker',
  template: `
    <nz-dropdown-menu #color="nzDropdownMenu">
      <div style="background-color: white; border:1px solid rgba(0,0,0,0.1); padding:1em; border-radius:5px;  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);">
      <app-common-color-picker (onPick)="currentColumnForColorSelection.color=$event; save()"></app-common-color-picker>
      </div>
    </nz-dropdown-menu>
    <div style="width: 100%; overflow-x: scroll;">
    <nz-table nzTemplateMode>
      <thead><tr><th></th><th [nz-tooltip]="headerName.value" *ngFor="let headerName of this.dataRows[0].slice(1); let i =index"><input nz-input  [(ngModel)]="headerName.value" (blur)="save()"> <button (click)="this.currentColumnForColorSelection=headerName" nz-button nz-dropdown [nzDropdownMenu]="color" nzTrigger="click">Ustal kolor <span style="margin-left:2px; width:15px; height: 10px; border-radius: 2px" [style.backgroundColor]="headerName.color"></span></button></th><th rowspan="999999">Dodaj kolumnę <button style="margin-top:1em" nz-button nzType="default" nzShape="circle" (click)="addColumn()"><i nz-icon nzType="plus"></i></button></th></tr></thead>
      <tbody>
      <tr  *ngFor="let row of this.dataRows.slice(1); let i=index"><td *ngFor="let data of row; let j=index;" [nz-tooltip]="data.value"><input nz-input [(ngModel)]="data.value" (blur)="save()"></td> </tr>
      </tbody>
    </nz-table>

    </div>
    <button style="margin-top:1em" nz-button nzType="default" nzShape="circle" (click)="addRow()"><i nz-icon nzType="plus"></i></button>
    <span style="margin-left:1em">Dodaj przegrodę</span>
  `,
  styles: [
  ]
})
export class MultipleBarsWithCustomDataDataPickerComponent implements OnInit {
  currentColumnForColorSelection;
  @Output()
  saveEmitter=new EventEmitter();
  @Input()
  chartElement:ChartReportElement;
  dataRows=[]
  newEntry(){
    return {value:""}
  }
  save(){
    this.chartElement.config.handCodedData = this.dataRows
    this.saveEmitter.emit()
  }
  initData(){
    if (this.chartElement && this.chartElement.config.handCodedData){
      this.dataRows = this.chartElement.config.handCodedData
    }else {
      this.dataRows = [
        [{value: undefined}, {value: "Nazwa słupka"}],
        [{value: "nazwa przegrody"}, {value: "wartość"}]
      ]
    }
  }
  addRow(){
    let newRow=[]
    for (let i =0; i<this.dataRows[0].length;i++){
      newRow.push(this.newEntry())
    }
    this.dataRows.push(newRow)
  }
  addColumn(){
    for(let row of this.dataRows){
      row.push(this.newEntry())
    }
  }
  trackByfn(index,item){
    return index;
  }
  constructor() { }

  ngOnInit(): void {
    this.initData()
  }

}
