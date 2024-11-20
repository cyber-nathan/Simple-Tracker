import { Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
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
import { BudgetService } from '../service/budget.service';
import { Category } from '../interface';
@Component({

  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [MatDialogModule, ButtonModule, InputTextModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, InputNumberModule, FloatLabelModule],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {
  private mockapi: MockApiService = inject (MockApiService)
  title!: string
  totalAmount!: number
  budgetId = 0
  categories: Category[] = []
  constructor(private budgetService: BudgetService){}
  ngOnInit(): void {
    this.budgetService.budget$.subscribe((budgetInfo) => {
      if (budgetInfo) {
       this.budgetId = budgetInfo.id
       this.budgetService.getCategoryList(budgetInfo.id).subscribe(catData => {
        this.categories = catData
      })
      }
    })
  }

  addCategory() {
    if (this.budgetId && this.title && this.totalAmount) {
      const newCategory: Category = {
        id: undefined, // Placeholder, backend will assign the real id
        title: this.title,
        total: this.totalAmount,
        spent: 0, // Initial spent amount is 0
        remaining: this.totalAmount, // Initial remaining is equal to total
        transactions: [] // Start with an empty transactions array
      };
  
      // Send request to backend, expecting the complete category object with id in response
      this.budgetService.addCategory(newCategory, this.budgetId).subscribe({
        next: (addedCategory) => {
          console.log('Category added:', addedCategory);
          this.categories.push(addedCategory); // Update the local categories list with id from backend
          this.budgetService.setCategoryList(this.categories)
        },
        error: (error) => {
          console.error('Error adding category:', error);
        }
      });
    }
  }

}
