import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleColorSelectorComponent } from './simple-color-selector.component';

describe('SimpleColorSelectorComponent', () => {
  let component: SimpleColorSelectorComponent;
  let fixture: ComponentFixture<SimpleColorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleColorSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleColorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
