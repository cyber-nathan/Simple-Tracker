import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, BudgetInfo, Categories, CategoryList, fixedExpenseList, FixedExpenses, Transactions } from '../interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  //private baseUrl2 ='http://localhost:8080/api/v1/budget/1/category/4'

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

  getFixedExpense(budgetId: number): Observable<FixedExpenses[]> {
    return this.http.get<FixedExpenses[]>(`${this.baseUrl}/${budgetId}/fixed_expense`)
  }
  
  getCategoreis(budgetId: number): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.baseUrl}/${budgetId}/category`)
  }

  getTransactions(categoryId: number, budgetId: number ): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.baseUrl}/${budgetId}/category/${categoryId}/transaction`)
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

  addCategory(catData: Categories, budgetId: number) {
    return this.http.post<Categories>(`${this.baseUrl}/${budgetId}/category`, catData)
  }

  deleteCategory(catId: number, budgetId: number) {
    console.log("in serivce",  budgetId, catId)
    console.log(`${this.baseUrl}/${budgetId}/category/${catId}`)
    return this.http.delete(`${this.baseUrl}/${budgetId}/category/${catId}`)
  }

  // dummyDelete() {
  //   console.log(";;dummyDelete")
  //   console.log("dummy", this.baseUrl2)
  //   return this.http.delete(`${this.baseUrl2}`,  {responseType: 'text'})
  // }



}
