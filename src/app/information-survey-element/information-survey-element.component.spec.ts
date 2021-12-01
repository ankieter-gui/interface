import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSurveyElementComponent } from './information-survey-element.component';

describe('InformationSurveyElementComponent', () => {
  let component: InformationSurveyElementComponent;
  let fixture: ComponentFixture<InformationSurveyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationSurveyElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationSurveyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
