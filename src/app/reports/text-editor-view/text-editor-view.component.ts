import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-editor-view',
  template: `
    <!--    <ng-container [ngSwitch]="isBeingDragged">-->
    <!--      <div *ngSwitchCase="true" [innerHTML]="text"></div>-->

    <!--    </ng-container>-->
    <ckeditor #e class="editor" *ngIf="!this.isPreview && isEditing" [(ngModel)]="text" (ngModelChange)="textChange.emit(text)"
              (blur)="focused=false; focusEvent.emit([number,focused]); isEditing=false;" [config]="{extraPlugins:'justify'}"
              (focus)="focused=true; focusEvent.emit([number,focused])"></ckeditor>
    <div *ngIf="!this.isPreview && !isEditing " (click)="isEditing=true" [innerHTML]="text | keepHtml"
         nz-tooltip="Kliknij aby edytować tekst" style="cursor: text"></div>
    <div *ngIf="this.isPreview" [innerHTML]="text | keepHtml"></div>
    <button *ngIf="!isPreview" nz-button (click)="isEditing=true">Załaduj edytor tekstu</button>

  `,
  styles: []
})
export class TextEditorViewComponent implements OnInit {
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
