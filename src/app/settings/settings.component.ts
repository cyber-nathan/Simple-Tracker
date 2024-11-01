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
import { BudgetFirebaseSerice } from '../service/budgetFirebase.service';
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

budgetFirebaseService = inject(BudgetFirebaseSerice)
constructor(private budgetService: BudgetService) {

  effect(()=> console.log("this is effect settingComp ", this.budgetService.budgetSig()))

 }
budgetLocalSig: WritableSignal<AllBudget> = this.budgetService.budgetSig 

budgetPropsSig: Signal<Partial <AllBudget>> = computed(() => {
    return {
      totalBalance: this.budgetLocalSig().totalBalance,
      salery: this.budgetLocalSig().salery,
      payPeriod: this.budgetLocalSig().payPeriod,
      payReset: this.budgetLocalSig().payReset

    }

})


  saveSettings() {
    this.budgetFirebaseService.saveSettings( this.budgetLocalSig().id, this.budgetLocalSig().totalBalance,  this.budgetLocalSig().salery,  this.budgetLocalSig().payPeriod,  this.budgetLocalSig().payReset) 


  }




}
