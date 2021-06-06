import {Component, Input, OnInit} from '@angular/core';
import {ReportMeta} from '../dataModels/survey';

@Component({
  selector: 'app-share-report',
  template: `
<!--    <div class="header">Udostępnij raport: {{this.report.name}}</div>-->
    <div class="input-with-label"><span class="label">Link do poglądu</span><input nz-input [value]="getPublicUrl()">każda osoba z linkiem będzie mogła sprawdzić aktualny stan raportu, lecz nie będzie mogła do edytować.</div>
    <div class="input-with-label"><span class="label">Grupy udostępniania:</span><input nz-input [value]="getPublicUrl()"></div>
  `,
  styles: [
  ]
})
export class ShareReportComponent implements OnInit {
  @Input()
  report:ReportMeta
  constructor() { }

  ngOnInit(): void {
  }
  getPublicUrl(){
    return "http://localhost:4200/reports/"+this.report.id
  }

}
