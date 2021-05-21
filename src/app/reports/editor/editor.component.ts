import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ReportDefinition} from '../../dataModels/ReportDefinition';

import {SurveyMeta} from '../../dataModels/survey';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {SurveysService} from '../../surveys.service';
import {SurveyQuery} from '../../dataModels/Query';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  mockChartResponseData = {};
  mouseHoveringAddMorePanel=false;
  surveyQuestions;

  reportDefinition:ReportDefinition = { title:"", elements:[
      { type:"text", content:{text: "<h1>Header 1</h1>Raport testowy o pieczeniu <b>ciastek</b>"}},
      {type:"chart", content: {
        dataQuery: new SurveyQuery(),
          config:{
          tableDefinition:{series:[]},
            type:null,
            orientation:"vertical",
          },
          text:"",
        }}
    ]};
  queryData(charData){
    return this.mockChartResponseData;
  }
  generateChart(chartData, config){
    return "chart content"
  }

  constructor(private surveysService:SurveysService) { }

  ngOnInit(): void {
    this.downloadSurveyQuestions()
  }
  async downloadSurveyQuestions(){
    this.surveyQuestions = await this.surveysService.getQuestions(1).toPromise();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
