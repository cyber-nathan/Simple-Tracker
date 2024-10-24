import { Component, inject, Input } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CategoryComponent } from "../category/category.component";
import { TransactionHistoryComponent } from "../transaction-history/transaction-history.component";
import {MatCardModule} from '@angular/material/card';
import { AllBudget, CategoryList } from '../interface';
import { allBudgetValue } from '../db.data';
import { MockApiService } from '../service/mock-api.service';
import { CommonModule } from '@angular/common';
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
export class MainDisplayComponent {
  // tiles: Tile[] = [
  //   {text: 'One', cols: 1, rows: 1},
  //   {text: 'Two', cols: 1, rows: 1 },
  //   {text: 'Three', cols: 1, rows: 1},
  //   {text: 'Four', cols: 1, rows: 1},
  //   {text: 'five', cols: 2, rows: 2},
  //   {text: 'six', cols: 2, rows: 2},
  // ];

  private mockapi: MockApiService = inject (MockApiService)
  overallMoney!: AllBudget;  // This contains the data from the DB (mock data)
  //allbudget?: AllBudget;  // This is another variable you may want to initialize
  //categoryValue: CategoryList[]  = allBudgetValue.category;
  constructor() {
    this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
      this.overallMoney = value
    });
  }

  // ngOnInit(): void {
  //   this.mockapi.startAutoReset('2024-10-24'); // Reset after 5 seconds
  // }

  // trackerReset(resetAfterMs: number) {
  //   setInterval (() => {
  //     this.overallMoney[0].totalSpent = 0.00
  //     this.categoryValue.forEach (category => {
  //       category.spent = 0.00;
  //       category.remaining = category.total
  //     });
  //   }, resetAfterMs);
  // }


}
