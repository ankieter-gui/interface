import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorViewComponent } from './text-editor-view.component';

describe('TextEditorViewComponent', () => {
  let component: TextEditorViewComponent;
  let fixture: ComponentFixture<TextEditorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextEditorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
