import { Injectable, signal } from '@angular/core';
import { AllBudget } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgetSig = signal<AllBudget | null>(null)
  constructor() { }
}
