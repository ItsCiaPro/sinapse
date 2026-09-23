import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHeader } from './patient-header';

describe('PatientHeader', () => {
  let component: PatientHeader;
  let fixture: ComponentFixture<PatientHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
