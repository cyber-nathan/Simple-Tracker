import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { allBudgetValue } from '../db.data';
import { AllBudget, BudgetInfo, Category, CategoryList, Transaction } from '../interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MockApiService } from '../service/mock-api.service';
import { BudgetService } from '../service/budget.service';
@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [MatDialogModule, ButtonModule, InputTextModule, MatButtonModule, FormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, DropdownModule, CommonModule, InputNumberModule, FloatLabelModule],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.css'
})
export class TransactionDialogComponent {
  private mockapi: MockApiService = inject (MockApiService)
  readonly dialogRef = inject(MatDialogRef<TransactionDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  categories: Category[] = this.data.category
  budgetInfo: BudgetInfo | null = null 
  selectedCategory: any; // holds selected category
  allbudget?: AllBudget;  // This is another variable you may want to initialize



  
  date: string = ""
  description: string = ""
  spent!: number;

  categoryBehave$ = this.budgetService.category$;

  constructor(private budgetService: BudgetService){}
  
  addTransaction(categoryTitle: string) {
    console.log("this is category for adding transaction", this.categories)
    const category = this.categories?.find(cat => cat.title === categoryTitle)
    console.log("this is category for adding transaction", category)
    const newTransaction: Transaction = {
      id: undefined,
      date: this.date,
      description: this.description,
      spent: this.spent,
      transactionCategory: categoryTitle
    }
    if (category?.id) {
      console.log("this is category for adding transaction", this.data.id)
      this.budgetService.addTransaction(this.data.id, category.id, newTransaction ).subscribe({
        next: (addedTransaction) => {
          console.log("this is new added Transaction", addedTransaction )
          category?.transactions.push(newTransaction) 
          category.spent = newTransaction.spent
          category.remaining = category.remaining - newTransaction.spent
          this.categories.map(cat => cat.id === category.id ? { ...cat, Transactions: [category?.transactions], spent:  category.spent, remaining: category.remaining } : cat);
          this.budgetService.setCategoryList(this.categories)
        },
        error: (error) => {
          console.error('Error adding Transaction:', error);
        }
      });
    }



  }



}
