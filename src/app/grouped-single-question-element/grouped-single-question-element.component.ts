import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupedSingleChoiceQuestion, SingleChoiceQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-grouped-single-question-element',
  template: `
    <div>
      <app-survey-question-header-editor [element]="element" (focusEvent)="this.save.emit()"></app-survey-question-header-editor>
      <app-common-attributes-selector [allowed]="allowedAttributes" [element]="element" [type]="this.type"></app-common-attributes-selector>
      <app-grouped-single-question-questions-selector [element]="element" (save)="this.save.emit()"></app-grouped-single-question-questions-selector>
      <app-survey-question-choice-selector [element]="element" (save)="this.save.emit()"></app-survey-question-choice-selector>
    </div>
  `,
  styles: [
  ]
})
export class GroupedSingleQuestionElementComponent implements OnInit {
  type=GroupedSingleChoiceQuestion
  allowedAttributes=GroupedSingleChoiceQuestion.allowedAttrs;
  @Input() element:GroupedSingleChoiceQuestion;
  @Output() save:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
