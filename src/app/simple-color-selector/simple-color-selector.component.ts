import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartReportElement} from '../dataModels/ReportElement';

@Component({
  selector: 'app-simple-color-selector',
  template: `
    <div style="display: flex;flex-direction: row;">
      <span (click)="this.setColor('all',color)" *ngFor="let color of colors" [style.backgroundColor]="color" style="height: 20px; width: 28px; margin: 10px; border-radius: 5px; cursor: pointer"></span>
    </div>

    <mat-form-field style="margin: 0.75em">
      <div>Inny kolor</div>
      <input matInput [ngxMatColorPicker]="picker" [(ngModel)]="pickerColor">
      <ngx-mat-color-toggle matSuffix [for]="picker"></ngx-mat-color-toggle>
      <ngx-mat-color-picker #picker [color]="pickerColor" (closed)="pickerClose()"></ngx-mat-color-picker>
    </mat-form-field>
  `,
  styles: [
  ]
})
export class SimpleColorSelectorComponent implements OnInit {
  colors = new Set([
    '#F46D43',
    '#FEE08B',
    '#66BD63',
    '#078202',
    '#E34933',
    '#FCA55D',
    '#FEE999',
    '#E3F399',
    '#9DD569',
    '#39A758',
    '#D3D3D3'
  ]);
  @Input()
  chart: ChartReportElement;

  @Output()
  update = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  setColor(label, color) {
    if (!this.chart.config.colors) {
      this.chart.config.colors = {};
    }
    this.chart.config.colors[label] = color;
    this.update.emit()
  }
  pickerColor;
  pickerClose() {
    console.log('closed!');
    console.log(this.pickerColor);
    this.setColor("all",'#' + this.pickerColor.hex);
  }
}
