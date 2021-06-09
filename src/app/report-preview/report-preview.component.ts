import { Component, OnInit } from '@angular/core';
import {ReportDefinition} from '../dataModels/ReportDefinition';
import {SurveysService} from '../surveys.service';
import {ReportsService} from '../reports.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChartReportElement, TextReportElement} from '../dataModels/ReportElement';
import {SurveyQuery} from '../dataModels/Query';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-report-preview',
  templateUrl: './report-preview.component.html',
  styleUrls: ['./report-preview.component.css']
})
export class ReportPreviewComponent implements OnInit {

  mockChartResponseData = {};
  mouseHoveringAddMorePanel=false;
  surveyQuestions;
  linkedSurveyId;
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
  constructor(private surveysService:SurveysService,private reportsService:ReportsService,private route: ActivatedRoute, private router:Router, private window:Window) {
    //https://stackoverflow.com/questions/55019343/how-to-generate-a-pdf-using-angular-7
    if( this.router.getCurrentNavigation().extras.state.shallPrint){
      setTimeout(()=>{this.exportAsPDF("main")}, 2000)
    }
  }
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
    this.reportsService.getLinkedSurvey(this.route.snapshot.paramMap.get('id')).subscribe((d)=> {
      this.linkedSurveyId = d.surveyId; console.log(this.linkedSurveyId)
      this.downloadSurveyQuestions()
      this.reportsService.getReport(this.route.snapshot.paramMap.get('id')).subscribe(d=>this.reportDefinition=d)



    });


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
  exportAsPDF(divId)
  {
   this.window.print()
    }


}
