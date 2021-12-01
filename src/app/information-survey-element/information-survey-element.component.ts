import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Information, TextQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-information-survey-element',
  template: `
    <p>
      <textarea rows="4" nz-input [(ngModel)]="element.header" (blur)="save.emit()"></textarea> \`
    </p>
  `,
  styles: [
  ]
})
export class InformationSurveyElementComponent implements OnInit {
  type=Information
  allowedAttributes=Information.allowedAttrs;
  @Input() element:TextQuestion;
  @Output() save:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
