import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComboboxComponent } from './user-search-combobox.component';

describe('UserSearchComboboxComponent', () => {
  let component: UserSearchComboboxComponent;
  let fixture: ComponentFixture<UserSearchComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSearchComboboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
