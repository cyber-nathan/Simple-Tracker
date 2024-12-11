import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingComponent } from './add-saving.component';

describe('AddSavingComponent', () => {
  let component: AddSavingComponent;
  let fixture: ComponentFixture<AddSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSavingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
