import {Component, Input, OnInit, Output,  EventEmitter} from '@angular/core';
import {GlobalFilter, ReportDefinition} from '../dataModels/ReportDefinition';
import {ReportsService} from '../reports.service';


@Component({
  selector: 'app-filters-selector',
  template: `
    <nz-tag nzMode="closeable" style="margin:1em;" (nzOnClose)="deleteFilter(filter)" *ngFor="let filter of this.filters" (click)="this.selectedQuestionName = filter.question">{{filter.question}} - <b>{{this.reportService.getLabelFor(this.namingDictionary, filter.question, filter.answer)}}</b></nz-tag>

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
        <td>  <label nz-checkbox [ngModel]="this.isQuestionSelected(entry)"></label></td>
        <td>{{entry}}</td>


      </tr>
      </tbody>
    </nz-table>
    </nz-tab>
      <nz-tab nzTitle="Odpowiedzi">
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
            <td>  <label nz-checkbox [ngModel]="this.isAnswerForQuestionSelected(this.selectedQuestionName, entry)"></label></td>
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
  @Input()
  multipleQuestionsAllowed=false;
  answerSearchString;
  @Output()
  filtersChange = new EventEmitter<GlobalFilter[]>();
  @Input()
  filters:GlobalFilter[]=[];
  searchString;
  selectedQuestionName;
  @Input()
  report:ReportDefinition
  @Input()
  reportId
  @Input()
  allQuestions
  answers;
  @Input()
  namingDictionary;
  @Input()
  structure
  index=0;
  reverseAnswers
  deleteFilter(f){
    this.filters=this.filters.filter(d=>d!==f)
  }
  isQuestionSelected(question):boolean{
    if (!this.filters) return false;
    return this.filters.some(d=>d.question===question)
  }
  isAnswerForQuestionSelected(question, answer){
    if (!this.filters) return false;
    return this.filters.filter(d=>d.question == question).some(d=>d.answer==answer)
  }
  getAnswerForQuestion(question, answer){
    return this.filters.filter(d=>d.question == question).filter(d=>d.answer==answer)[0]
  }

  get questionNames(){
    return this.allQuestions?Object.keys(this.allQuestions):[]
  }
  constructor(public reportService:ReportsService) { }
  async selectQuestion(entry){
    if (this.isQuestionSelected(entry)) {
      let toDelete = this.filters.filter(d=>d.question===entry)
      toDelete.forEach(d=>{
        this.deleteFilter(d)
      })

    } else {
      this.selectedQuestionName=entry;
      await this.downloadAnswers()
      this.index=2
    }


  }
  async downloadAnswers(){
    this.answers = Object.keys(this.namingDictionary[this.selectedQuestionName])//.map(d=>this.reportService.getLabelFor(this.namingDictionary, this.selectedQuestionName,d))
    //flips the obejct
    // @ts-ignore
    // Object.assign(this.reverseAnswers, ...Object.entries(this.namingDictionary[this.selectedQuestionName]).map(([a,b]) => ({ [b]: a })))

  }
  selectAnswer(entry) {
    if (this.isAnswerForQuestionSelected(this.selectedQuestionName,entry)){
      this.deleteFilter(this.getAnswerForQuestion(this.selectedQuestionName,entry))
      if (!this.isQuestionSelected(this.selectedQuestionName)){this.index=0}
    }else{
      if (!this.filters) this.filters=[]
      this.filters.push({question:this.selectedQuestionName, answer:entry})
    }
    this.filtersChange.emit(this.filters);
  }
  ngOnInit(): void {
    if (this.filters) {
      this.selectedQuestionName = this.filters[0].question;
      this.downloadAnswers();
    }else{
      this.filters=[]
    }
  }
  reset(){
    this.selectedQuestionName = null;
  }

}
