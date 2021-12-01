import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionHeaderEditorComponent } from './survey-question-header-editor.component';

describe('SurveyQuestionHeaderEditorComponent', () => {
  let component: SurveyQuestionHeaderEditorComponent;
  let fixture: ComponentFixture<SurveyQuestionHeaderEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyQuestionHeaderEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuestionHeaderEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
