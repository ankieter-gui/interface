import { Component, OnInit } from '@angular/core';
import {SurveyGeneratorService} from '../survey-generator.service';
import {
  CommonAttributes, GroupedSingleChoiceQuestion,
  Information, MultipleChoiceQuestion,
  Question,
  SingleChoiceQuestion,
  SurveyDefinition,
  TextQuestion
} from '../dataModels/SurveyDefinition';
import {TextQuestionSurveyElementComponent} from '../text-question-survey-element/text-question-survey-element.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {InformationSurveyElementComponent} from '../information-survey-element/information-survey-element.component';
import {SingleQuestionSurveyElementComponent} from '../single-question-survey-element/single-question-survey-element.component';
import {GroupedSingleQuestionElementComponent} from '../grouped-single-question-element/grouped-single-question-element.component';
import {DashboardModalsService} from '../dashboard-modals.service';
import {MultipleChoiceQuestionSurveyElementComponent} from '../multiple-choice-question-survey-element/multiple-choice-question-survey-element.component';
import * as R from 'ramda'
import {fadeInOut} from '../commonAnimations';
export class SurveyComponentConfig{
  static add = (collection,item)=>()=>collection.push(item)
  component;
  friendlyName:string;
  onAddEvent:()=>void
  icon:string="file-add";

}
export interface SurveyComponents{
  [d:string]:SurveyComponentConfig
}

@Component({
  selector: 'app-surveys-editor',
  templateUrl: './surveys-editor.component.html',
  styleUrls: ['./surveys-editor.component.css'],
  animations:[fadeInOut]
})
export class SurveysEditorComponent implements OnInit {
  surveyDefinition:SurveyDefinition = new SurveyDefinition()
  mouseHoveringAddMorePanel=false;
  itemsForCurrentPage(){
    return this.surveyDefinition.elements
  }
  surveyComponents:SurveyComponents = {}

  constructor(private surveyGenerator:SurveyGeneratorService, public dashboardModals:DashboardModalsService) { }
  getComponentFromType(type){return this.surveyComponents[type]}
  ngOnInit(): void {
    this.surveyDefinition.elements=[
      {questionType:"text", commonAttributes:new CommonAttributes(), header:"Pytanie #1 header", maxLength:250},
      {questionType:"text", commonAttributes:new CommonAttributes(), header:"Pytanie #2 header", maxLength:250},
      <SingleChoiceQuestion>{questionType:"single", commonAttributes:new CommonAttributes(), header:"Pytanie #2 header", options:[]},
      new GroupedSingleChoiceQuestion(),
      new MultipleChoiceQuestion()

    ]
      this.surveyComponents[TextQuestion.questionType]={
        component:TextQuestionSurveyElementComponent,
        friendlyName:"Pytanie tekstowe",
        onAddEvent:()=>R.compose(
          SurveyComponentConfig.add(this.surveyDefinition.elements, new TextQuestion())
        ),
        icon:'font-size',
      };
    this.surveyComponents[Information.questionType]={
      component: InformationSurveyElementComponent,
      friendlyName:"Informacja",
      onAddEvent:()=>R.compose(
        SurveyComponentConfig.add(this.surveyDefinition.elements, new Information())
      ),
      icon:'info-circle',
    }
    this.surveyComponents[SingleChoiceQuestion.questionType]={
      component:SingleQuestionSurveyElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru",
      onAddEvent:()=>R.compose(
        SurveyComponentConfig.add(this.surveyDefinition.elements, new SingleChoiceQuestion())
      ),
      icon:'check-circle',
    };
    this.surveyComponents[GroupedSingleChoiceQuestion.questionType]={
      component:GroupedSingleQuestionElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru z wieloma podpytaniami",
      onAddEvent:()=>R.compose(
        SurveyComponentConfig.add(this.surveyDefinition.elements, new GroupedSingleChoiceQuestion())
      ),
      icon:'check-circle',
    }
    this.surveyComponents[MultipleChoiceQuestion.questionType]={
      component:MultipleChoiceQuestionSurveyElementComponent,
      friendlyName:"Pytanie wielokrotnego wyboru",
      onAddEvent:()=>R.compose(
        SurveyComponentConfig.add(this.surveyDefinition.elements, new MultipleChoiceQuestion())
      ),
      icon:'check-square',
    }
  }
rename(){}
  getSurveyAsJson(){
    return JSON.stringify(this.surveyDefinition)
  }
  get addButtonsList(){
    return Object.values(this.surveyComponents)
  }
save(){
    console.log("save in editor")
  console.log(this.surveyDefinition)
}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.surveyDefinition.elements, event.previousIndex, event.currentIndex);
  }
removeElement(element){}
addNewQuestion(){}
}
