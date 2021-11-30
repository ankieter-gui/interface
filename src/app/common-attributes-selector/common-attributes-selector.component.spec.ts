import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAttributesSelectorComponent } from './common-attributes-selector.component';

describe('CommonAttributesSelectorComponent', () => {
  let component: CommonAttributesSelectorComponent;
  let fixture: ComponentFixture<CommonAttributesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonAttributesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAttributesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
