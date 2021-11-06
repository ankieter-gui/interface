import {Component, Input, OnInit} from '@angular/core';
import {GroupSummaryGroup, GroupSummaryPickerComponent} from '../group-summary-picker/group-summary-picker.component';

@Component({
  selector: 'app-question-group-editor',
  template: `

    <input nz-input [(ngModel)]="questionSearchString" placeholder="Szukaj..." style="margin-bottom: 1em">
    <div>
    <nz-table #questionTable [nzData]="parent.questionNames|NameFilter: questionSearchString" [nzPageSize]="5">
      <thead>
      <tr>
        <th>Zaznaczono</th>
        <th>Pytanie</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let q of questionTable.data" (click)="pickerClick(q)" style="cursor: pointer">
        <td><label style="pointer-events: none" nz-checkbox
                   [nzChecked]="this.group.questions.includes(q)"></label></td>
        <td style="font-size: 0.8em">{{q}}</td>
      </tr>
      </tbody>
    </nz-table>
    </div>
  `,
  styles: [
  ]
})
export class QuestionGroupEditorComponent implements OnInit {
  pickerClick(q){
    if (this.group.questions.includes(q)){
      this.group.questions = this.group.questions.filter(d=>d!=q)
      this.group.refreshCommonPrefix()
    }else{
      this.group.add(q)
    }
  }
  questionSearchString="";
  @Input()
  parent:GroupSummaryPickerComponent;
  @Input()
  group:GroupSummaryGroup
  constructor() { }

  ngOnInit(): void {
    console.log(this.parent.questionNames)
    console.log(this.parent.questions)
    console.log(this.parent)
  }

}
