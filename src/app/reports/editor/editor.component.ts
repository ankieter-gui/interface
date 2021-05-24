import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ReportDefinition} from '../../dataModels/ReportDefinition';

import {SurveyMeta} from '../../dataModels/survey';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {SurveysService} from '../../surveys.service';
import {SurveyQuery} from '../../dataModels/Query';
import {ReportsService} from '../../reports.service';
import {ActivatedRoute} from '@angular/router';
import {ChartReportElement, TextReportElement} from '../../dataModels/ReportElement';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  mockChartResponseData = {};
  mouseHoveringAddMorePanel=false;
  surveyQuestions;
  linkedSurveyId;
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

  constructor(private surveysService:SurveysService,private reportsService:ReportsService,private route: ActivatedRoute) { }
  addNewTextElement(){
    this.reportDefinition.elements.push({type:"text", content: {text:""} as TextReportElement})
  }
  addNewChartElement(){
    this.reportDefinition.elements.push({type:"chart", content: {name:"", dataQuery: new SurveyQuery(), config: { tableDefinition:{series:[]},
          type:null,
          orientation:"vertical",}} as ChartReportElement})
  }
  save(){
    this.reportsService.saveReport(this.route.snapshot.paramMap.get('id'), this.reportDefinition).subscribe(d=>console.log("saved"));
  }
  ngOnInit(): void {
    this.reportsService.getLinkedSurvey(this.route.snapshot.paramMap.get('id')).subscribe((d)=> {this.linkedSurveyId = d.surveyId; console.log(this.linkedSurveyId)});
    this.reportsService.getReport(this.route.snapshot.paramMap.get('id')).subscribe(d=>this.reportDefinition=d)
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
