import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEditorViewComponent } from './chart-editor-view.component';

describe('ChartEditorViewComponent', () => {
  let component: ChartEditorViewComponent;
  let fixture: ComponentFixture<ChartEditorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartEditorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
