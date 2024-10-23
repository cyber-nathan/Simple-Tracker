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
@Component({
  selector: 'app-add-fixed-expense',
  standalone: true,
  imports: [MatDialogModule, ButtonModule, InputTextModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, InputNumberModule, FloatLabelModule],
  templateUrl: './add-fixed-expense.component.html',
  styleUrl: './add-fixed-expense.component.css'
})
export class AddFixedExpenseComponent {
  private mockapi: MockApiService = inject (MockApiService)
  title!: string
  cost!: number

  addFixedExpense() {
    //console.log("add category")
    this.mockapi.addFixedExpense(this.title, this.cost)
    //allBudgetValue.category.push({id: allBudgetValue.category.length, title: this.title, total: parseFloat(this.totalAmount), spent: 0,  remaining:  parseFloat(this.totalAmount), transaction: []} );
    
  }
}
