import { Injectable } from '@angular/core';
import { allBudgetValue } from '../db.data';
import { BehaviorSubject, find, Observable, of } from 'rxjs'
import { AllBudget, CategoryList, fixedExpenseList, TransactionList } from '../interface';
import { Subject, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MockApiService {
    private readonly BUDGET_KEY = 'user_budget';
  private readonly RESET_DATE_KEY = 'budget_reset_date';
  private readonly FREQUENCY_KEY = 'budget_frequency';
  counter = 2;
  subject = new BehaviorSubject<AllBudget>(allBudgetValue)
  currentData = this.subject.asObservable();
  constructor() { 
  }

  getBudgetData(): Observable<AllBudget> {

    return this.currentData
  }

  deleteCat(id: number) {
    let allBudget = this.subject.getValue();

    allBudget.category = allBudget.category.filter(category => category.id !== id)

    this.subject.next(allBudget)
  }

  addCat(catTitle: string, catTotal: number) { // change to number
    let allBudget = this.subject.getValue();
    allBudget.category.push({id: this.counter++, title: catTitle, total: catTotal, spent: 0,  remaining:  catTotal, transaction: []} );

    this.subject.next(allBudget)
  }

  editCat(id: number, title: string, total: number) {
    let allBudget = this.subject.getValue();
    let catItem = allBudget.category.find(category => category.id === id)
    if (catItem) {
      catItem.title = title
      catItem.remaining = catItem.remaining + ( +total - catItem.total)
      catItem.total = +total
  
    }

    this.subject.next(allBudget)

  }

  deleteTransaction(transId: number, catTitle: string, spent: number) {
    let allBudget = this.subject.getValue();
    let catItem = allBudget.category.find(cat => cat.title === catTitle) // find category based on title
        if (catItem) {
          console.log("Is a category")
          // Update the 'remaining' and 'spent' values
          catItem.remaining += spent; // Add the spent amount back to remaining
          catItem.spent -= spent;     // Subtract the spent amount from the total spent
          allBudgetValue.totalSpent = allBudgetValue.totalSpent + spent
          // allBudgetValue.totalBalance = allBudgetValue.totalBalance + spent
          // Filter the transactions to remove the one with the specified id
          catItem.transaction = catItem.transaction.filter(transaction => transaction.id !== transId);
        }
    this.subject.next(allBudget)
  }

  addTransaction(catTitle: string, date: string, description: string, spent: number) {
    let allBudget = this.subject.getValue();
    let catItem = allBudget.category.find(cat => cat.title === catTitle) // find category based on title
    console.log("this is cat", catTitle)
    if(catItem) { 
      console.log("in service add transaction is a category")
      catItem?.transaction.push({id: catItem?.transaction.length, date: date, description: description, spent: spent, transactionCategory: catTitle}) // push the new transaction to its respected cateogry array
      catItem.remaining = catItem.remaining - spent
      catItem.spent = +catItem.spent + +spent
      console.log(catItem.spent+1)
      allBudget.totalSpent = allBudget.totalSpent + spent
      // allBudget.totalBalance = allBudget.totalBalance - spent

    }
    this.subject.next(allBudget)
  }

  addFixedExpense(title: string, cost: number){
    let allBudget = this.subject.getValue();
    allBudget.fixedExpense.push({id: this.counter++, title: title, spent: cost } );
    allBudget.afterExpense = allBudget.afterExpense - cost

    this.subject.next(allBudget)

  }

  updatingFixedExpense(updatedFixedExpense: number, pastFixedExpense: number) { // function might not be needed
    let allBudget = this.subject.getValue();
    allBudget.afterExpense = allBudget.afterExpense + (pastFixedExpense - updatedFixedExpense)
    console.log("This is new fixed expense", allBudget.fixedExpense)
    this.subject.next(allBudget)
    
  }

  deleteFixedExpense(fixedId: number) {
    let allBudget = this.subject.getValue();
    let fixedExpenseItem = allBudget.fixedExpense.find(fixedExpense => fixedExpense.id === fixedId)
    if(fixedExpenseItem) {
      allBudget.afterExpense = allBudget.afterExpense + fixedExpenseItem?.spent
    }
    allBudget.fixedExpense = allBudget.fixedExpense.filter(fixedExpense => fixedExpense.id !== fixedId)

    this.subject.next(allBudget)
  }

  // resetBudget() {
  //   let allBudget = this.subject.getValue();
  //   allBudget.totalSpent = 0;
  //   console.log('same date change')
  //   for (let i =0; i < allBudget.category.length; i++ ) {
  //       allBudget.category[i].spent = 0;
  //       allBudget.category[i].remaining = allBudget.category[i].total; // adjust for rollover
  //   }
  //   this.subject.next(allBudget)
  // }

  //  // Check if budget should reset and reset if necessary
  //   checkAndResetBudget( currentDate: string): void {
  //     const today = new Date();
  
  //     if (today.getMonth() >= new Date(currentDate).getMonth()) {
        
  //       this.resetBudget();
  //      // this.updateNextResetDate();
  //     }
  //   }

  //  // Automatically trigger budget reset every 5 seconds for testing purposes
  //   startAutoReset(currentDate: string): void {
  //     setInterval(() => {
  //       this.checkAndResetBudget(currentDate);
  //     }, 1000); // Check every 1 second if reset is needed
  //   }
}
