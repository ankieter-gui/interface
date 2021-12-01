import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuestionSurveyElementComponent } from './single-question-survey-element.component';

describe('SingleQuestionSurveyElementComponent', () => {
  let component: SingleQuestionSurveyElementComponent;
  let fixture: ComponentFixture<SingleQuestionSurveyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleQuestionSurveyElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleQuestionSurveyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
