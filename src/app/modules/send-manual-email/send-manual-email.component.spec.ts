import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendManualEmailComponent } from './send-manual-email.component';

describe('SendManualEmailComponent', () => {
  let component: SendManualEmailComponent;
  let fixture: ComponentFixture<SendManualEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendManualEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendManualEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
