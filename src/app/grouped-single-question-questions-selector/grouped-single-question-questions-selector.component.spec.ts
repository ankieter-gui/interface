import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedSingleQuestionQuestionsSelectorComponent } from './grouped-single-question-questions-selector.component';

describe('GroupedSingleQuestionQuestionsSelectorComponent', () => {
  let component: GroupedSingleQuestionQuestionsSelectorComponent;
  let fixture: ComponentFixture<GroupedSingleQuestionQuestionsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupedSingleQuestionQuestionsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedSingleQuestionQuestionsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
