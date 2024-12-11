import { Component, Inject, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { allBudgetValue } from '../db.data';
import { MockApiService } from '../service/mock-api.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BudgetInfo, fixedExpenseList, FixedExpense, Saving} from '../interface';
import { BudgetService } from '../service/budget.service';
import { CategoryComponent } from '../category/category.component';
@Component({
  selector: 'app-add-saving',
  standalone: true,
  imports: [MatDialogModule, ButtonModule, InputTextModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, InputNumberModule, FloatLabelModule],
  templateUrl: './add-saving.component.html',
  styleUrl: './add-saving.component.css'
})
export class AddSavingComponent {
  readonly dialogRef = inject(MatDialogRef<AddSavingComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  saving: Saving[] = [];
  //budgetInfo: BudgetInfo | null = null; 
  constructor(private budgetService: BudgetService){}



  title!: string
  amount!: number

  enableSave(): boolean {
    if(this.title && this.amount) {
      return false
    }
    return true
  }

  addSaving() {
    //console.log("add category")
    this.saving = this.data.saving
    const budgetInfo = this.data.budgetInfo; // Use a local constant
    if (budgetInfo) {
      this.budgetService.addSaving(this.data.budgetInfo.id, {id: undefined, title: this.title, amount: this.amount, saved: 0}).subscribe({
        next: (addedSaving) => {
          console.log('addSavings:', addedSaving);
         // budgetInfo.afterExpense = budgetInfo.afterExpense - this.cost
        //  const updateBudgetInfo: BudgetInfo = {...budgetInfo, afterExpense: budgetInfo.afterExpense}
          //this.budgetService.setBudgets(updateBudgetInfo)
          this.saving.push(addedSaving); // Update the local categories list with id from backend
          this.budgetService.setSavingList(this.saving)
        },
        error: (error) => {
          console.error('Error adding fixed Expense:', error);
        }
      });
    }

  }
}
