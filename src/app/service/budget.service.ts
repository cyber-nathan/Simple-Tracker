import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, CategoryList } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgetSig: WritableSignal<AllBudget > = signal<AllBudget >({
    id: 'Crunching data',
    totalBalance: 0,
    afterExpense: 0,
    salery: 0,
    totalSpent: 0,
    payPeriod: 'Crunching data',
    payReset: 'Crunching data',
    fixedExpense: [],
    category: []
  })
 // cateogrySig = signal<CategoryList[] | null>(null)

  constructor() {
    console.log('budget service', Math.random())
  }

  // getBudgetSig() {
  //   return this.budgetSig
  // }

  // budget: AllBudget | null = null
  // cateogry:CategoryList[]  = []


}
