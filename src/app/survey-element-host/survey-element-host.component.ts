import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextQuestionSurveyElementComponent} from '../text-question-survey-element/text-question-survey-element.component';
import {GenericElement} from '../dataModels/SurveyDefinition';
import {SurveyComponentConfig} from '../surveys-editor/surveys-editor.component';

@Component({
  selector: 'app-survey-element-host',
  template: `
    <section class="surveyElementHost">

      <ndc-dynamic [ndcDynamicComponent]="componentConfig.component"
                   [ndcDynamicInputs]="{element:element, parent:this}"
                   [ndcDynamicOutputs]="outputs"
      ></ndc-dynamic>
    </section>


  `,
  styles: [
  ]
})
export class SurveyElementHostComponent implements OnInit {
  outputs = {
    save: t => this.save(),
  };
  @Input()
  componentConfig:SurveyComponentConfig;
  @Input()
  element:GenericElement
  constructor() { }

  ngOnInit(): void {
  }
  @Output()
  saveEmitter:EventEmitter<any> = new EventEmitter()
  save(){
    console.log("save emitter in host component")
    this.saveEmitter.emit()

  }

}
