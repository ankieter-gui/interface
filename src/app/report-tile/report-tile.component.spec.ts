import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTileComponent } from './report-tile.component';

describe('ReportTileComponent', () => {
  let component: ReportTileComponent;
  let fixture: ComponentFixture<ReportTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
