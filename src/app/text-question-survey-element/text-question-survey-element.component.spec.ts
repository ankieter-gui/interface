import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQuestionSurveyElementComponent } from './text-question-survey-element.component';

describe('TextQuestionSurveyElementComponent', () => {
  let component: TextQuestionSurveyElementComponent;
  let fixture: ComponentFixture<TextQuestionSurveyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextQuestionSurveyElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextQuestionSurveyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
