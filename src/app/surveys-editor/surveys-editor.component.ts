import { Component, OnInit } from '@angular/core';
import {SurveyGeneratorService} from '../survey-generator.service';

@Component({
  selector: 'app-surveys-editor',
  templateUrl: './surveys-editor.component.html',
  styleUrls: ['./surveys-editor.component.css']
})
export class SurveysEditorComponent implements OnInit {
  surveyDefinition
  constructor(private surveyGenerator:SurveyGeneratorService) { }

  ngOnInit(): void {
    console.log(this.surveyGenerator.getNewEmpty())
  }

}
