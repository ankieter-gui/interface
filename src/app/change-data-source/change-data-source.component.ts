import {Component, Input, OnInit} from '@angular/core';
import {SurveyMeta} from '../dataModels/survey';

@Component({
  selector: 'app-change-data-source',
  template: `
    <div>
    <ng-template #suffixIconSearch>
      <i nz-icon nzType="caret-down" style="cursor:pointer;" (click)="surveyInput.select()"></i>
    </ng-template>
    Użyj danych z ankiety:
    <nz-input-group [nzSuffix]="suffixIconSearch">

      <input #surveyInput placeholder="wybierz ankietę" nz-input [(ngModel)]="surveyInputValue" (ngModelChange)="this.error=false;"
             [nzAutocomplete]="auto"/>
      <nz-autocomplete #auto>
        <nz-auto-option class="global-search-item" *ngFor="let option of autocompleteSurveys|filterByName:surveyInputValue"
                        [nzValue]="option.name">
          {{ option.name }} ({{option.answersCount}} odpowiedzi)

        </nz-auto-option>
      </nz-autocomplete>
    </nz-input-group>
    <p *ngIf="error" style="color:red;">Ankieta ma niezgodny typ!</p>
    </div>
  `,
  styles: [
  ]
})
export class ChangeDataSourceComponent implements OnInit {
  surveyInputValue;
  error=false;
  autocompleteSurveys: SurveyMeta[];
  constructor( ) { }

  ngOnInit(): void {
  }

}
