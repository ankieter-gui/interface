import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestionSurveyElementComponent } from './multiple-choice-question-survey-element.component';

describe('MultipleChoiceQuestionSurveyElementComponent', () => {
  let component: MultipleChoiceQuestionSurveyElementComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionSurveyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceQuestionSurveyElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceQuestionSurveyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
