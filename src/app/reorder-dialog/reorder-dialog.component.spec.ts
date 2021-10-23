import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReorderDialogComponent} from './reorder-dialog.component';

describe('ReorderDialogComponent', () => {
  let component: ReorderDialogComponent;
  let fixture: ComponentFixture<ReorderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReorderDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
