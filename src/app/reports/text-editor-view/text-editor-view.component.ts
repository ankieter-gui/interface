import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-editor-view',
  template: `
    <!--    <ng-container [ngSwitch]="isBeingDragged">-->
    <!--      <div *ngSwitchCase="true" [innerHTML]="text"></div>-->

    <!--    </ng-container>-->
    <ckeditor #e class="editor" *ngIf="!this.isPreview" [(ngModel)]="text" (ngModelChange)="textChange.emit(text)"
              (blur)="focused=false; focusEvent.emit([number,focused])" [config]="{extraPlugins:'justify'}"
              (focus)="focused=true; focusEvent.emit([number,focused])"></ckeditor>
    <div *ngIf="this.isPreview" [innerHTML]="text | keepHtml"></div>

  `,
  styles: [
  ]
})
export class TextEditorViewComponent implements OnInit {
  @Output()
  focusEvent:EventEmitter<[number,boolean]>= new EventEmitter<[number,boolean]>();
  @Output()
  focused:boolean=false;
  @Input()
  text:string;
  @Input()
  isPreview=false;
  @Output() textChange = new EventEmitter<string>()
  @Input()
  number:number;
  constructor() { }

  ngOnInit(): void {
  }

}
