import {Component, Input, OnInit} from '@angular/core';
import {GenericElement, TextQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-text-question-survey-element',
  template: `
    <p>
      {{element.header}}
      text-question-survey-element works!
    </p>
  `,
  styles: [
  ]
})
export class TextQuestionSurveyElementComponent implements OnInit {
  @Input()
  element:TextQuestion;
  constructor() { }

  ngOnInit(): void {
  }

}
