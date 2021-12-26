import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Choice, GroupedQuestion, GroupedSingleChoiceQuestion, SingleChoiceQuestion} from '../dataModels/SurveyDefinition';
import {SurveysService} from '../surveys.service';

@Component({
  selector: 'app-grouped-single-question-questions-selector',
  template: `
    <nz-table nzTemplateMode>
      <thead>
      <tr><th style="width: 20%">Kod pytania</th><th style="width: 50%">Treść pytania</th><th><button nz-button nzType="default" nzShape="circle" (click)="addNewOption()"><i nz-icon nzType="plus"></i></button></th></tr>
      </thead>
      <tbody>
      <tr *ngFor="let answer of this.element.questions"><td><input nz-input [(ngModel)]="answer.code" (blur)="save.emit()"></td><td><input nz-input [(ngModel)]="answer.value"  (blur)="save.emit()"></td>
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
export class GroupedSingleQuestionQuestionsSelectorComponent implements OnInit {
  @Input() element:GroupedSingleChoiceQuestion
  @Output() save:EventEmitter<any> = new EventEmitter()
  addNewOption(){
    this.element.questions.push(new GroupedQuestion(this.ss.generateNewId("Q")))
    this.save.emit()
  }
  deleteOption(answer){
    this.element.options = this.element.questions.filter(d=>d!=answer)
    this.save.emit()
  }
  constructor(private ss:SurveysService) { }

  ngOnInit(): void {
  }

}
