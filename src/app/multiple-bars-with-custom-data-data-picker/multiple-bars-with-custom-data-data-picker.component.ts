import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-bars-with-custom-data-data-picker',
  template: `
    <nz-table nzTemplateMode>
      <thead><tr><th>Przegroda</th><th *ngFor="let headerName of this.dataRows[0].slice(1); let i =index"><input nz-input  [(ngModel)]="headerName.value"></th><th rowspan="999999">Dodaj kolumnę <button style="margin-top:1em" nz-button nzType="default" nzShape="circle" (click)="addColumn()"><i nz-icon nzType="plus"></i></button></th></tr></thead>
      <tbody>
      <tr *ngFor="let row of this.dataRows.slice(1); let i=index"><td *ngFor="let data of row; let j=index;"><input nz-input [(ngModel)]="data.value"></td> </tr>
      </tbody>
    </nz-table>
    <button style="margin-top:1em" nz-button nzType="default" nzShape="circle" (click)="addRow()"><i nz-icon nzType="plus"></i></button>
    <span style="margin-left:1em">Dodaj przegrodę</span>
  `,
  styles: [
  ]
})
export class MultipleBarsWithCustomDataDataPickerComponent implements OnInit {
  dataRows=[]
  newEntry(){
    return {value:""}
  }
  initData(){
    this.dataRows=[
      [{value:undefined},{value:"Nazwa słupka"}],
      [{value:"nazwa przegrody"}, {value:"wartość"}]
    ]

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
