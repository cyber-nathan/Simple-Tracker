import { Component, computed, effect, inject, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
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
export class MainDisplayComponent {

  budgetFirebaseService = inject(BudgetFirebaseSerice)
  budgetService: BudgetService = inject(BudgetService)

  budgetLocalSig: WritableSignal<AllBudget> = this.budgetService.budgetSig 
  budgetPropsSig: Signal<Partial <AllBudget>> = computed(() => {
      return {
        totalBalance: this.budgetLocalSig().totalBalance,
        salery: this.budgetLocalSig().salery,
        totalSpent: this.budgetLocalSig().totalSpent,
        payPeriod: this.budgetLocalSig().payPeriod

      }

  })
   constructor() {
    console.log('maindisplay Constructor')
     
     effect(()=> console.log("this is effect maindisplayComp", this.budgetService.budgetSig().category))

   // this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
      
    //});
  }

  // ngOnInit(): void {
  //   this.budgetFirebaseService.getBudget().subscribe((budget: AllBudget[]) => {
  //     console.log(budget)
  //     this.budgetService.budgetSig.set(budget[0]);
  //     console.log("this is budget",this.budgetService.budgetSig()?.salery)
  //   })
  // }
  

   

  // ngOnInit(): void {
  //   const documentId = 'Z73bsjXo66aVCEoBTCSJ'; // Replace with your actual document ID
  //   this.budgetFirebaseService.getBudget().subscribe(budget => {
  //     this.budgetService.budgetSig.set(budget[0]); // Set the fetched data
  //     console.log("this is budget",this.budgetService.budgetSig())
  //   });
  // }



}
