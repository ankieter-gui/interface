import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleBarsWithCustomDataDataPickerComponent } from './multiple-bars-with-custom-data-data-picker.component';

describe('MultipleBarsWithCustomDataDataPickerComponent', () => {
  let component: MultipleBarsWithCustomDataDataPickerComponent;
  let fixture: ComponentFixture<MultipleBarsWithCustomDataDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleBarsWithCustomDataDataPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleBarsWithCustomDataDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
