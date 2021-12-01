import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Choice, Information, SingleChoiceQuestion, TextQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-single-question-survey-element',
  template: `
    <div>
      <input nz-input placeholder="Nazwa pytania..." (blur)="save.emit()">
      <app-common-attributes-selector [allowed]="allowedAttributes" [element]="element" [type]="this.type"></app-common-attributes-selector>
      <nz-table nzTemplateMode>
        <thead>
        <tr><th style="width: 20%">Kod odpowiedzi</th><th>Nazwa odpowiedzi</th><th><button nz-button nzType="default" nzShape="circle" (click)="addNewOption()"><i nz-icon nzType="plus"></i></button></th></tr>
        </thead>
        <tbody>
        <tr *ngFor="let answer of this.element.options"><td><input nz-input [(ngModel)]="answer.code"></td><td><input nz-input [(ngModel)]="answer.value"></td>
          <td>
            <button nz-button nzType="default" nzShape="circle" (click)="deleteOption(answer)"><i nz-icon nzType="delete"></i></button>
          </td>
        </tr>
        <tr><td></td><td></td><td><button nz-button nzType="default" nzShape="circle" (click)="addNewOption()"><i nz-icon nzType="plus"></i></button></td></tr>
        </tbody>
      </nz-table>
    </div>
  `,
  styles: [
  ]
})
export class SingleQuestionSurveyElementComponent implements OnInit {
  type=SingleChoiceQuestion
  allowedAttributes=SingleChoiceQuestion.allowedAttrs;
  @Input() element:SingleChoiceQuestion;
  @Output() save:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
addNewOption(){
    this.element.options.push(new Choice())
  this.save.emit()
}
deleteOption(answer){
    this.element.options = this.element.options.filter(d=>d!=answer)
  this.save.emit()
}
}
