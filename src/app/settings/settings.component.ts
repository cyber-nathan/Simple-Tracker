import { Component, effect, inject, model, signal } from '@angular/core';
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

  userSettings: AllBudget  = allBudgetValue;  // This contains the data from the DB (mock data)
  categoryValue: CategoryList[]  = allBudgetValue.category;
  selectedCategory: any; // holds selected category
  allbudget?: AllBudget;  // This is another variable you may want to initialize


  budgetFirebaseService = inject(BudgetFirebaseSerice)
  budgetService: BudgetService = inject(BudgetService)

//   totalBalance: number = 0// setting the input value with value stored in firebase
//   salery: number = 0
//   payPeriod: string = 'Bi-weekly'
//   payReset: string =  'Bi-weekly'
//  // private mockapi: MockApiService = inject (MockApiService)
  
 budget: AllBudget | null = null
 budgetSig = this.budgetService.getBudgetSig()
 totalBalance = model(0)  // setting the input value with value stored in firebase
 salery  = model(0)
 payPeriod = model('Bi-weekly')
 payReset = model('Bi-weekly')
 constructor() {
  // this.budgetFirebaseService.getBudget().subscribe(budget => {
  //   this.budgetService.setBudget(budget[0]) // Set the fetched data
  //   console.log("settingComp budget = ", this.budgetService.getBudget())
  // });
  effect(()=> console.log("this is effect settingComp ", this.budgetService.budgetSig(), this.totalBalance()))
  // this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
     
   //});
 }

  // constructor() {


  //   // this.mockapi.getBudgetData().subscribe((value: AllBudget) => { 
  //   //   this.userSettings = value
  //   // });
  //  // console.log(this.data)
  // }






  ngOnInit() {
}

  saveSettings() {
    toObservable<AllBudget | null>(this.budgetSig).pipe(
      filter((value) => {return value != null}),
      exhaustMap((value) => 
         {
          if(value) {

            return this.budgetFirebaseService.saveSettings(value.id, this.totalBalance(), this.salery(), this.payPeriod(), this.payReset ()) 
          }
          return of('error')

         })

    ).subscribe()
    // if (this.totalBalance && this.salery && this.payPeriod && this.payReset && this.budgetSig()?.id) {
    //     let id = this.budgetSig()?.id


    //   this.budgetFirebaseService.saveSettings(id, this.totalBalance, this.salery, this.payPeriod, this.payReset)
    //     .then(() => {
    //       console.log('Settings saved successfully');
    //     })
    //     .catch((error) => {
    //       console.error('Error saving settings:', error);
    //     });
    // }
    //this.mockapi.saveSettings(this.totalBalance, this.salery, this.payPeriod, this.payReset)
  }

  // ngOnInit(): void {
  //   this.trackerReset(5000); // Reset after 5 seconds
  // }

  // trackerReset(resetAfterMs: number) {
  //   setInterval (() => {
  //     this.userSettings[0].totalSpent = 0.00
  //     this.categoryValue.forEach (category => {
  //       category.spent = 0.00;
  //       category.remaining = category.total
  //     });
  //   }, resetAfterMs);
  // }



}
