import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Condition, Question} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-conditional-survey-question-selector',
  template: `
    <div>
      <nz-table nzTemplateMode>
        <thead>
        <tr>
          <th>Typ</th>
          <th>ID pytania (AID)</th>
          <th>Warunek</th>
          <th>Wartość</th>
          <th>Negacja</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let condition of element.condition">
          <td>
            <nz-select style="width: 100%" [(ngModel)]="condition.type" (ngModelChange)="save()">
              <nz-option *ngFor="let x of ['and', 'or']" [nzValue]="x" [nzLabel]="x"></nz-option>
            </nz-select>
          </td>
          <td><input nz-input [(ngModel)]="condition.aid" (blur)="save()"></td>
          <td style="width:33%">
            <nz-select style="width: 100%" [(ngModel)]="condition.relation" (ngModelChange)="save()">
              <nz-option *ngFor="let x of ['lte','gte','lt','lte','=']" [nzValue]="x" [nzLabel]="getPolishLabel(x)"></nz-option>
            </nz-select>
          </td>
          <td><input nz-input [(ngModel)]="condition.value" (blur)="save()"></td>
          <td><label nz-checkbox [(ngModel)]="condition.invert"></label></td>
        </tr>
        <tr>
          <td colspan="99" style="font-weight: bold">
            <button nz-button nzType="default" nzShape="circle" (click)="addNew()"><i nz-icon nzType="plus"></i></button>
          </td>
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
  @Input() element: Question
  getPolishLabel(name: string): string{
    return {lte: "<=", gte: ">=", lt: "<", gt: ">", "=": "="}[name];
  }

  constructor() { }
  addNew(){
   this.element.condition.push(new Condition())
  }
  save(){
    this.saveEmitter.emit()
  }
  ngOnInit(): void {
    if (!this.element.condition) { this.element.condition = [] }



  }

}
