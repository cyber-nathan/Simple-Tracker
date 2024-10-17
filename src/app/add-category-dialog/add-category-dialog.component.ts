import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { allBudgetValue } from '../db.data';
@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [MatDialogModule, ButtonModule, InputTextModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {

  title: string ="";
  totalAmount: string=  "";
  


  addCategory() {
    console.log("add category")
    allBudgetValue[0].category.push({id: allBudgetValue[0].category.length, title: this.title, total: parseFloat(this.totalAmount), spent: 0,  remaining:  parseFloat(this.totalAmount), transaction: []} );
    
  }

}
