import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurveyDialogComponent } from './new-survey-dialog.component';

describe('NewSurveyDialogComponent', () => {
  let component: NewSurveyDialogComponent;
  let fixture: ComponentFixture<NewSurveyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSurveyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
