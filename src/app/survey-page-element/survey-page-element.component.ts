import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SurveysEditorComponent} from '../surveys-editor/surveys-editor.component';
import {MultipleChoiceQuestion, Page, SurveyDefinition} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-survey-page-element',
  template: `
    <span>ID strony:</span><input nz-input (blur)="save.emit()" [(ngModel)]="element.id" label="ID strony" placeholder="ID strony">
    <app-survey-elements-renderer (save)="this.save.emit()" [survey]="survey" [elements]="element.elements" [showConditions]="false"></app-survey-elements-renderer>
    <app-survey-element-add [collection]="this.element.elements" [allowed]="components" (add)="this.element.elements.push($event)"></app-survey-element-add>
  `,
  styles: [
  ]
})
export class SurveyPageElementComponent implements OnInit {
  @Input() saveFromEditor
  @Input() survey:SurveyDefinition;
  type=Page
  allowedAttributes=Page.allowedAttrs
  @Input() element:Page;
  @Output() save:EventEmitter<any> = new EventEmitter()
  get components(){
    return Object.values(SurveysEditorComponent.surveyComponents).filter(x=>x.component != SurveyPageElementComponent)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
