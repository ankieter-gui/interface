import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-new-report-dialog',
  template: `
    Użyj danych z ankiety:
    <input placeholder="wybierz ankietę" nz-input [(ngModel)]="surveyInputValue"
           [nzAutocomplete]="auto"/>
    <nz-autocomplete #auto>
      <nz-auto-option class="global-search-item" *ngFor="let option of autocompleteSurveys|filterByName:surveyInputValue"
                      [nzValue]="option.name">
        {{ option.name }}

      </nz-auto-option>
    </nz-autocomplete>
    <span style="display:block;margin-top:25px;">Nazwa (opcjonalnie, można potem nadać nową):</span>
    <input placeholder="Nazwa (opcjonalnie)" nz-input [(ngModel)]="reportNameInputValue"/>

  `,
  styles: [
  ]
})
export class NewReportDialogComponent implements OnInit {
  reportNameInputValue;
  surveyInputValue;
  constructor() { }
  @Input()
  autocompleteSurveys;
  @Input()
  survey;
  name:string;
  ngOnInit(): void {
    if (this.survey){
      this.surveyInputValue=this.survey.name;
    }
  }
  get selectedSurvey() {
    return this.autocompleteSurveys.filter(e => e.name==this.surveyInputValue)[0]
  }


}
