import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommonColorPickerComponent} from './common-color-picker.component';

describe('CommonColorPickerComponent', () => {
  let component: CommonColorPickerComponent;
  let fixture: ComponentFixture<CommonColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonColorPickerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
