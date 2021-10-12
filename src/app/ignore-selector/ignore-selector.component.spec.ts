import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IgnoreSelectorComponent} from './ignore-selector.component';

describe('IgnoreSelectorComponent', () => {
  let component: IgnoreSelectorComponent;
  let fixture: ComponentFixture<IgnoreSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IgnoreSelectorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoreSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
