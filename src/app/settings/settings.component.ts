import { Component, computed, effect, inject, model, Signal, signal, WritableSignal } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { allBudgetValue } from '../db.data';
import { CategoryList, AllBudget, BudgetInfo } from '../interface';
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
  readonly dialog = inject(MatDialog);
  payPeriods: string[] = ['Daily','Weekly', 'bi-weekly', 'Monthly']
  payResets: string[] = ['Daily','Weekly', 'bi-weekly', 'Monthly']
  
  totalBalance = 0;
  salary  = 0;
  payPeriod= 'empty';
  payReset =  'empty';
 // budgetService: BudgetService = inject(BudgetService)

  budgetInfo: BudgetInfo | null = null 

  constructor(private budgetService: BudgetService){}
  ngOnInit(): void {
    this.budgetService.budget$.subscribe((budgetInfo) => {
      if (budgetInfo) {

        this.totalBalance = budgetInfo.totalBalance;
        this.salary  = budgetInfo.salary
        this.payPeriod= budgetInfo.payPeriod;
        this.payReset =  budgetInfo.payReset;
        this.budgetInfo = budgetInfo;
      }
    })
  }

  // private getBudgets() {
  //   this.budgetService.getBudgets().subscribe(data => {
  //     this.budgetInfo = data
  //     console.log('this is in settings', data)
  //   })
  // }
  





  saveSettings() {
    if(this.budgetInfo) {

      const updateBudgetInfo: BudgetInfo = {...this.budgetInfo, totalBalance: this.totalBalance, salary: this.salary, payPeriod: this.payPeriod, payReset: this.payReset}
    this.budgetService.updateBudgetInfo(updateBudgetInfo).subscribe({
      next: (data: BudgetInfo ) => {
        console.log("saved and closed")
        this.budgetService.setBudgets(data)
        this.dialog.closeAll()
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
   
    } 



  }




}
