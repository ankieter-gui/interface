import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupEditorComponent } from './question-group-editor.component';

describe('QuestionGroupEditorComponent', () => {
  let component: QuestionGroupEditorComponent;
  let fixture: ComponentFixture<QuestionGroupEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionGroupEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
