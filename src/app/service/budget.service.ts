import { Injectable, signal, WritableSignal } from '@angular/core';
import { AllBudget, BudgetInfo, Category, CategoryList, fixedExpenseList, FixedExpense, Transaction } from '../interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  //private baseUrl2 ='http://localhost:8080/api/v1/budget/1/category/4'

  private baseUrl = 'http://localhost:8080/api/v1/budget'
  private budgetSource = new BehaviorSubject<BudgetInfo |null>(null)
  private categorySource = new BehaviorSubject<Category[]>([])
  private fixedExpenseSource = new BehaviorSubject<FixedExpense[]>([])
  fixedExpense$ = this.fixedExpenseSource.asObservable()
  category$ = this.categorySource.asObservable()
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

  getFixedExpense(budgetId: number): Observable<FixedExpense[]> {
    return this.http.get<FixedExpense[]>(`${this.baseUrl}/${budgetId}/fixed_expense`)
  }
  
  getCategoryList(budgetId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/${budgetId}/category`)
    // .pipe(     
    //    tap((categories) => {
    //   console.log("serves", categories)
    //   this.categorySource.next(categories);
    // })
 // );
  }


  setCategoryList(data: Category[]) {
    this.categorySource.next(data)
  }

  setFixedExpenseList(data: FixedExpense[]) {
    this.fixedExpenseSource.next(data)
  }

  getTransactions(categoryId: number, budgetId: number ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/${budgetId}/category/${categoryId}/transaction`)
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

  addCategory(catData: Category, budgetId: number) {
    return this.http.post<Category>(`${this.baseUrl}/${budgetId}/category`, catData)

  }

  addFixedExpense(budgetId: number, fixedExpenseData: FixedExpense) {
    console.log("add fixed expense budget id: ", budgetId)
    return this.http.post<FixedExpense>(`${this.baseUrl}/${budgetId}/fixed_expense`, fixedExpenseData)
  }

  deleteFixedExpense(FixedExpenseId: number, budgetId: number) {
   // console.log("in serivce",  budgetId, FixedExpenseId)
    //console.log(`${this.baseUrl}/${budgetId}/fixed_expense/${FixedExpenseId}`)
    return this.http.delete(`${this.baseUrl}/${budgetId}/fixed_expense/${FixedExpenseId}`)
  }

  deleteCategory(catId: number, budgetId: number) {
    console.log("in serivce",  budgetId, catId)
    console.log(`${this.baseUrl}/${budgetId}/category/${catId}`)
    return this.http.delete(`${this.baseUrl}/${budgetId}/category/${catId}`)
  }

 editFixedExpense(budgetId: number, fixedExpenseDetails: FixedExpense) {
  return this.http.put<FixedExpense>(`${this.baseUrl}/${budgetId}/fixed_expense/${fixedExpenseDetails.id}`, fixedExpenseDetails)

 }

 editCategory(budgetId: number, categoryDetails: Category) {
  return this.http.put<Category>(`${this.baseUrl}/${budgetId}/category/${categoryDetails.id}`, categoryDetails)

 }

 addTransaction(budgetId: number, catId: number, tranaction: Transaction) {
  return this.http.post<Transaction>(`${this.baseUrl}/${budgetId}/category/${catId}`, tranaction)
 }
 
 deleteTransaction(budgetId:number, catId: number, transactionId: number) {
  return this.http.delete(`${this.baseUrl}/${budgetId}/category/${catId}/transaction/${transactionId}`)
 }



}
