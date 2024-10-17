import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { allBudgetValue } from '../db.data';
import { AllBudget, CategoryList } from '../interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [MatDialogModule, ButtonModule, InputTextModule, MatButtonModule, FormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, DropdownModule, CommonModule],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.css'
})
export class TransactionDialogComponent {
  categoryValue?: CategoryList[]  = allBudgetValue[0].category;  // This contains the data from the DB (mock data)
  selectedCategory: any; // holds selected category
  allbudget?: AllBudget;  // This is another variable you may want to initialize

  date: string = ""
  description: string = ""
  spent!: number;

  
  addTransaction(categoryTitle: string) {
   const category = this.categoryValue?.find(cat => cat.title === categoryTitle) // find category based on title
    if(category) { 
      category?.transaction.push({id: category?.transaction.length, date: this.date, description: this.description, spent: this.spent, transactionCategory: this.selectedCategory}) // push the new transaction to its respected cateogry array
      category.remaining = category.remaining - this.spent
      category.spent = +category.spent + +this.spent
      console.log(category.spent+1)
      allBudgetValue[0].totalSpent = allBudgetValue[0].totalSpent - this.spent
      allBudgetValue[0].totalBalance = allBudgetValue[0].totalBalance - this.spent

    }
  }



}
