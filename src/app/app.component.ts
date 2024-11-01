import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MainDisplayComponent } from "./main-display/main-display.component";
import { FormsModule } from '@angular/forms';
import { BudgetService } from './service/budget.service';
import { BudgetFirebaseSerice } from './service/budgetFirebase.service';
import { AllBudget } from './interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MainDisplayComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers: [BudgetService]
})
export class AppComponent implements OnInit {
  title = 'Expense-tracker';

  budgetFirebaseService = inject(BudgetFirebaseSerice)
  documentId = 'Z73bsjXo66aVCEoBTCSJ'
  // budgetService: BudgetService = inject(BudgetService)

  constructor(private budgetService: BudgetService) {
    this.budgetFirebaseService.getBudget().subscribe((budget: AllBudget[]) => {
      this.budgetService.budgetSig.set(budget[0]) // Set the fetched data
      console.log("AppComponent budget = ", this.budgetService.getBudget())
    });

    // this.mockapi.getBudgetData().subscribe((value: AllBudget) => { 
    //   this.userSettings = value
    // });
   // console.log(this.data)
  }

  ngOnInit(): void {
    // this.budgetFirebaseService.getBudget().subscribe(budget => {
    //   this.budgetService.setBudget(budget[0]);
    //   console.log("AppComponent budget = ", this.budgetService.getBudget());
    // });
  }

}
