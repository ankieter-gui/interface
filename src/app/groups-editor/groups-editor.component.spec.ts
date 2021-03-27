import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsEditorComponent } from './groups-editor.component';

describe('GroupsEditorComponent', () => {
  let component: GroupsEditorComponent;
  let fixture: ComponentFixture<GroupsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
