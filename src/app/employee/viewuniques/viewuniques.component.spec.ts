import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewuniquesComponent } from './viewuniques.component';

describe('ViewuniquesComponent', () => {
  let component: ViewuniquesComponent;
  let fixture: ComponentFixture<ViewuniquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewuniquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewuniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
