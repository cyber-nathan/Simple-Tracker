import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, BudgetInfo, CategoryList, fixedExpenseList } from '../interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/api/v1/budget'
  private budgetSource = new BehaviorSubject<BudgetInfo |null>(null)
  budget$ = this.budgetSource.asObservable(); // Expose the budget data as an observable

   constructor(private http: HttpClient) { }

  // Method to fetch budget data and update the BehaviorSubject
  getBudgets(): Observable<BudgetInfo> {
    return this.http.get<BudgetInfo>(this.baseUrl).pipe(
      // Once the data is fetched, update the BehaviorSubject
      tap((budgets) => {
        console.log("serves", budgets)
        this.budgetSource.next(budgets);
      })
    );
  }

  setBudgets(data: BudgetInfo){
    this.budgetSource.next(data)
  }

    // // Method to get the current value of the budget data
    // getCurrentBudgetData(): BudgetInfo[] {
    //   return this.budgetSource.getValue();
    // }

  updateBudgetInfo(data: BudgetInfo) {
    return this.http.put<BudgetInfo>(this.baseUrl + "/"+ data.id, data).pipe(
      // Once the data is fetched, update the BehaviorSubject
      tap((budgets) => {
        this.budgetSource.next(budgets);
      })
    );

  }



}
