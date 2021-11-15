import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartReportElement} from '../dataModels/ReportElement';
import {DashboardModalsService} from '../dashboard-modals.service';
import {commonSubstring} from '../lcs';
import {fadeInOut, fadeInOutSmallElement} from '../commonAnimations';

@Component({
  animations:[fadeInOutSmallElement],
  selector: 'app-group-summary-picker',
  template: `
    <section class="question-selector dane">
      <div style="display: flex;flex-direction: row"><span style='font-family: "Gilroy ExtraBold", sans-serif; width:50%;'>Dane:</span>
      </div>
      <div style="display: flex; flex-direction: row; width: 100%">
        <nz-table #aggregationTable nzTemplateMode>
          <thead>
          </thead>
          <tbody>
          <tr>
            <td style="cursor: pointer!important;"
                *ngFor='let q of ["max","min","mode","mean","median","std","var","count","rows","sum"]'
                (click)="$event.preventDefault();$event.stopPropagation();asPickerClick(q);refreshChart()"><label><input
              style="pointer-events:none" type="checkbox" (click)="$event.preventDefault()"
              [checked]="chartData.dataQuery.as.includes(q)"> {{q |  PolskieNazwy | titlecase}}</label></td>
          </tr>
          </tbody>
        </nz-table>
        <!--                          <label  nz-checkbox [nzChecked]="chartData.dataQuery.as.includes(q)" (click)="asPickerClick(q);refreshChart()">{{q | PolskieNazwy | titlecase}}</label>-->
      </div>
    </section>
    <section class="picker" >

      <nz-table style="margin-top:1em" nzTemplateMode>
        <thead>
        <th>Pytania</th>
        <th>Nazwa grupy</th>
        <th>Kontrolki</th>
        </thead>
        <tbody>
        <tr *ngFor="let group of this.groups">
          <td style="width:60%">
            <div>
              <b>{{group.commonPrefix}}</b>
              <div style="position:relative;margin-top:0.5em;padding:0.5em; border:1px solid rgba(0,0,0,0.1); border-radius: 5px;" *ngFor="let question of group.questions">
                <button style="position: absolute; top:5px; right:5px" nz-button nzShape="circle" (click)="onClose(group,question);saveToQuery()"><i nz-icon nzType="delete"></i></button>
                {{applyPrefix(question, group.commonPrefix)}}
              </div>
            </div>
            <button style="margin-top:1em" nz-button nzType="default" nzShape="circle" (click)="openQuestionsDialog(group)"><i nz-icon nzType="plus"></i></button>
            <span style="margin-left:1em">Dodaj pytanie</span>
          </td>
          <td><input nz-input [(ngModel)]="group.newName" (blur)="saveToQuery()" placeholder="Nazwa grupy"></td>
          <td><button nz-button nzType="default" nzShape="circle" (click)="removeGroup(group); saveToQuery()"><i nz-icon nzType="delete"></i></button></td>
        </tr>
        </tbody>
      </nz-table>
    </section>
    <section style="margin-top:1em;margin-bottom: 3em">
      <button nz-button nzType="default" nzShape="circle" (click)="addNewGroup();saveToQuery()"><i nz-icon nzType="plus"></i></button>
      <span style="margin-left:1em">Dodaj grupę</span>
      <span *ngIf="this.groups.length==0" style="margin-left:1em;color:red">Brak grup. Dodaj nową.</span>
    </section>

  `,
  styles: [
  ]
})
export class GroupSummaryPickerComponent implements OnInit {

  @Input()
  questions;
  @Output()
  saveEmitter=new EventEmitter();
  groups:GroupSummaryGroup[]=[];
  questionSearchString;
  @Input()
  chartData:ChartReportElement
  @Input()
  questionNames;

  getFromQuery(){
    if (!this.chartData.dataQuery.join) return []
    return this.chartData.dataQuery.join.map(x=>{
      const u = new GroupSummaryGroup();
      u.questions=x.of;
      u.newName=x.name;
      return u;
    })
  }
  saveToQuery(){
    // this.chartData.dataQuery.get = [this.groups.map(x=>x.newName)]
    if (this.groups.some(x=>!x.newName)) return;
    this.chartData.dataQuery.join = this.groups.map(x=>({name:x.newName, of:x.questions}))
    this.saveEmitter.emit()
  }

  addNewGroup(){
    this.groups.push( new GroupSummaryGroup())
  }
  removeGroup(group){
    this.groups = this.groups.filter(d=>d!==group)
  }
  constructor(public dashboardModals:DashboardModalsService) {

  }

  ngOnInit(): void {
    this.addNewGroup()
    const fromQuery = this.getFromQuery()
    if (fromQuery) this.groups=fromQuery;

  }
  refreshChart(){

  }
  openQuestionsDialog(group){
    this.dashboardModals.openEditQuestionGroupDialog(group, this, ()=>this.saveToQuery())
  }
  asPickerClick(q){
    console.log("as picker click")
    // @ts-ignore
    if (this.chartData.dataQuery.as.includes(q)) {
      this.chartData.dataQuery.as = this.chartData.dataQuery.as.filter(d => d != q);
    } else {
      // @ts-ignore
      this.chartData.dataQuery.as.push(q);

    }
    this.saveToQuery()
  }
  onClose(group:GroupSummaryGroup,question){
    group.questions = group.questions.filter(d=>d!=question)
  }
  applyPrefix(question,prefix){
    return question.replace(prefix,'')
  }
}
export class GroupSummaryGroup{
  add(question){
    this.questions.push(question)
   this.refreshCommonPrefix()
  }
  refreshCommonPrefix(){
    this.commonPrefix = commonSubstring(this.questions)
  }
  constructor() {
    this.questions=[];
    this.newName="";
    this.commonPrefix=""
  }
  questions:string[];
  newName:string
  commonPrefix:string;
}
