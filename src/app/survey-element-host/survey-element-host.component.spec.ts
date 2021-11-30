import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyElementHostComponent } from './survey-element-host.component';

describe('SurveyElementHostComponent', () => {
  let component: SurveyElementHostComponent;
  let fixture: ComponentFixture<SurveyElementHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyElementHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyElementHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
