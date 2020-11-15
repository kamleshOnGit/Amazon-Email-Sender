import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueKeysComponent } from './unique-keys.component';

describe('UniqueKeysComponent', () => {
  let component: UniqueKeysComponent;
  let fixture: ComponentFixture<UniqueKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
