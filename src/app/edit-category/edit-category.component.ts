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
import { AllBudget } from '../interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule, MatButtonModule, InputTextModule, MatSelectModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  readonly dialogRef = inject(MatDialogRef<EditCategoryComponent>);
  categoryValue = allBudgetValue[0].category;  // This contains the data from the DB (mock data)
  allbudget?: AllBudget;  // This is another variable you may want to initialize

  editTitle!: string
  editTotal!: string
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}



  addEdit() {
    if (this.editTitle != undefined) {
      this.data.title = this.editTitle
      console.log("edit total", this.editTotal)
      
    }

    if (!isNaN(parseFloat(this.editTotal))) {
      this.data.remaining = this.data.remaining + (parseFloat(this.editTotal) - this.data.total)
      this.data.total = this.editTotal
    }

    console.log(this.data)

  }

  deleteCat(id: number) {
    this.categoryValue = this.categoryValue.filter(category => category.id !== id)
    this.dialogRef.close(this.categoryValue);
    console.log(this.categoryValue)
  }

}
