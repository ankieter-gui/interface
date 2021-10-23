import {Component, Input, OnInit, Output,  EventEmitter} from '@angular/core';
import {GlobalFilter, ReportDefinition} from '../dataModels/ReportDefinition';
import {ReportsService} from '../reports.service';


@Component({
  selector: 'app-filters-selector',
  template: `
    <nz-tabset [(nzSelectedIndex)]="index">
    <nz-tab nzTitle="Pytanie">
    <input nz-input [(ngModel)]="searchString" placeholder="Szukaj..." style="margin-bottom: 1em">
    <nz-table #questionsTable [nzData]="this.questionNames | filterString: searchString">
      <thead>
      <tr>
        <th>Zaznaczono</th>
        <th>Pytanie</th>

      </tr>
      </thead>
      <tbody>
      <tr  style="cursor: pointer" *ngFor="let entry of questionsTable.data" (click)="selectQuestion(entry)">
        <td>  <label nz-checkbox [ngModel]="selectedQuestionName==entry"></label></td>
        <td>{{entry}}</td>


      </tr>
      </tbody>
    </nz-table>
    </nz-tab>
      <nz-tab nzTitle="Odpowiedzi">
        <nz-tag style="margin:1em;">{{this.selectedQuestionName}}</nz-tag>
        <input nz-input [(ngModel)]="answerSearchString" placeholder="Szukaj..." style="margin-bottom: 1em">
        <nz-table #answersTable [nzData]="this.answers | filterDict: answerSearchString: namingDictionary: this.selectedQuestionName" *ngIf="this.selectedQuestionName">
          <thead>
          <tr>
            <th>Zaznaczono</th>
            <th>Odpowiedź</th>

          </tr>
          </thead>
          <tbody>
          <tr style="cursor: pointer" *ngFor="let entry of answersTable.data" (click)="selectAnswer(entry)">
            <td>  <label nz-checkbox [ngModel]="selectedAnswers.includes(entry)"></label></td>
            <td>{{this.reportService.getLabelFor(this.namingDictionary, this.selectedQuestionName, entry)}}</td>


          </tr>
          </tbody>
        </nz-table>
        <p *ngIf="!this.selectedQuestionName">Wybierz pytanie</p>

      </nz-tab>
    </nz-tabset>
  `,
  styles: [
    `tbody tr:hover{

    }`
  ]
})
export class FiltersSelectorComponent implements OnInit {
  answerSearchString;
  @Output()
  filtersChange = new EventEmitter<GlobalFilter>();
  @Input()
  filters;
  searchString;
  selectedQuestionName;
  @Input()
  report:ReportDefinition
  @Input()
  reportId
  @Input()
  allQuestions
  answers;
  selectedAnswers = [];
  @Input()
  namingDictionary;
  @Input()
  structure
  index=0;
  reverseAnswers
  get questionNames(){
    return this.allQuestions?Object.keys(this.allQuestions):[]
  }
  constructor(public reportService:ReportsService) { }
  async selectQuestion(entry){
    this.selectedQuestionName = this.selectedQuestionName != entry ? entry : null;
    this.selectedAnswers = [];
    if(this.selectedQuestionName) {
      await this.downloadAnswers()
      this.index = 1
    }else {
      this.filters = [];
      this.filtersChange.emit(this.filters);
    }
  }
  async downloadAnswers(){
    this.answers = Object.keys(this.namingDictionary[this.selectedQuestionName])//.map(d=>this.reportService.getLabelFor(this.namingDictionary, this.selectedQuestionName,d))
    //flips the obejct
    // @ts-ignore
    // Object.assign(this.reverseAnswers, ...Object.entries(this.namingDictionary[this.selectedQuestionName]).map(([a,b]) => ({ [b]: a })))

  }
  selectAnswer(entry) {
    if (this.selectedAnswers.includes(entry)) {
      this.selectedAnswers = this.selectedAnswers.filter(d => d != entry);
    } else {
      this.selectedAnswers.push(entry);
    }
    this.filters = this.selectedAnswers.map(d => ({question: this.selectedQuestionName, answer: d}));
    this.filtersChange.emit(this.filters);
  }
  ngOnInit(): void {
    if (this.filters) {
      this.selectedQuestionName = this.filters[0].question;
      this.selectedAnswers = this.filters.map(d => d.answer);
      this.downloadAnswers();
    }
  }
  reset(){
    this.selectedAnswers = [];
    this.selectedQuestionName = null;
  }

}
