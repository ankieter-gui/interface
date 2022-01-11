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
  error=false;
  constructor(private surveyGenerator:SurveyGeneratorService,public surveysService:SurveysService, public dashboardModals:DashboardModalsService, private route: ActivatedRoute,) { }
  generateNewId(prefix=''):string{
    return this.surveysService.generateNewId(prefix, this.surveyDefinition)
  }
  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id')
    this.surveysService.getSurveyJSON(this.surveyId).subscribe((x:any)=>{
      if (x.error){
        this.error=true;
        return;
      }
      this.surveyDefinition=x;
      this._allPages= this.surveyDefinition.elements.filter((x:any)=>x.questionType=='page')
    })

    SurveysEditorComponent.surveyComponents[Page.questionType]={
      component:SurveyPageElementComponent,
      friendlyName:"Strona",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new Page(this.generateNewId('p')))
      ),
      icon:"form"
    };
    SurveysEditorComponent.surveyComponents[TextQuestion.questionType]={
        component:TextQuestionSurveyElementComponent,
        friendlyName:"Pytanie tekstowe",
        onAddEvent:(collection)=>R.compose(
          SurveyComponentConfig.add(collection, new TextQuestion(this.generateNewId('t')))
        ),
        icon:'font-size',
      };
    SurveysEditorComponent.surveyComponents[Information.questionType]={
      component: InformationSurveyElementComponent,
      friendlyName:"Informacja",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new Information(this.generateNewId('i')))
      ),
      icon:'info-circle',
    }
    SurveysEditorComponent.surveyComponents[SingleChoiceQuestion.questionType]={
      component:SingleQuestionSurveyElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new SingleChoiceQuestion(this.generateNewId('s')))
      ),
      icon:'check-circle',
    };
    SurveysEditorComponent.surveyComponents[GroupedSingleChoiceQuestion.questionType]={
      component:GroupedSingleQuestionElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru z wieloma podpytaniami",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new GroupedSingleChoiceQuestion(this.generateNewId('gs')))
      ),
      icon:'check-circle',
    }
    SurveysEditorComponent.surveyComponents[MultipleChoiceQuestion.questionType]={
      component:MultipleChoiceQuestionSurveyElementComponent,
      friendlyName:"Pytanie wielokrotnego wyboru",
      onAddEvent:(collection)=>R.compose(
        SurveyComponentConfig.add(collection, new MultipleChoiceQuestion(this.generateNewId('m')))
      ),
      icon:'check-square',
    }
  }
rename(){
     this.surveysService.rename(this.surveyId, this.surveyDefinition.title).subscribe(x=>console.log(x))
}
  getSurveyAsJson(){
    return JSON.stringify(this.surveyDefinition)
  }
  get addButtonsList(){

    return [SurveysEditorComponent.surveyComponents['page']]
  }
async save(){
    console.log("saving...")
    this.refreshAllPages()
    await this.surveysService.saveFromEditor(this.surveyDefinition, this.surveyId).toPromise()
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
