import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartReportElement} from '../dataModels/ReportElement';
import {ReportsService} from '../reports.service';
import {ChartsService} from '../charts.service';

@Component({
  selector: 'app-grouped-bars-percentage-data-picker',
  template: `
    <nz-alert style="margin:1em" nzType="info" nzMessage="Wpisanie poniższych danych jest nieobowiązkowe. Uzupełnienie pól pozwoli na przedstawienie frekwencji na wydziale jako %"></nz-alert>
    <nz-alert style="margin:1em" nzType="warning" nzMessage="Trzeba wpisać dane dla każdego wydziału widoczengo na wykresie! Inaczej wykres będzie niewidoczny!"></nz-alert>
    <nz-alert style="margin:1em" nzType="error"
              nzMessage="Należy wpisać wartości po przefiltrowaniu. Jeżeli wykres przez filtry przedstawia tylko wyniki dla studentów stopnia pierwszego - wpisz liczby studentów pierwszego stopnia na każdym wydziale."></nz-alert>

    <nz-table #dataTable [nzData]="this.chart.config.handCodedData">


      <thead>
      <tr>
        <th>Wydział</th>
        <th>Całkowita liczba studentów (po zastosowaniu filtrów obecnych na wykresie!)</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let entry of dataTable.data">
        <td>{{this.reportService.getLabelFor(namingDictionary, chart.dataQuery.get[0][0], entry.label)}}</td>
        <td><input nz-input (blur)="save()" [(ngModel)]="entry.value"></td>
      </tr>
      <tr>
        <td>
          Razem:
          <input nz-input (blur)="save()" [(ngModel)]="chart.config.allTogetherLabel">
        </td>
        <td>
          <input nz-input (blur)="save()" [(ngModel)]="chart.config.allTogetherValue">
        </td>
      </tr>
      </tbody>
    </nz-table>
  `,
  styles: [
  ]
})
export class GroupedBarsPercentageDataPickerComponent implements OnInit {
  @Output()
  saveEmitter=new EventEmitter();
  @Input()
  chart:ChartReportElement
  @Input()
  reportId
  @Input()
  namingDictionary
  @Input()
  dataResponse
  constructor(public reportService:ReportsService, private chartService:ChartsService) { }

  save(){
    this.saveEmitter.emit()
    //TODO: there should be a way to do it using a handler. Leaving for now due to lack of time
    setTimeout(()=>{
this.updateFields()
    }, 500)
  }
  updateFields(){
    console.log(this.dataResponse)
    let shareElement=this.chartService.transformDataIntoPairs(JSON.parse(JSON.stringify(this.dataResponse))).filter(d=>d[0].includes("share"))[0][1][0]
    console.log(shareElement)
    let categories =Object.keys(shareElement)

    let possibleAnswers = Object.keys(this.namingDictionary[this.chart.dataQuery.get[0][0]]).filter(d=>categories.includes(d))
    // if (this.chart.config.allTogetherLabel) {
    //   categories.push(this.chart.config.allTogetherLabel)
    //   possibleAnswers.push("")
    // }
    if (this.chart.config.handCodedData) {
      this.chart.config.handCodedData = this.chart.config.handCodedData.filter(d => possibleAnswers.includes(d.label))
      console.log("possible answers...")
      console.log(possibleAnswers)
      for (let possibleAnswer of possibleAnswers) {
        if (this.chart.config.handCodedData.map(d => d.label).includes(possibleAnswer)) {
        } else {
          console.log("adding...")
          this.chart.config.handCodedData = [...this.chart.config.handCodedData, {label: possibleAnswer, value: ""}]
        }
      }
    }else{
      this.chart.config.handCodedData = possibleAnswers.map(d=>({label:d, value:""}))
    }
  }
  ngOnInit(): void {



  }

}
