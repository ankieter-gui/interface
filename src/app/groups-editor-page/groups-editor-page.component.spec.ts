import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsEditorPageComponent } from './groups-editor-page.component';

describe('GroupsEditorPageComponent', () => {
  let component: GroupsEditorPageComponent;
  let fixture: ComponentFixture<GroupsEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsEditorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
