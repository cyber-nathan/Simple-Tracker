import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { AllBudget, BudgetInfo, Category, CategoryList, TransactionList, Transaction } from '../interface';
import { allBudgetValue } from '../db.data';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { MockApiService } from '../service/mock-api.service';
import { ButtonModule } from 'primeng/button';
import { BudgetService } from '../service/budget.service';


@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [TableModule, FormsModule, CommonModule,MatCardModule, MatListModule, MatIconModule, ListboxModule, DropdownModule, MatDialogModule, ButtonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {
  private mockapi: MockApiService = inject (MockApiService)
 // transactionValue = allBudgetValue[0].category[0].transaction;  // This contains the data from the DB (mock data)
  categoryValue = allBudgetValue.category;  // This contains the data from the DB (mock data)
  selectedCategory: any;// stores the data
  allbudget?: AllBudget;  // This is another variable you may want to initialize
  id!: number;

  // constructor() {
  //   this.mockapi.getBudgetData().subscribe((value: AllBudget) => { // what is subscribe
  //     this.categoryValue = value.category
  //   });
  // }

  categories: Category[] = []
  categoryBehave$ = this.budgetService.category$;
  budgetInfo: BudgetInfo | null = null 

  constructor(private budgetService: BudgetService){}

  ngOnInit(): void {
    this.budgetService.budget$.subscribe((budgetInfo) => {
      if (budgetInfo) {
        this.budgetInfo = budgetInfo
        this.budgetService.getCategoryList(budgetInfo.id).subscribe(catData => {
          this.categories = catData
          this.budgetService.setCategoryList(catData)
          console.log("this is categories in transaction ", this.categories[0].transactions)
        })

      }
    })
  }

    // Retrieve transactions based on the selected category
    // future task implement this in a more simple way
    get transactionValue() {
      if (this.selectedCategory) {
        return this.selectedCategory.transactions; // Display transactions for the selected category
      }
      
      // Display all transactions when no category is selected
      // Check if categoryBehave$ is emitting the latest categories
      let allTransactions: Transaction[] = [];
      
      this.categoryBehave$.subscribe((categories) => {
        allTransactions = categories.reduce((acc: Transaction[], category: Category) => {
          return acc.concat(category.transactions);
        }, []);
    
        // Sort transactions by date in descending order (most recent first)
        allTransactions = allTransactions.sort((a, b) => { // when adding transaciton it does not add in right order with most recent transaction at top
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      });
    
      return allTransactions;
    }

    deleteTransaction(transiId: number, catTitle: string, spent: number) {
      if(this.budgetInfo) {
        this.budgetService.getCategoryList(this.budgetInfo.id).subscribe(data => { 
          const category = data.find(cat => cat.title === catTitle);
          if (this.budgetInfo && category?.id) {
            this.budgetService.deleteTransaction(this.budgetInfo?.id, category?.id, transiId).subscribe({
              next: (removedTransaction) => {
                // Update the transactions array by filtering out the deleted transaction
                console.log("delete transaction", spent, category.spent, category.remaining)
                category.spent = category.spent - spent
                category.remaining = category.remaining + spent
                category.transactions = category.transactions.filter(transaction => transaction.id !== transiId);
        
            // Update the categories list with the modified category
            data = data.map(cat => 
              cat.id === category.id
                ? {
                    ...cat,
                    transactions: category.transactions, // Use the updated transactions array
                    spent: category.spent,
                    remaining: category.remaining,
                  }
                : cat
            );
        
                // Update the category list in the service
                this.budgetService.setCategoryList(data);
              },
              error: (error) => {
                console.error('Error deleting transaction:', error);
              }
            });
          }
    
       })
 
     }
     


    }

  readonly dialog = inject(MatDialog);

  openDialog() {
    if(this.budgetInfo) {
       this.budgetService.getCategoryList(this.budgetInfo.id).subscribe(data => { 
        const cat = data;
        const dialogRef = this.dialog.open(TransactionDialogComponent, {
          data: { id: this.budgetInfo?.id, category: cat }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      })

    }


  }


}
