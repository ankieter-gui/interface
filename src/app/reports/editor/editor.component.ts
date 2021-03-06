import {Component, HostListener, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GlobalFilter, ReportDefinition, removeGlobalFilter} from '../../dataModels/ReportDefinition';

import {SurveyMeta} from '../../dataModels/survey';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {SurveysService} from '../../surveys.service';
import {SurveyQuery} from '../../dataModels/Query';
import {ReportsService} from '../../reports.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChartReportElement, ReportElement, TextReportElement} from '../../dataModels/ReportElement';
import {Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FRONTEND_URL} from '../../Configuration';
import {bg_BG} from 'ng-zorro-antd/i18n';
import {DashboardModalsService} from '../../dashboard-modals.service';
import {AbstractChartGenerator} from '../../AbstractChartGenerator';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  animations: [
    trigger("hide", [
      state('open', style({
        transform: 'translateY(0%)',
        opacity: 1,

      })),
      state('closed', style({

        opacity: 0,
        transform: 'translateY(15%)',
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ])]
})
export class EditorComponent implements OnInit {
  //pagination:
  currentPage = 1;
  itemsOnPage = 20;

  constructor(public dialogs: DashboardModalsService, private surveysService: SurveysService, private reportsService: ReportsService, private route: ActivatedRoute, private message: NzMessageService, public window: Window, private router: Router) {
  }

  mockChartResponseData = {};
  mouseHoveringAddMorePanel = false;
  surveyQuestions;
  namingDictionary;
  surveyStructure;
  codeModel;
  removeGlobalFilterRef = removeGlobalFilter
  preview() {
    this.window.open(`${FRONTEND_URL}/reports/${this.reportId}`, '_blank');
  }
  loading = "open"
  hideAndShow(){
    this.loading = "closed"
    setTimeout(() => {this.loading = "open"}, 400)
  }
  itemsForCurrentPage() {
    let endIndex = this.itemsOnPage * this.currentPage;
    let startIndex = endIndex - this.itemsOnPage;
    return this.reportDefinition.elements.slice(startIndex, endIndex);
  }

  useCode() {
    this.reportDefinition = JSON.parse(this.codeModel);
    this.save();
  }

  linkedSurveyId;
  reportId;
  reportDefinition: ReportDefinition = {
    dictionaryOverrides: {}, title: '', elements: [], globalFilter: []
  };

  queryData(charData) {
    return this.mockChartResponseData;
  }

  generateChart(chartData, config) {
    return 'chart content';
  }

  removeElement(element) {
    this.reportDefinition.elements = this.reportDefinition.elements.filter(d => d != element);
    this.save();
  }

  export() {
    let generators: AbstractChartGenerator[] = [];
    this.reportDefinition.elements.forEach(d => {
      if (d.type == 'chart') {
        generators.push((d.content as ChartReportElement).generator);
        (d.content as ChartReportElement).generator = undefined;
      }
    });
    let toSave = JSON.stringify(this.reportDefinition);
    generators.reverse();
    console.log(generators);
    for (let [i, element] of this.reportDefinition.elements.entries()) {
      (element.content as ChartReportElement).generator = generators.pop();
    }
    this.dialogs.openExportReportDialog(toSave);
  }

  forceUpdate = new Subject();

  refresh() {

    //TODO: there should be a better way to do this. The chart was not updating without setTimeout
    setTimeout(() => {
      this.save();
      this.forceUpdate.next();
    }, 100);

  }

  get lastPage() {
    console.log(Math.round(this.reportDefinition.elements.length / this.itemsOnPage + 0.5))
    return Math.round(this.reportDefinition.elements.length / this.itemsOnPage + 0.5);
  }

  moveElementUp(index){
    let i = this.currentPage * this.itemsOnPage - this.itemsOnPage;
    this.array_move(this.reportDefinition.elements, index+i,index+i-1 )
    this.save()
  }
  moveElementDown(index){
    let i = this.currentPage * this.itemsOnPage - this.itemsOnPage;
    this.array_move(this.reportDefinition.elements, index+i,index+i+1 )
    this.save()
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };

  duplicateElement(element: ReportElement,index=undefined) {
    let generator;
    let shallowCopy = {};
    Object.assign(shallowCopy, element);
    // @ts-ignore
    Object.assign(shallowCopy.content, element.content);
    if (element.type == 'chart') {
      // @ts-ignore
      (shallowCopy as ReportElement).content.generator = undefined;

    }
    const deepCopy = JSON.parse(JSON.stringify(shallowCopy))
    if (index){
      let i = this.currentPage * this.itemsOnPage - this.itemsOnPage;
      this.reportDefinition.elements.splice(index+i+1, 0, deepCopy);
    }else {
      this.reportDefinition.elements.push(deepCopy);
      if (this.currentPage != this.lastPage) {
        this.currentPage = 999;
      }
    }
    this.save();

  }

  addNewTextElement(beginning = false) {
    let elem = {type: 'text', content: {text: ''} as TextReportElement};

    if (beginning) {
      //@ts-ignore
      this.reportDefinition.elements = [elem, ...this.reportDefinition.elements];
    } else {
      //@ts-ignore
      this.reportDefinition.elements.push(elem);
    }
    if (this.currentPage != this.lastPage) {
      this.currentPage = 999;
    }

  }
  addNewTextElementAtIndex(index){
    let i = this.currentPage * this.itemsOnPage - this.itemsOnPage;
    let elem = {type: 'text', content: {text: ''}};
    // @ts-ignore
    this.reportDefinition.elements.splice(index+i, 0, elem);
    this.save()
  }
  addNewChartElementAtIndex(index){
    let elem = {
      type: 'chart', content: {
        name: '', dataQuery: new SurveyQuery(), config: {
          tableDefinition: {series: []},
          type: null,
          allTogetherLabel: 'UAM',
          orientation: 'vertical',
        }
      } as ChartReportElement
    };
    let i = this.currentPage * this.itemsOnPage - this.itemsOnPage;
    // @ts-ignore
    this.reportDefinition.elements.splice(index+i, 0, elem);
    this.save()
  }


  async downloadNamingDictionary() {
    console.log('downloading structure');
    this.surveyStructure = await (this.reportsService.getSurveyStructure(this.reportId).toPromise());
    this.namingDictionary = (this.reportsService.getNamingDictionary(this.surveyStructure));
    this.surveyQuestions = Object.keys(this.namingDictionary)
  }

  addNewChartElement(beginning = false) {
    let elem = {
      type: 'chart', content: {
        name: '', dataQuery: new SurveyQuery(), config: {
          tableDefinition: {series: []},
          type: null,
          allTogetherLabel: 'UAM',
          orientation: 'vertical',
        }
      } as ChartReportElement
    };

    if (beginning) {
      //@ts-ignore
      this.reportDefinition.elements = [elem, ...this.reportDefinition.elements];
    } else {
      //@ts-ignore
      this.reportDefinition.elements.push(elem);
    }
    if (this.currentPage != this.lastPage) {
      this.currentPage = 999;
    }
  }


  save(manual = false) {
    if (manual) {
      this.message.info('Zapisano')
    }
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

      this.reportsService.getReport(this.route.snapshot.paramMap.get('id')).subscribe(d=>this.reportDefinition=d)
    });
    this.downloadNamingDictionary()


  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('drop');
    let i = this.currentPage * this.itemsOnPage - this.itemsOnPage;
    moveItemInArray(this.reportDefinition.elements, event.previousIndex + i, event.currentIndex + i);


  }
  rename(){
    this.reportsService.renameReport(this.route.snapshot.paramMap.get('id'), this.reportDefinition.title).subscribe(d=>console.log(d))
  }
}
