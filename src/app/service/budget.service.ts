import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, BudgetInfo, CategoryList, fixedExpenseList } from '../interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/api/v1/budgets'

   constructor(private http: HttpClient) { }

  getBudgets(): Observable<BudgetInfo[]> {
    return this.http.get<BudgetInfo[]>(this.baseUrl)
  }



}
