import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, CategoryList, fixedExpenseList } from '../interface';

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
 categoriesSig = signal<CategoryList[]>([]);
 fixedExpenseSig = signal<fixedExpenseList[]>([]);

  constructor() {
    console.log('budget service', Math.random())
  }



}
