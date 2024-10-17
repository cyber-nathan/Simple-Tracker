import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { AllBudget, CategoryList, TransactionList } from '../interface';
import { allBudgetValue } from '../db.data';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';


@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [TableModule, FormsModule, CommonModule,MatCardModule, MatListModule, MatIconModule, ListboxModule, DropdownModule, MatDialogModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {

 // transactionValue = allBudgetValue[0].category[0].transaction;  // This contains the data from the DB (mock data)
  categoryValue = allBudgetValue[0].category;  // This contains the data from the DB (mock data)
  selectedCategory: any;// stores the data
  allbudget?: AllBudget;  // This is another variable you may want to initialize
  id!: number;

    // Retrieve transactions based on the selected category
  get transactionValue()  {
      if (this.selectedCategory) {
        return this.selectedCategory.transaction; // Display transactions for the selected category
      }
      // display all transaction when no category is selected
      const allTransactions = this.categoryValue.reduce((allTransactions: TransactionList[], category: CategoryList) => { // reduce method processes each element in array (CategoryList in this.categoryValue)
        return allTransactions.concat(category.transaction);
      }, []); // learn more

        // Sort transactions by date in descending order (most recent first)
    return allTransactions.sort((a, b) => {
    // Convert date strings to Date objects for comparison
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
 // displays most recent tranaction first
    }

    deleteTransaction(id: number, categoryTitle: string, spent: number) {
        const category = this.categoryValue.find(cat => cat.title === categoryTitle) // find category based on title
        if (category) {
          // Update the 'remaining' and 'spent' values
          category.remaining += spent; // Add the spent amount back to remaining
          category.spent -= spent;     // Subtract the spent amount from the total spent
          allBudgetValue[0].totalSpent = allBudgetValue[0].totalSpent + spent
          allBudgetValue[0].totalBalance = allBudgetValue[0].totalBalance + spent
          // Filter the transactions to remove the one with the specified id
          category.transaction = category.transaction.filter(transaction => transaction.id !== id);
        }



    }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(TransactionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  


    // TransactionContent: {id: number, date: string, desciption: string, category: string, spent: number, remaining: number}[] = [

  //   {id: 1, date: '2024-10-01', desciption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", category: "Food", spent: 50.00, remaining: 20.00},
  //   {id: 2, date: '2024-01-31', desciption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", category: "Food", spent: 55.00, remaining: 22.00},
  //   {id: 3, date: '2024-02-15', desciption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", category: "Persnal", spent: 52.50, remaining: 21.00},
  //   {id: 4, date: '2024-02-29', desciption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", category: "Bills", spent: 56.00, remaining: 23.00},
  //   {id: 5, date: '2024-03-15', desciption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", category: "Food", spent: 53.75, remaining: 21.50}
  // ];
}
