import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyEditorXMLUploadDialogComponent } from './survey-editor-xmlupload-dialog.component';

describe('SurveyEditorXMLUploadDialogComponent', () => {
  let component: SurveyEditorXMLUploadDialogComponent;
  let fixture: ComponentFixture<SurveyEditorXMLUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyEditorXMLUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyEditorXMLUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
