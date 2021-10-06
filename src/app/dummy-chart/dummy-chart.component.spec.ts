import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DummyChartComponent} from './dummy-chart.component';

describe('DummyChartComponent', () => {
  let component: DummyChartComponent;
  let fixture: ComponentFixture<DummyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DummyChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
