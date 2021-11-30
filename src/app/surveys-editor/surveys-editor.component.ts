import { Component, OnInit } from '@angular/core';
import {SurveyGeneratorService} from '../survey-generator.service';
import {SurveyDefinition, TextQuestion} from '../dataModels/SurveyDefinition';
import {TextQuestionSurveyElementComponent} from '../text-question-survey-element/text-question-survey-element.component';
@Component({
  selector: 'app-surveys-editor',
  templateUrl: './surveys-editor.component.html',
  styleUrls: ['./surveys-editor.component.css']
})
export class SurveysEditorComponent implements OnInit {
  surveyDefinition:SurveyDefinition = new SurveyDefinition()
  mouseHoveringAddMorePanel=false;

  surveyElements = {

  }

  constructor(private surveyGenerator:SurveyGeneratorService) { }
  getComponentFromType(type){return this.surveyElements[type].component}
  ngOnInit(): void {
    this.surveyDefinition.elements=[<TextQuestion>{commonAttributes:{}, header:"Pytanie #1 header", maxLength:250}]
      this.surveyElements[TextQuestion.questionType]={
        component:TextQuestionSurveyElementComponent,
      }
  }
rename(){}
save(){}
drop(event){}
removeElement(element){}
addNewQuestion(){}
}
