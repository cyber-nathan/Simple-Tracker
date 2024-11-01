import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, CategoryList } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgetSig = signal<AllBudget | null>(null)
  cateogrySig = signal<CategoryList[] | null>(null)
  budget: AllBudget | null = null
  cateogry:CategoryList[]  = []

  constructor() {
    console.log('budget service', Math.random())
  }

  getBudgetSig() {
    return this.budgetSig
  }



  getBudget() {
    return this.budget
  }

  setBudget(budget: AllBudget) {
    this.budget = budget
  }

}
