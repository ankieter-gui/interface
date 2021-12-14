import { Component, OnInit } from '@angular/core';
import {SurveyGeneratorService} from '../survey-generator.service';
import {
  CommonAttributes, GroupedSingleChoiceQuestion,
  Information, MultipleChoiceQuestion, Page,
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
import {SurveyPageElementComponent} from '../survey-page-element/survey-page-element.component';
import {ActivatedRoute} from '@angular/router';
import {SurveysService} from '../surveys.service';
export class SurveyComponentConfig{
  static add = (collection,item)=>()=>{collection.push(item);return item}
  component;
  friendlyName:string;
  onAddEvent:(collection)=>void
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
  surveyId:string;
  static surveyComponents:SurveyComponents = {}

  constructor(private surveyGenerator:SurveyGeneratorService,public surveysService:SurveysService, public dashboardModals:DashboardModalsService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id')
    this.surveysService.getSurveyJSON(this.surveyId).subscribe((x:any)=>{
      this.surveyDefinition=x;
      this._allPages= this.surveyDefinition.elements.filter((x:any)=>x.questionType=='page')
    })

    SurveysEditorComponent.surveyComponents[Page.questionType]={
      component:SurveyPageElementComponent,
      friendlyName:"Strona",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new Page())
      ),
      icon:"form"
    };
    SurveysEditorComponent.surveyComponents[TextQuestion.questionType]={
        component:TextQuestionSurveyElementComponent,
        friendlyName:"Pytanie tekstowe",
        onAddEvent:(collection)=>R.compose(
          SurveyComponentConfig.add(collection, new TextQuestion())
        ),
        icon:'font-size',
      };
    SurveysEditorComponent.surveyComponents[Information.questionType]={
      component: InformationSurveyElementComponent,
      friendlyName:"Informacja",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new Information())
      ),
      icon:'info-circle',
    }
    SurveysEditorComponent.surveyComponents[SingleChoiceQuestion.questionType]={
      component:SingleQuestionSurveyElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new SingleChoiceQuestion())
      ),
      icon:'check-circle',
    };
    SurveysEditorComponent.surveyComponents[GroupedSingleChoiceQuestion.questionType]={
      component:GroupedSingleQuestionElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru z wieloma podpytaniami",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new GroupedSingleChoiceQuestion())
      ),
      icon:'check-circle',
    }
    SurveysEditorComponent.surveyComponents[MultipleChoiceQuestion.questionType]={
      component:MultipleChoiceQuestionSurveyElementComponent,
      friendlyName:"Pytanie wielokrotnego wyboru",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new MultipleChoiceQuestion())
      ),
      icon:'check-square',
    }
  }
rename(){}
  getSurveyAsJson(){
    return JSON.stringify(this.surveyDefinition)
  }
  get addButtonsList(){

    return [SurveysEditorComponent.surveyComponents['page']]
  }
save(){
  this.refreshAllPages()
   this.surveysService.saveFromEditor(this.surveyDefinition, this.surveyId)
}
_currentPage;
  changeCurrentPage(page){
    this._currentPage=page;
  }
currentPage(){
    if (this._currentPage) {
      return [this._currentPage]
    }
    else{
      return []
    }
}
refreshAllPages(){
  this._allPages = this.surveyDefinition.elements.filter((x:any)=>x.questionType=='page')
}
_allPages=[]
  get allPages(){
    return this._allPages
  }
addNewQuestion(){}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.surveyDefinition.elements, event.previousIndex, event.currentIndex);
    this.save()
  }
  verticalDropList=false;
}
