import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Condition, ConditionGroup, Question} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-conditional-survey-question-selector',
  template: `
    <div>
      <nz-table nzTemplateMode>
        <thead><tr><th>Aid</th><th>Warunek</th><th>Wartość</th><th>Odwrócić?</th></tr></thead>
        <tbody *ngFor="let group of element.condition">
            <tr><td colspan="99" style="font-weight: bold">{{group.type}}
              <button nz-button nzType="default" nzShape="circle" (click)="addNewToGroup(group)"><i nz-icon nzType="plus"></i></button>
            </td></tr>
            <tr *ngFor="let condition of group.elements">
              <td><input nz-input [(ngModel)]="condition.aid" (blur)="save()"></td>
              <td style="width:33%"><nz-select style="width: 100%" [(ngModel)]="condition.relation" (ngModelChange)="save()">
                <nz-option *ngFor="let x of ['lte','gte','lt','lte','=']" [nzValue]="x" [nzLabel]="x" ></nz-option>
              </nz-select></td>
              <td><input nz-input [(ngModel)]="condition.value" (blur)="save()"></td>
              <td><label nz-checkbox [(ngModel)]="condition.invert"></label></td>
            </tr>

        </tbody>
      </nz-table>
    </div>
  `,
  styles: [
  ]
})
export class ConditionalSurveyQuestionSelectorComponent implements OnInit {
  @Output() saveEmitter = new EventEmitter();
  @Input() element:Question
  constructor() { }
  addNewToGroup(group){
    group.elements.push(new Condition())
  }
  save(){
    this.saveEmitter.emit()
  }
  ngOnInit(): void {
    if (!this.element.condition) this.element.condition=[]
    if (!this.element.condition.find(x=>x.type=="and")){
      this.element.condition.push(new ConditionGroup("and"))
    }


  }

}
