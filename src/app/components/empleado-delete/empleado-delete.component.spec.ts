import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDeleteComponent } from './empleado-delete.component';

describe('EmpleadoDeleteComponent', () => {
  let component: EmpleadoDeleteComponent;
  let fixture: ComponentFixture<EmpleadoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
