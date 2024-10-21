import { Component,inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { AllBudget, CategoryList } from '../interface';
import { allBudgetValue } from '../db.data';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { NgIf } from '@angular/common';
import { MockApiService } from '../service/mock-api.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatDividerModule, MatIconModule, TableModule,MatDialogModule, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categoryValue!: CategoryList[]
  allbudget?: AllBudget;  // This is another variable you may want to initialize


  readonly dialog = inject(MatDialog);

  private mockapi: MockApiService = inject (MockApiService)
  constructor() {
    this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
      this.categoryValue = value.category
    });
  }

  openDialog() {
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
  

  categoryContent: {id: number, title: string, total: number, spent: number, remaining: number,}[] = [

    {id: 1, title: 'Food', total: 300, spent: 100, remaining: 20.00},
    {id: 2, title: 'Transportation', total: 500, spent: 250,  remaining: 22.00},
    {id: 3, title: 'Bills', total: 1000, spent: 500,  remaining: 21.00},
    {id: 4, title: 'Rent', total: 1500, spent: 1000,  remaining: 23.00},
  ];
}
