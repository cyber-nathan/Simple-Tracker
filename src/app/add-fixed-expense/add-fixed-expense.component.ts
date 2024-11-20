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
import { BudgetInfo, fixedExpenseList, FixedExpense} from '../interface';
import { BudgetService } from '../service/budget.service';
import { CategoryComponent } from '../category/category.component';
@Component({
  selector: 'app-add-fixed-expense',
  standalone: true,
  imports: [MatDialogModule, ButtonModule, InputTextModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, InputNumberModule, FloatLabelModule],
  templateUrl: './add-fixed-expense.component.html',
  styleUrl: './add-fixed-expense.component.css'
})
export class AddFixedExpenseComponent {
  private mockapi: MockApiService = inject (MockApiService)
  readonly dialogRef = inject(MatDialogRef<AddFixedExpenseComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  fixedexpense: FixedExpense[] = [];
  constructor(private budgetService: BudgetService){}



  title!: string
  cost!: number


  addFixedExpense() {
    //console.log("add category")
    this.fixedexpense = this.data.fixedExpense
    this.budgetService.addFixedExpense(this.data.id, {id: undefined, title: this.title, spent: this.cost}).subscribe({
      next: (addedFixedExpesnse) => {
        console.log('addFixedExpense:', addedFixedExpesnse);
        this.fixedexpense.push(addedFixedExpesnse); // Update the local categories list with id from backend
        this.budgetService.setFixedExpenseList(this.fixedexpense)
      },
      error: (error) => {
        console.error('Error adding fixed Expense:', error);
      }
    });
    //this.mockapi.addFixedExpense(this.title, this.cost)
    //allBudgetValue.category.push({id: allBudgetValue.category.length, title: this.title, total: parseFloat(this.totalAmount), spent: 0,  remaining:  parseFloat(this.totalAmount), transaction: []} );
    
  }
}
