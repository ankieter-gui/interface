import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportElement, TextReportElement} from '../../dataModels/ReportElement';

@Component({
  selector: 'app-text-editor-view',
  template: `
    <!--    <ng-container [ngSwitch]="isBeingDragged">-->
    <!--      <div *ngSwitchCase="true" [innerHTML]="text"></div>-->

    <!--    </ng-container>-->
    <ckeditor #e class="editor" *ngIf="!this.isPreview && isEditing" [(ngModel)]="text" (ngModelChange)="textChange.emit(text)"
              (blur)="focused=false; focusEvent.emit([number,focused]); isEditing=!(this.text);" [config]="{extraPlugins:'justify'}"
              (focus)="focused=true; focusEvent.emit([number,focused])"></ckeditor>
    <div *ngIf="!this.isPreview && !isEditing " (click)="isEditing=true" [innerHTML]="text | keepHtml"
         nz-tooltip="Kliknij aby edytować tekst" style="cursor: text"></div>
    <div *ngIf="this.isPreview" [innerHTML]="text | keepHtml"></div>
    <div *ngIf="!isPreview">
      <button nz-button nzType="default" (click)="isEditing=!isEditing" nz-tooltip="Edytuj tekst">{{this.isEditing?"Wyłącz edytor":"Włącz edytor"}}<i nz-icon nzType="edit"></i></button>
      <nz-table nzTemplateMode>
        <thead>
        <tr><th rowspan="999">Opcjonalne:</th></tr>
        <tr><th>
          <label nz-checkbox (nzCheckedChange)="focusEvent.emit([number,focused])" [(ngModel)]="this.element.isLinkedToSectionBelow">Nigdy nie łam strony po tym tekście</label>

        </th><th>
          <label nz-checkbox (nzCheckedChange)="focusEvent.emit([number,focused])" [(ngModel)]="this.element.dontBreakInside">Zezwalaj na łamanie strony w środku tekstu</label>

        </th><th>
          <label nz-checkbox (nzCheckedChange)="focusEvent.emit([number,focused])" [(ngModel)]="this.parentElement.alwaysBreakAfter">Zawsze łam stronę po tym tekście</label>

        </th></tr>
        </thead>
      </nz-table>
<!--      <button *ngIf="!isEditing" nz-button (click)="isEditing=true;" style="margin-bottom:1em;"><i nz-icon nzType="edit"></i> Załaduj edytor tekstu</button>-->
<!--      <button *ngIf="isEditing" nz-button (click)="isEditing=false;focused=false;" style="margin-bottom:1em;"><i nz-icon nzType="edit"></i> Zapisz i schowaj edytor tekstu</button>-->
       </div>
  `,
  styles: []
})
export class TextEditorViewComponent implements OnInit {
  @Input()
  parentElement:ReportElement
  @Input()
  element:TextReportElement;
  @Input()
  isLast;
  isEditing = false;
  @Output()
  focusEvent: EventEmitter<[number, boolean]> = new EventEmitter<[number, boolean]>();
  @Output()
  focused: boolean = false;
  @Input()
  text: string;
  @Input()
  isPreview = false;
  @Output() textChange = new EventEmitter<string>();
  @Input()
  number:number;
  constructor() { }

  ngOnInit(): void {
    this.isEditing = this.isLast;
  }

}
