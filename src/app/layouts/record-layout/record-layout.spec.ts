import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordLayout } from './record-layout';

describe('RecordLayout', () => {
  let component: RecordLayout;
  let fixture: ComponentFixture<RecordLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
