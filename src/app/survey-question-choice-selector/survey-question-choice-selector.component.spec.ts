import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionChoiceSelectorComponent } from './survey-question-choice-selector.component';

describe('SurveyQuestionChoiceSelectorComponent', () => {
  let component: SurveyQuestionChoiceSelectorComponent;
  let fixture: ComponentFixture<SurveyQuestionChoiceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyQuestionChoiceSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuestionChoiceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
