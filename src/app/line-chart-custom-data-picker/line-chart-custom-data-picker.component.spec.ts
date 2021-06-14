import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartCustomDataPickerComponent } from './line-chart-custom-data-picker.component';

describe('LineChartCustomDataPickerComponent', () => {
  let component: LineChartCustomDataPickerComponent;
  let fixture: ComponentFixture<LineChartCustomDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartCustomDataPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartCustomDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
