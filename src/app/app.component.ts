import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MainDisplayComponent } from "./main-display/main-display.component";
import { FormsModule } from '@angular/forms';
import { BudgetService } from './service/budget.service';
//import { BudgetFirebaseSerice } from './service/budgetFirebase.service';
import { AllBudget } from './interface';
import { catchError, concatMap, forkJoin, of, switchMap, take, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MainDisplayComponent, FormsModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Expense-tracker';
  //budgetFirebaseService = inject(BudgetFirebaseSerice)
  documentId = 'Z73bsjXo66aVCEoBTCSJ'
  budgetService: BudgetService = inject(BudgetService)




}
