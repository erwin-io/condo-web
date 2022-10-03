import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDetailsComponent } from './due-details.component';

describe('DueDetailsComponent', () => {
  let component: DueDetailsComponent;
  let fixture: ComponentFixture<DueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
