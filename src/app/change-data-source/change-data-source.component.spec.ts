import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDataSourceComponent } from './change-data-source.component';

describe('ChangeDataSourceComponent', () => {
  let component: ChangeDataSourceComponent;
  let fixture: ComponentFixture<ChangeDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDataSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
