import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ColorsAndOrderSelectorComponent} from './colors-and-order-selector.component';

describe('ColorsAndOrderSelectorComponent', () => {
  let component: ColorsAndOrderSelectorComponent;
  let fixture: ComponentFixture<ColorsAndOrderSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorsAndOrderSelectorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsAndOrderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
