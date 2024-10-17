import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { allBudgetValue } from '../db.data';
import { CategoryList, AllBudget } from '../interface';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  userSettings: AllBudget[]  = allBudgetValue;  // This contains the data from the DB (mock data)
  categoryValue: CategoryList[]  = allBudgetValue[0].category;
  selectedCategory: any; // holds selected category
  allbudget?: AllBudget;  // This is another variable you may want to initialize

  totalBalance!: string 
  salery!: string
  payPeriod!: string
  resetPeriod!: string

  saveSettings() {
    if (this.userSettings[0].totalBalance != 0 && this.userSettings[0].totalSpent != 0 ) { // change setting when already configured 
      this.userSettings[0].totalBalance = parseFloat(this.totalBalance)
      this.userSettings[0].salery = parseFloat(this.salery)
    }
    else {

      this.userSettings.push({id: this.userSettings.length-1, totalBalance: parseFloat(this.totalBalance), salery: parseFloat(this.salery), totalSpent: 0, payPeriod: this.payPeriod, payReset: this.resetPeriod, category: [] })
      console.log(this.userSettings)
    }
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
