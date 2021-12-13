import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyElementAddComponent } from './survey-element-add.component';

describe('SurveyElementAddComponent', () => {
  let component: SurveyElementAddComponent;
  let fixture: ComponentFixture<SurveyElementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyElementAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyElementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
