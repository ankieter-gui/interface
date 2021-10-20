import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ColorsGenerator} from '../ColorsGenerator';

@Component({
  selector: 'app-common-color-picker',
  template: `
    <div style="display: flex;flex-direction: row;">
      <span (click)="this.onPick.emit(color)" *ngFor="let color of colors" [style.backgroundColor]="color" style="height: 10px; width: 18px; margin: 10px; border-radius: 5px; cursor: pointer"></span>
    </div>

    <mat-form-field style="margin: 0.75em">
      <div>Inny kolor</div>
      <input matInput [ngxMatColorPicker]="picker" [(ngModel)]="pickerColor">
      <ngx-mat-color-toggle matSuffix [for]="picker"></ngx-mat-color-toggle>
      <ngx-mat-color-picker #picker [color]="pickerColor" (closed)="pickerClose()"></ngx-mat-color-picker>
    </mat-form-field>

  `,
  styles: []
})
export class CommonColorPickerComponent implements OnInit {
  pickerColor;
  @Output()
  onPick = new EventEmitter<String>();
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

  constructor() {
  }

  pickerClose() {
    console.log('closed!');
    console.log(this.pickerColor);
    this.onPick.emit('#' + this.pickerColor.hex);
  }

  ngOnInit(): void {
  }

}
