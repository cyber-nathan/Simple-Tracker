import { Component, inject, Input, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CategoryComponent } from "../category/category.component";
import { TransactionHistoryComponent } from "../transaction-history/transaction-history.component";
import {MatCardModule} from '@angular/material/card';
import { AllBudget, CategoryList } from '../interface';
import { allBudgetValue } from '../db.data';
import { MockApiService } from '../service/mock-api.service';
import { CommonModule } from '@angular/common';
import { BudgetFirebaseSerice } from '../service/budgetFirebase.service';
import { BudgetService } from '../service/budget.service';


export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-main-display',
  standalone: true,
  imports: [MatGridListModule, CategoryComponent, TransactionHistoryComponent, MatCardModule, CommonModule],
  templateUrl: './main-display.component.html',
  styleUrl: './main-display.component.css'
})
export class MainDisplayComponent implements OnInit {

  budgetFirebaseService = inject(BudgetFirebaseSerice)
  private mockapi: MockApiService = inject (MockApiService)
  budgetService: BudgetService = inject(BudgetService)
  overallMoney!: AllBudget;  // This contains the data from the DB (mock data)
  //allbudget?: AllBudget;  // This is another variable you may want to initialize
  //categoryValue: CategoryList[]  = allBudgetValue.category;
  constructor() {
    this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
      
    });
  }

  ngOnInit(): void {
    this.budgetFirebaseService.getBudget().subscribe(budget => {
      this.budgetService.budgetSig.set(budget);
      this.overallMoney = budget
      console.log(budget)
      console.log("this is budget",this.budgetService.budgetSig())
    })
  }



}
