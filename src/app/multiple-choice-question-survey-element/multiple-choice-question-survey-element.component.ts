import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MultipleChoiceQuestion, SingleChoiceQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-multiple-choice-question-survey-element',
  template: `
    <div>
      <app-survey-question-header-editor [element]="element" (focusEvent)="this.save.emit()"></app-survey-question-header-editor>
      <app-survey-question-choice-selector [element]="element" (save)="this.save.emit()"></app-survey-question-choice-selector>
    </div>
  `,
  styles: [
  ]
})
export class MultipleChoiceQuestionSurveyElementComponent implements OnInit {
  type=MultipleChoiceQuestion
  allowedAttributes=MultipleChoiceQuestion.allowedAttrs
  @Input() element:MultipleChoiceQuestion;
  @Output() save:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
