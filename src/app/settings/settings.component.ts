import { Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { allBudgetValue } from '../db.data';
import { CategoryList, AllBudget } from '../interface';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { MockApiService } from '../service/mock-api.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButtonModule, InputNumberModule, FloatLabelModule, DropdownModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  payPeriods: string[] = ['Daily','Weekly', 'Bi-weekly', 'Monthly']
  payResets: string[] = ['Daily','Weekly', 'Bi-weekly', 'Monthly']
  userSettings: AllBudget  = allBudgetValue;  // This contains the data from the DB (mock data)
  categoryValue: CategoryList[]  = allBudgetValue.category;
  selectedCategory: any; // holds selected category
  allbudget?: AllBudget;  // This is another variable you may want to initialize

  private mockapi: MockApiService = inject (MockApiService)
  
  constructor() {
    this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
      this.userSettings = value
    });
   // console.log(this.data)
  }

  totalBalance: number = this.userSettings.totalBalance
  salery: number = this.userSettings.salery
  payPeriod: string = this.userSettings.payPeriod
  payReset: string =  this.userSettings.payReset





  ngOnInit() {
}

  saveSettings() {
    this.mockapi.saveSettings(this.totalBalance, this.salery, this.payPeriod, this.payReset)
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
