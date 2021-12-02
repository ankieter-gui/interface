import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Choice, GroupedSingleChoiceQuestion, MultipleChoiceQuestion, Question, SingleChoiceQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-survey-question-choice-selector',
  template: `
    <nz-table nzTemplateMode>
      <thead>
      <tr><th style="width: 20%">Kod odpowiedzi</th><th style="width: 50%">Nazwa odpowiedzi</th><th><button nz-button nzType="default" nzShape="circle" (click)="addNewOption()"><i nz-icon nzType="plus"></i></button></th></tr>
      </thead>
      <tbody>
      <tr *ngFor="let answer of this.element.options"><td><input nz-input [(ngModel)]="answer.code"  (blur)="save.emit()"></td><td><input nz-input  (blur)="save.emit()" [(ngModel)]="answer.value"></td>
        <td>
          <button nz-button nzType="default" nzShape="circle" (click)="deleteOption(answer)"><i nz-icon nzType="delete"></i></button>
          <br><label nz-checkbox [(ngModel)]="answer.rotate" style="margin-top: 0.5em;margin-left: 0.5em;">Losowa kolejność?</label>
        </td>
      </tr>
      <tr><td></td><td></td><td><button nz-button nzType="default" nzShape="circle" (click)="addNewOption()"><i nz-icon nzType="plus"></i></button></td></tr>
      </tbody>
    </nz-table>
  `,
  styles: [
  ]
})
export class SurveyQuestionChoiceSelectorComponent implements OnInit {
  @Input() element:SingleChoiceQuestion|GroupedSingleChoiceQuestion|MultipleChoiceQuestion
  @Output() save:EventEmitter<any> = new EventEmitter()
  addNewOption(){
    this.element.options.push(new Choice())
    this.save.emit()
  }
  deleteOption(answer){
    this.element.options = this.element.options.filter(d=>d!=answer)
    this.save.emit()
  }
  constructor() { }

  ngOnInit(): void {
  }

}
