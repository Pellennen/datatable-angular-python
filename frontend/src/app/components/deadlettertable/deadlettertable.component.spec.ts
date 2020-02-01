import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlettertableComponent } from './deadlettertable.component';

describe('DeadlettertableComponent', () => {
  let component: DeadlettertableComponent;
  let fixture: ComponentFixture<DeadlettertableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadlettertableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadlettertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
