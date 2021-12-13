import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalSurveyQuestionSelectorComponent } from './conditional-survey-question-selector.component';

describe('ConditionalSurveyQuestionSelectorComponent', () => {
  let component: ConditionalSurveyQuestionSelectorComponent;
  let fixture: ComponentFixture<ConditionalSurveyQuestionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionalSurveyQuestionSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalSurveyQuestionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
