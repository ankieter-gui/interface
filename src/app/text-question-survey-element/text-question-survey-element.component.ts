import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GenericElement, TextQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-text-question-survey-element',
  template: `
    <div>
      <app-survey-question-header-editor [element]="element" (focusEvent)="this.save.emit()"></app-survey-question-header-editor>
      <app-common-attributes-selector [allowed]="allowedAttributes" [element]="element" [type]="this.type"></app-common-attributes-selector>
    </div>
  `,
  styles: [
  ]
})
export class TextQuestionSurveyElementComponent implements OnInit {
  type=TextQuestion
  allowedAttributes = TextQuestion.allowedAttrs
  @Input()
  element:TextQuestion;
  @Input()
  parent
  @Output()
  save:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
