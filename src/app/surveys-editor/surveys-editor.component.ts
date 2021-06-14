import { Component, OnInit } from '@angular/core';
import {SurveyGeneratorService} from '../survey-generator.service';
import {SurveyDefinition} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-surveys-editor',
  templateUrl: './surveys-editor.component.html',
  styleUrls: ['./surveys-editor.component.css']
})
export class SurveysEditorComponent implements OnInit {
  surveyDefinition:SurveyDefinition = new SurveyDefinition()
  mouseHoveringAddMorePanel=false;
  constructor(private surveyGenerator:SurveyGeneratorService) { }

  ngOnInit(): void {
    console.log(this.surveyGenerator.getNewEmpty())
  }
rename(){}
save(){}
drop(event){}
removeElement(element){}
addNewQuestion(){}
}
