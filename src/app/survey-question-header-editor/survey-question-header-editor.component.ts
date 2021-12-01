import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-survey-question-header-editor',
  template: `
    <div>
      <p><b>Tytuł pytania:</b></p>
      <ckeditor #e class="editor" *ngIf="isEditing" [(ngModel)]="element.header" (ngModelChange)="textChange.emit(element.header)"
                (blur)="focused=false; focusEvent.emit(focused); isEditing=false;" [config]="{extraPlugins:'justify'}"
                (focus)="focused=true; focusEvent.emit(focused)"></ckeditor>
      <div *ngIf="!isEditing " (click)="isEditing=true" [innerHTML]="element.header | keepHtml"
           nz-tooltip="Kliknij aby edytować tekst" style="cursor: pointer;padding:2em; border:1px dashed rgba(0,0,0,0.2)"></div>

    </div>
  `,
  styles: [
  ]
})
export class SurveyQuestionHeaderEditorComponent implements OnInit {
  isEditing=false;
  focused=false;
  @Input() element:Question
  @Output() focusEvent:EventEmitter<any> = new EventEmitter<any>()
  @Output() textChange:EventEmitter<string> = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

}
