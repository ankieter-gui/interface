import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GlobalFilter, ReportDefinition} from '../../dataModels/ReportDefinition';

import {SurveyMeta} from '../../dataModels/survey';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {SurveysService} from '../../surveys.service';
import {SurveyQuery} from '../../dataModels/Query';
import {ReportsService} from '../../reports.service';
import {ActivatedRoute} from '@angular/router';
import {ChartReportElement, TextReportElement} from '../../dataModels/ReportElement';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  mockChartResponseData = {};
  mouseHoveringAddMorePanel=false;
  surveyQuestions;
  namingDictionary;
  globalFilter:GlobalFilter = null
  linkedSurveyId;
  reportId;
  reportDefinition:ReportDefinition = { title:"", elements:[
    ]};
  queryData(charData){
    return this.mockChartResponseData;
  }
  generateChart(chartData, config){
    return "chart content"
  }
  removeElement(element){
    this.reportDefinition.elements = this.reportDefinition.elements.filter(d=>d!=element)
    this.save()
  }
  forceUpdate= new Subject();
  refresh(){
    //TODO: there should be a better way to do this. The chart was not updating without setTimeout
    setTimeout(()=>{this.forceUpdate.next();}, 100)

  }
  constructor(private surveysService:SurveysService,private reportsService:ReportsService,private route: ActivatedRoute) { }
  addNewTextElement(){
    this.reportDefinition.elements.push({type:"text", content: {text:""} as TextReportElement})
  }
  async downloadNamingDictionary(){
    this.namingDictionary = await (this.reportsService.getNamingDictionary(this.reportId).toPromise())
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
    this.reportId = this.route.snapshot.paramMap.get('id')
    this.reportsService.getLinkedSurvey(this.route.snapshot.paramMap.get('id')).subscribe((d)=> {
      this.linkedSurveyId = d.surveyId; console.log(this.linkedSurveyId)
      this.downloadSurveyQuestions()
      this.reportsService.getReport(this.route.snapshot.paramMap.get('id')).subscribe(d=>this.reportDefinition=d)
    });
    this.downloadNamingDictionary()


  }
  async downloadSurveyQuestions(){
    this.surveyQuestions = await this.surveysService.getQuestions(this.linkedSurveyId).toPromise();
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
  rename(){
    this.reportsService.renameReport(this.route.snapshot.paramMap.get('id'), this.reportDefinition.title).subscribe(d=>console.log(d))
  }
}
