import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextQuestionSurveyElementComponent} from '../text-question-survey-element/text-question-survey-element.component';
import {GenericElement, Question, SurveyDefinition} from '../dataModels/SurveyDefinition';
import {SurveyComponentConfig} from '../surveys-editor/surveys-editor.component';

@Component({
  selector: 'app-survey-element-host',
  template: `
    <section class="surveyElementHost">

      <ndc-dynamic [ndcDynamicComponent]="componentConfig.component"
                   [ndcDynamicInputs]="{element:element, parent:this, survey:survey, saveFromEditor:saveFromEditor}"
                   [ndcDynamicOutputs]="outputs"
      ></ndc-dynamic>
      <nz-collapse style="margin-top: 2em" *ngIf="this.element.questionType!='page'">
        <nz-collapse-panel nzHeader="Warunki wyświetlania pytania">
          <app-conditional-survey-question-selector (saveEmitter)="saveFun()" [element]="element"></app-conditional-survey-question-selector>
        </nz-collapse-panel>
      </nz-collapse>

    </section>


  `,
  styles: [
  ]
})
export class SurveyElementHostComponent implements OnInit {
  @Input() survey:SurveyDefinition
  @Input() showConditions=true;
  @Input() saveFromEditor;
  outputs = {
    save: t => this.saveFun(),
  };
  @Input()
  componentConfig:SurveyComponentConfig;
  @Input()
  element:Question
  constructor() { }

  ngOnInit(): void {
  }
  @Output()
  save:EventEmitter<any> = new EventEmitter()
  saveFun(){
    console.log("save in "+this.element.id)
    console.log(this.saveFromEditor)
   this.save.emit()

  }

}
