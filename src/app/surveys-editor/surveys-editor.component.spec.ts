import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysEditorComponent } from './surveys-editor.component';

describe('SurveysEditorComponent', () => {
  let component: SurveysEditorComponent;
  let fixture: ComponentFixture<SurveysEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveysEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
