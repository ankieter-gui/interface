import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ChartReportElement} from '../dataModels/ReportElement';
import {ChartsService} from '../charts.service';
import {ReportsService} from '../reports.service';

@Component({
  selector: 'app-colors-and-order-selector',
  template: `
    <div>Przeciągnij aby zmienić kolejność</div>

    <div cdkDropList cdkDropListOrientation="horizontal" class="example-list" (cdkDropListDropped)="drop($event)"
         *ngIf="this.chart.dataQuery.get[0] && this.chart.dataQuery.get[0][0]">

      <div class="example-box" *ngFor="let label of this.chart.config.order.order" cdkDrag>
        <div>{{this.reportService.getLabelFor(this.dictionary, this.chart.dataQuery.get[0][0], label)}}</div>
        <button [nzDropdownMenu]="colorsMenu" nz-button nz-dropdown nzTrigger="click" [nzClickHide]="true">
          Zmień kolor
          <i nz-icon nzType="down"></i>
        </button>
        <nz-dropdown-menu #colorsMenu="nzDropdownMenu">
          <section style="border: 1px solid rgba(0,0,0,0.1)" nz-menu>
            <app-common-color-picker (onPick)="setColor(label,$event)"></app-common-color-picker>
          </section>
        </nz-dropdown-menu>
      </div>
    </div>

  `,
  styles: [`
    .example-list {
      overflow: scroll;
      border: solid 1px #ccc;
      min-height: 60px;
      display: flex;
      flex-direction: row;
      background: white;
      border-radius: 4px;
      overflow-y: hidden;
    }

    .example-box {
      padding: 20px 10px;
      border-right: solid 1px #ccc;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      cursor: move;
      background: white;
      font-size: 14px;
      flex-grow: 1;
      flex-basis: 0;
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
    }
  `]
})
export class ColorsAndOrderSelectorComponent implements OnInit {
  allLabels: any[];
  colors = {};

  @Input()
  lastDataResponse;

  @Input()
  dictionary;
  @Input()
  chart: ChartReportElement;

  @Output()
  update = new EventEmitter();

  constructor(public reportService: ReportsService) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chart.config.order.order, event.previousIndex, event.currentIndex);
    this.update.emit();
  }

  ngOnInit(): void {

  }

  setColor(label, color) {
    if (!this.chart.config.colors) {
      this.chart.config.colors = {};
    }
    this.chart.config.colors[label] = color;
    this.update.emit()
  }


}
