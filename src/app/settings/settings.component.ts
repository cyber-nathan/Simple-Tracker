import { Component, computed, effect, inject, model, Signal, signal, WritableSignal } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { allBudgetValue } from '../db.data';
import { CategoryList, AllBudget } from '../interface';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { MockApiService } from '../service/mock-api.service';
//import { BudgetFirebaseSerice } from '../service/budgetFirebase.service';
import { BudgetService } from '../service/budget.service';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { exhaustMap, filter, of, tap, timer } from 'rxjs';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButtonModule, InputNumberModule, FloatLabelModule, DropdownModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  payPeriods: string[] = ['Daily','Weekly', 'Bi-weekly', 'Monthly']
  payResets: string[] = ['Daily','Weekly', 'Bi-weekly', 'Monthly']
  
  totalBalance = 0;
  salary  = 0;
  payPeriod= 'empty';
  payReset =  'empty';
  budgetService: BudgetService = inject(BudgetService)
  budgets: AllBudget[] = []

  // ngOnInit(): void {
  //   this.budgetService.getBudgets().subscribe((data) => {
  //     this.budgets = data;
  //     //console.log('mysql = ', this.budgets)
  //   })
  // }


  saveSettings() {
   


  }




}
