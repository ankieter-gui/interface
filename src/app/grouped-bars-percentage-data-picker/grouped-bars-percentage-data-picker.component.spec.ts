import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedBarsPercentageDataPickerComponent } from './grouped-bars-percentage-data-picker.component';

describe('GroupedBarsPercentageDataPickerComponent', () => {
  let component: GroupedBarsPercentageDataPickerComponent;
  let fixture: ComponentFixture<GroupedBarsPercentageDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupedBarsPercentageDataPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedBarsPercentageDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
