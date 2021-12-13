import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Choice, Information, SingleChoiceQuestion, TextQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-single-question-survey-element',
  template: `
    <div>
     <app-survey-question-header-editor [element]="element" (focusEvent)="this.save.emit()"></app-survey-question-header-editor>
      <app-common-attributes-selector [allowed]="allowedAttributes" [element]="element" [type]="this.type"  (save)="this.save.emit()"></app-common-attributes-selector>
     <app-survey-question-choice-selector [element]="element" (save)="this.save.emit()"></app-survey-question-choice-selector>
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

}
