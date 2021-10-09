import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LocalQuestionDictionaryOverrideEditorComponent} from './local-question-dictionary-override-editor.component';

describe('LocalQuestionDictionaryOverrideEditorComponent', () => {
  let component: LocalQuestionDictionaryOverrideEditorComponent;
  let fixture: ComponentFixture<LocalQuestionDictionaryOverrideEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalQuestionDictionaryOverrideEditorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalQuestionDictionaryOverrideEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
