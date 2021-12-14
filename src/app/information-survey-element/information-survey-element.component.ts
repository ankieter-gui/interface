import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Information, TextQuestion} from '../dataModels/SurveyDefinition';

@Component({
  selector: 'app-information-survey-element',
  template: `
    <div>

      <ckeditor #e class="editor" *ngIf="isEditing" [(ngModel)]="element.header"
                (blur)="focused=false; save.emit(); isEditing=false;" [config]="{extraPlugins:'justify'}"
                (focus)="focused=true;"></ckeditor>
      <div *ngIf="!isEditing " (click)="isEditing=true" [innerHTML]="element.header | keepHtml"
           nz-tooltip="Kliknij aby edytować tekst" style="cursor: pointer;padding:2em; border:1px dashed rgba(0,0,0,0.2)"></div>

    </div>
  `,
  styles: [
  ]
})
export class InformationSurveyElementComponent implements OnInit {
  type=Information
  focused=false;
  isEditing=false;
  allowedAttributes=Information.allowedAttrs;
  @Input() element:TextQuestion;
  @Output() save:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
