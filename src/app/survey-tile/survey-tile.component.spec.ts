import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTileComponent } from './survey-tile.component';

describe('SurveyTileComponent', () => {
  let component: SurveyTileComponent;
  let fixture: ComponentFixture<SurveyTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
