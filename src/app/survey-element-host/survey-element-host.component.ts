import {Component, Input, OnInit} from '@angular/core';
import {TextQuestionSurveyElementComponent} from '../text-question-survey-element/text-question-survey-element.component';
import {GenericElement} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-survey-element-host',
  template: `
    <section class="surveyElementHost">
      <ndc-dynamic [ndcDynamicComponent]="templateType"
                   [ndcDynamicInputs]="{element:element}"
                   [ndcDynamicOutputs]="{}"
      ></ndc-dynamic>
    </section>


  `,
  styles: [
  ]
})
export class SurveyElementHostComponent implements OnInit {
  @Input()
  templateType;
  @Input()
  element:GenericElement
  constructor() { }

  ngOnInit(): void {
  }

}
