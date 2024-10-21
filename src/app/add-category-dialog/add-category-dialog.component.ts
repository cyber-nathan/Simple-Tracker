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
  


  addCategory() {
    console.log("add category")
    this.mockapi.addCat(this.title, this.totalAmount)
    //allBudgetValue.category.push({id: allBudgetValue.category.length, title: this.title, total: parseFloat(this.totalAmount), spent: 0,  remaining:  parseFloat(this.totalAmount), transaction: []} );
    
  }

}
