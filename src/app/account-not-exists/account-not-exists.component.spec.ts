import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotExistsComponent } from './account-not-exists.component';

describe('AccountNotExistsComponent', () => {
  let component: AccountNotExistsComponent;
  let fixture: ComponentFixture<AccountNotExistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNotExistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNotExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
