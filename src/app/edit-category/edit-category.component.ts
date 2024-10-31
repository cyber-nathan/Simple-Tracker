import { Component, inject, Inject } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { allBudgetValue } from '../db.data';
import { AllBudget, CategoryList } from '../interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockApiService } from '../service/mock-api.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule, MatButtonModule, InputTextModule, MatSelectModule, InputNumberModule, FloatLabelModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  readonly dialogRef = inject(MatDialogRef<EditCategoryComponent>);
  readonly data = inject<CategoryList>(MAT_DIALOG_DATA);
  categoryValue = allBudgetValue.category;  // This contains the data from the DB (mock data)
  allbudget?: AllBudget;  // This is another variable you may want to initialize

  editTitle: string = this.data.title
  editTotal: number = this.data.total 
  private mockapi: MockApiService = inject (MockApiService)
  
  constructor() {
    this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
      this.categoryValue = value.category
    });
    console.log(this.data)
  }



  edit() { 
   // this.mockapi.editCat(this.data.id, this.editTitle, this.editTotal)

  }

  // deleteCat() {
  //   this.mockapi.deleteCat(this.data.id)

  // }

}
