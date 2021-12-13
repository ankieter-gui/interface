import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPageElementComponent } from './survey-page-element.component';

describe('SurveyPageElementComponent', () => {
  let component: SurveyPageElementComponent;
  let fixture: ComponentFixture<SurveyPageElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyPageElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPageElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
