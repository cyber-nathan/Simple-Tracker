import { Component,inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { AllBudget, CategoryList, fixedExpenseList } from '../interface';
import { allBudgetValue } from '../db.data';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { NgIf } from '@angular/common';
import { MockApiService } from '../service/mock-api.service';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddFixedExpenseComponent } from '../add-fixed-expense/add-fixed-expense.component';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatDividerModule, MatIconModule, TableModule,MatDialogModule, NgIf, ToastModule, TagModule, DropdownModule, ButtonModule, InputTextModule, CommonModule, FormsModule, InputNumberModule],
  providers: [MessageService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryValue!: CategoryList[]
  allbudget?: AllBudget;  // This is another variable you may want to initialize
  fixedExpenseValue!: fixedExpenseList[]
  clonedFixedExpense: { [s: string]: fixedExpenseList } = {};
  afterExpense?: number;

  readonly dialog = inject(MatDialog);

  private mockapi: MockApiService = inject (MockApiService)
  constructor() {
    this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
      this.categoryValue = value.category
      this.fixedExpenseValue =value.fixedExpense
      this.allbudget = value
    });
  }

  onRowEditInit(fixedExpense: fixedExpenseList) {
    this.clonedFixedExpense[fixedExpense.id as number] = { ...fixedExpense };
    console.log(this.clonedFixedExpense)
}

onRowEditSave(fixedExpense: fixedExpenseList) {
    if (fixedExpense.spent > 0) {
        delete this.clonedFixedExpense[fixedExpense.id as number];
        console.log(fixedExpense)
        this.mockapi.updatingFixedExpense(fixedExpense)
        //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
}

onRowEditCancel(fixedExpense: fixedExpenseList, index: number) {
    this.fixedExpenseValue[index] = this.clonedFixedExpense[fixedExpense.id as number];
    delete this.clonedFixedExpense[fixedExpense.id as number];
    console.log(this.clonedFixedExpense)
}



  openAddCatDialog() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEditCatDialog(category: any) {
    const dialogRef = this.dialog.open(EditCategoryComponent,  {
      data: category
    });
    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

  openAddFixedExpenseDialog() {
    const dialogRef = this.dialog.open(AddFixedExpenseComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteCat(catId: number) {
    this.mockapi.deleteCat(catId)

  }
  
  deleteFixedExpense(fixedId: number) {
    this.mockapi.deleteFixedExpense(fixedId)

  }
  

  categoryContent: {id: number, title: string, total: number, spent: number, remaining: number,}[] = [

    {id: 1, title: 'Food', total: 300, spent: 100, remaining: 20.00},
    {id: 2, title: 'Transportation', total: 500, spent: 250,  remaining: 22.00},
    {id: 3, title: 'Bills', total: 1000, spent: 500,  remaining: 21.00},
    {id: 4, title: 'Rent', total: 1500, spent: 1000,  remaining: 23.00},
  ];
}
