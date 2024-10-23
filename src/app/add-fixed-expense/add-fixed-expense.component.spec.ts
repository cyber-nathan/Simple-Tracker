import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixedExpenseComponent } from './add-fixed-expense.component';

describe('AddFixedExpenseComponent', () => {
  let component: AddFixedExpenseComponent;
  let fixture: ComponentFixture<AddFixedExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFixedExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFixedExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
