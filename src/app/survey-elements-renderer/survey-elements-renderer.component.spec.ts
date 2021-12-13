import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyElementsRendererComponent } from './survey-elements-renderer.component';

describe('SurveyElementsRendererComponent', () => {
  let component: SurveyElementsRendererComponent;
  let fixture: ComponentFixture<SurveyElementsRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyElementsRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyElementsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
