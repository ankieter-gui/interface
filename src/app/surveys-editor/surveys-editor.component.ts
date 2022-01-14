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
import {collect} from 'echarts/types/src/component/axisPointer/modelHelper';
export class SurveyComponentConfig{
  static atIndexOrEnd = (collection, element)=>{const e = collection.indexOf(element); return e==-1?collection.length:e+1}
  static add = (index,collection,item)=>()=>{collection.splice(index,item);return item}
  component;
  friendlyName:string;
  factory:(collection)=>void
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
      factory:(collection)=> new Page(this.generateNewId('p')),
      icon:"form"
    };
    SurveysEditorComponent.surveyComponents[TextQuestion.questionType]={
        component:TextQuestionSurveyElementComponent,
        friendlyName:"Pytanie tekstowe",
        factory:(collection)=>
          new TextQuestion(this.generateNewId('t')),
        icon:'font-size',
      };
    SurveysEditorComponent.surveyComponents[Information.questionType]={
      component: InformationSurveyElementComponent,
      friendlyName:"Informacja",
      factory:(collection)=> new Information(this.generateNewId('i')),
      icon:'info-circle',
    }
    SurveysEditorComponent.surveyComponents[SingleChoiceQuestion.questionType]={
      component:SingleQuestionSurveyElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru",
      factory:(collection)=> new SingleChoiceQuestion(this.generateNewId('s')),
      icon:'check-circle',
    };
    SurveysEditorComponent.surveyComponents[GroupedSingleChoiceQuestion.questionType]={
      component:GroupedSingleQuestionElementComponent,
      friendlyName:"Pytanie pojedyńczego wyboru z wieloma podpytaniami",
      factory:(collection)=> new GroupedSingleChoiceQuestion(this.generateNewId('gs')),
      icon:'check-circle',
    }
    SurveysEditorComponent.surveyComponents[MultipleChoiceQuestion.questionType]={
      component:MultipleChoiceQuestionSurveyElementComponent,
      friendlyName:"Pytanie wielokrotnego wyboru",
      factory:(collection)=> new MultipleChoiceQuestion(this.generateNewId('m')),
      icon:'check-square',
    }
  }
rename(){
     this.surveysService.rename(this.surveyId, this.surveyDefinition.title).subscribe(x=>console.log(x))
}
addNewElement(element){
    let x =
      this.surveyDefinition.elements.splice(
        SurveyComponentConfig.atIndexOrEnd(this.surveyDefinition.elements, this.currentPage()[this.currentPage().length-1]),0,
        element
      )
    return element;
}
  getSurveyAsJson(){
    return JSON.stringify(this.surveyDefinition)
  }
  get addButtonsList(){

    return Object.values(SurveysEditorComponent.surveyComponents)
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
removeElement(collection:any[], element){
    if (collection.includes(element)) collection.splice(collection.indexOf(element),1);
      for (let i of collection){
        if (i.elements)
          if (i.elements.includes(element)) i.elements.splice(i.elements.indexOf(element),1);
    }
}
previousPageIndex=undefined
cachePreviousPage(){
    this.previousPageIndex = this.surveyDefinition.elements.indexOf(this._currentPage)-1
    if (this.previousPageIndex<0){
      this.previousPageIndex=0
    }
}
removeCleanup(){
    if (!this.surveyDefinition.elements.includes(this.currentPage()[0])){
      if (this.previousPageIndex) this.changeCurrentPage(this.surveyDefinition.elements[this.previousPageIndex])
      else this.changeCurrentPage(this.surveyDefinition.elements[0])
    }
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
