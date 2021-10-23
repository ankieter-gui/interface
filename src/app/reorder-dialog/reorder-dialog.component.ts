import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ReportDefinition} from '../dataModels/ReportDefinition';
import {TextReportElement} from '../dataModels/ReportElement';

@Component({
  selector: 'app-reorder-dialog',
  template: `
    <div cdkDropList class="example-list" (cdkDropListDropped)="drop($event)">
      <ng-container *ngFor="let element of report.elements">
        <div class="example-box text" *ngIf="element.type=='text'" [innerHTML]="element.content.text" cdkDrag></div>
        <div class="example-box chart" *ngIf="element.type=='chart'"
             [innerHTML]="element.content.name?element.content.name:element.content.dataQuery.get[0][0]" cdkDrag>

        </div>

      </ng-container>
    </div>

  `,
  styles: [`
    .example-list {

      max-width: 100%;
      border: solid 1px #ccc;
      min-height: 60px;
      display: block;
      background: white;
      border-radius: 4px;
      overflow: hidden;
    }

    .chart {
      background-color: rgba(63, 134, 237, 0.1);
    }

    .example-box {
      padding: 20px 10px;
      border-bottom: solid 1px #ccc;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      cursor: move;
      background: white;
      font-size: 14px;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-box:last-child {
      border: none;
    }

    .example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }`
  ]
})
export class ReorderDialogComponent implements OnInit {
  @Input()
  report: ReportDefinition;

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.report.elements, event.previousIndex, event.currentIndex);
  }
}
