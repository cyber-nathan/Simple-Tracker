import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MainDisplayComponent } from "./main-display/main-display.component";
import { FormsModule } from '@angular/forms';
import { BudgetService } from './service/budget.service';
import { BudgetFirebaseSerice } from './service/budgetFirebase.service';
import { AllBudget } from './interface';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MainDisplayComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Expense-tracker';
  budgetFirebaseService = inject(BudgetFirebaseSerice)
  documentId = 'Z73bsjXo66aVCEoBTCSJ'
  budgetService: BudgetService = inject(BudgetService)

  constructor() {
// Fetch the budget data, then switch to fetching categories based on the budget ID
this.budgetFirebaseService.getBudget().pipe(
  switchMap(budget => {
    // Set budgetSig with the fetched budget data
    this.budgetService.budgetSig.set(budget[0]);
    console.log("AppComponent getbudget = ", this.budgetService.budgetSig());

    const budgetId = this.budgetService.budgetSig().id;
    if (budgetId) {
      // Use the budget ID to fetch categories
      //return this.budgetFirebaseService.getCategories(budgetId)
      console.log(budgetId)
      return forkJoin({
        categoriesList: this.budgetFirebaseService.getCategories(budgetId),
        fixedExpenseList: this.budgetFirebaseService.getFixedExpenses(budgetId)
      })
    } else {
      console.error("Budget ID is undefined");
      return of({ categoriesList: [], fixedExpenseList: [] }); // Return an empty array if there's no ID
    }
  })
).subscribe({
  next: (values) => {
    // Set categoriesSig with the fetched categories data
    console.log('test')
    this.budgetService.categoriesSig.set(values.categoriesList);
    console.log("AppComponent getcategories = ", this.budgetService.categoriesSig());
  }, 
  error: (err) => console.log('Error', err),
  complete: () => console.log('Completed')
});


    // console.log("AppComponent constructor")
    // this.budgetFirebaseService.getBudget().subscribe(budget => {
    //   this.budgetService.budgetSig.set(budget[0]) // Set the fetched data
    //   console.log("AppComponent getbudget = ", this.budgetService.budgetSig())
    //   //console.log("AppComponent getcategories = ", this.budgetService.categoriesSig())
    // });



    // console.log('this is id ', this.budgetService.budgetSig().id )
    // this.budgetFirebaseService.getCategories(this.budgetService.budgetSig().id).subscribe(categories => {
    //   this.budgetService.categoriesSig.set(categories)
    //   console.log("AppComponent getcategories = ", this.budgetService.categoriesSig())
    // })


  }


}
