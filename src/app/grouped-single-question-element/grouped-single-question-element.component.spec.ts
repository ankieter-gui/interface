import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedSingleQuestionElementComponent } from './grouped-single-question-element.component';

describe('GroupedSingleQuestionElementComponent', () => {
  let component: GroupedSingleQuestionElementComponent;
  let fixture: ComponentFixture<GroupedSingleQuestionElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupedSingleQuestionElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedSingleQuestionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
