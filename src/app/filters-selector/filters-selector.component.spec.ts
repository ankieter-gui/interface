import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersSelectorComponent } from './filters-selector.component';

describe('FiltersSelectorComponent', () => {
  let component: FiltersSelectorComponent;
  let fixture: ComponentFixture<FiltersSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
