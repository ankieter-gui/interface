import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSidemenuComponent } from './global-sidemenu.component';

describe('GlobalSidemenuComponent', () => {
  let component: GlobalSidemenuComponent;
  let fixture: ComponentFixture<GlobalSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSidemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
