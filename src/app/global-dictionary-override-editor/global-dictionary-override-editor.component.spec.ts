import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GlobalDictionaryOverrideEditorComponent} from './global-dictionary-override-editor.component';

describe('GlobalDictionaryOverrideEditorComponent', () => {
  let component: GlobalDictionaryOverrideEditorComponent;
  let fixture: ComponentFixture<GlobalDictionaryOverrideEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalDictionaryOverrideEditorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDictionaryOverrideEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
