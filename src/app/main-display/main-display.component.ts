import { Component, computed, effect, inject, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CategoryComponent } from "../category/category.component";
import { TransactionHistoryComponent } from "../transaction-history/transaction-history.component";
import {MatCardModule} from '@angular/material/card';
import { AllBudget, BudgetInfo,  CategoryList } from '../interface';
import { allBudgetValue } from '../db.data';
import { MockApiService } from '../service/mock-api.service';
import { CommonModule } from '@angular/common';
//import { BudgetFirebaseSerice } from '../service/budgetFirebase.service';
import { BudgetService } from '../service/budget.service';
import { HttpClientModule } from '@angular/common/http';


export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-main-display',
  standalone: true,
  imports: [MatGridListModule, CategoryComponent, TransactionHistoryComponent, MatCardModule, CommonModule, HttpClientModule ],
  templateUrl: './main-display.component.html',
  styleUrl: './main-display.component.css'
})
export class MainDisplayComponent  implements OnInit{
  
  budgetInfo: BudgetInfo[] = []

  constructor(private budgetService: BudgetService){}
  ngOnInit(): void {
    this.getBudgets()
  }

  private getBudgets() {
    this.budgetService.getBudgets().subscribe(data => {
      this.budgetInfo = data
      console.log(data)
    })
  }
  



}
