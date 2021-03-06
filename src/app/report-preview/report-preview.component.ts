import {Component, Input, OnInit} from '@angular/core';
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
  reportDefinition: ReportDefinition = {
    dictionaryOverrides: {}, title: '', elements: [], globalFilter: []
  };
  queryData(charData){
    return this.mockChartResponseData;
  }


  reportId;
  constructor(private surveysService:SurveysService,private reportsService:ReportsService,private route: ActivatedRoute, private router:Router, private window:Window) {
    //https://stackoverflow.com/questions/55019343/how-to-generate-a-pdf-using-angular-7
    if( this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.shallPrint){
      setTimeout(()=>{this.exportAsPDF("main")}, 2000)
    }
  }

  @Input()
  idFromExternalSource;
  ngOnInit(): void {

    this.reportId = this.idFromExternalSource?this.idFromExternalSource:this.route.snapshot.paramMap.get('id')
    this.reportsService.getLinkedSurvey(this.reportId).subscribe((d)=> {
      if (d.error){
        this.router.navigate(['/'])
        return;
      }
      this.linkedSurveyId = d.surveyId; console.log(this.linkedSurveyId)

      this.reportsService.getReport(this.reportId).subscribe(d=>this.reportDefinition=d)
    });
    this.downloadNamingDictionary()


  }
  surveyStructure;
  namingDictionary;

  async downloadNamingDictionary(){
    console.log("downloading structure")
    this.surveyStructure = await (this.reportsService.getSurveyStructure(this.reportId).toPromise())
    this.namingDictionary =  (this.reportsService.getNamingDictionary(this.surveyStructure))
    this.surveyQuestions = Object.keys(this.namingDictionary)
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
    this.reportsService.renameReport(this.reportId, this.reportDefinition.title).subscribe(d=>console.log(d))
  }
  exportAsPDF(divId)
  {
   this.window.print()
    }

  forceUpdate(){

  }
}
