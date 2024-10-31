import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, CategoryList } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgetSig: WritableSignal<AllBudget | null> = signal<AllBudget | null>(null)
  cateogrySig = signal<CategoryList[] | null>(null)

  constructor() {
    console.log('budget service', Math.random())
  }

  getBudgetSig() {
    return this.budgetSig
  }

  budget: AllBudget | null = null
  cateogry:CategoryList[]  = []

  getBudget() {
    return this.budget
  }

  setBudget(budget: AllBudget) {
    this.budget = budget
  }

}
