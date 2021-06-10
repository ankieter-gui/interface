import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkActivatorComponent } from './link-activator.component';

describe('LinkActivatorComponent', () => {
  let component: LinkActivatorComponent;
  let fixture: ComponentFixture<LinkActivatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkActivatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkActivatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
