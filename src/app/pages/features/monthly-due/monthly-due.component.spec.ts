import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDueComponent } from './monthly-due.component';

describe('MonthlyDueComponent', () => {
  let component: MonthlyDueComponent;
  let fixture: ComponentFixture<MonthlyDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
