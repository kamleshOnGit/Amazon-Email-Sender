import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualOrderProcessingComponent } from './manual-order-processing.component';

describe('ManualOrderProcessingComponent', () => {
  let component: ManualOrderProcessingComponent;
  let fixture: ComponentFixture<ManualOrderProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualOrderProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualOrderProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
