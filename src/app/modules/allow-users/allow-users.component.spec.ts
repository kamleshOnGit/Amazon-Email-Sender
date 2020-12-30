import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowUsersComponent } from './allow-users.component';

describe('AllowUsersComponent', () => {
  let component: AllowUsersComponent;
  let fixture: ComponentFixture<AllowUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
