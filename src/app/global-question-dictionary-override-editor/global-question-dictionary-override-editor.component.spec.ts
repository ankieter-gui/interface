import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GlobalQuestionDictionaryOverrideEditorComponent} from './global-question-dictionary-override-editor.component';

describe('GlobalQuestionDictionaryOverrideEditorComponent', () => {
  let component: GlobalQuestionDictionaryOverrideEditorComponent;
  let fixture: ComponentFixture<GlobalQuestionDictionaryOverrideEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalQuestionDictionaryOverrideEditorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalQuestionDictionaryOverrideEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
