import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateDialogBoxComponent } from './email-template-dialog-box.component';

describe('EmailTemplateDialogBoxComponent', () => {
  let component: EmailTemplateDialogBoxComponent;
  let fixture: ComponentFixture<EmailTemplateDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplateDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplateDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
