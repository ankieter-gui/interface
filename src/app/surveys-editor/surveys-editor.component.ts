import { Component, OnInit } from '@angular/core';
import {SurveyGeneratorService} from '../survey-generator.service';
import {CommonAttributes, Information, Question, SurveyDefinition, TextQuestion} from '../dataModels/SurveyDefinition';
import {TextQuestionSurveyElementComponent} from '../text-question-survey-element/text-question-survey-element.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {InformationSurveyElementComponent} from '../information-survey-element/information-survey-element.component';
export class SurveyComponentConfig{
  component;
  friendlyName:string;
}
export interface SurveyComponents{
  [d:string]:SurveyComponentConfig
}

@Component({
  selector: 'app-surveys-editor',
  templateUrl: './surveys-editor.component.html',
  styleUrls: ['./surveys-editor.component.css']
})
export class SurveysEditorComponent implements OnInit {
  surveyDefinition:SurveyDefinition = new SurveyDefinition()
  mouseHoveringAddMorePanel=false;
  itemsForCurrentPage(){
    return this.surveyDefinition.elements
  }
  surveyComponents:SurveyComponents = {}

  constructor(private surveyGenerator:SurveyGeneratorService) { }
  getComponentFromType(type){return this.surveyComponents[type]}
  ngOnInit(): void {
    this.surveyDefinition.elements=[
      {questionType:"text", commonAttributes:new CommonAttributes(), header:"Pytanie #1 header", maxLength:250},
      {questionType:"text", commonAttributes:new CommonAttributes(), header:"Pytanie #2 header", maxLength:250},
      {questionType:"text", commonAttributes:new CommonAttributes(), header:"Pytanie #3 header", maxLength:250},

    ]
      this.surveyComponents[TextQuestion.questionType]={
        component:TextQuestionSurveyElementComponent,
        friendlyName:"Pytanie tekstowe",
      };
    this.surveyComponents[Information.questionType]={component: InformationSurveyElementComponent,
    friendlyName:"Informacja"}
  }
rename(){}
save(){
    console.log("save in editor")
}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.surveyDefinition.elements, event.previousIndex, event.currentIndex);
  }
removeElement(element){}
addNewQuestion(){}
}
