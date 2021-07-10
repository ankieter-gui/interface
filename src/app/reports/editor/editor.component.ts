import {Component, HostListener, OnInit} from '@angular/core';
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
import {NzMessageService} from 'ng-zorro-antd/message';

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
  surveyStructure;
  codeModel;
  useCode(){
    this.reportDefinition = JSON.parse(this.codeModel)
    this.save()
  }
  linkedSurveyId;
  reportId;
  reportDefinition:ReportDefinition = { title:"", elements:[
    ], globalFilter:null};
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
    setTimeout(()=>{this.save(); this.forceUpdate.next();}, 100)

  }
  constructor(private surveysService:SurveysService,private reportsService:ReportsService,private route: ActivatedRoute, private message: NzMessageService) { }
  addNewTextElement(){
    this.reportDefinition.elements.push({type:"text", content: {text:""} as TextReportElement})
  }
  async downloadNamingDictionary(){
    console.log("downloading structure")
    this.surveyStructure = await (this.reportsService.getSurveyStructure(this.reportId).toPromise())
    this.namingDictionary =  (this.reportsService.getNamingDictionary(this.surveyStructure))
  }
  addNewChartElement(){
    this.reportDefinition.elements.push({type:"chart", content: {name:"", dataQuery: new SurveyQuery(), config: { tableDefinition:{series:[]},
          type:null,
          orientation:"vertical",}} as ChartReportElement})
  }


  save(manual=false){
    if (manual)  this.message.info('Zapisano')
    this.reportsService.saveReport(this.route.snapshot.paramMap.get('id'), this.reportDefinition).subscribe(d=>null );
  }
  @HostListener('document:keydown.control.s', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log('Save Performed');
    event.preventDefault();
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
