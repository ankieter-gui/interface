import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSummaryPickerComponent } from './group-summary-picker.component';

describe('GroupSummaryPickerComponent', () => {
  let component: GroupSummaryPickerComponent;
  let fixture: ComponentFixture<GroupSummaryPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSummaryPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSummaryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
