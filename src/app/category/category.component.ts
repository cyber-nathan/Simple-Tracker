import { Component,effect,inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { AllBudget, BudgetInfo, Category, CategoryList, fixedExpenseList, FixedExpense } from '../interface';
import { allBudgetValue } from '../db.data';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { NgIf } from '@angular/common';
import { MockApiService } from '../service/mock-api.service';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddFixedExpenseComponent } from '../add-fixed-expense/add-fixed-expense.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { BudgetService } from '../service/budget.service';
import { forkJoin, switchMap } from 'rxjs';
//import { BudgetFirebaseSerice } from '../service/budgetFirebase.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatDividerModule, MatIconModule, TableModule,MatDialogModule, NgIf, ToastModule, TagModule, DropdownModule, ButtonModule, InputTextModule, CommonModule, FormsModule, InputNumberModule],
  providers: [MessageService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  // categoryValue!: CategoryList[]
  // allbudget?: AllBudget;  // This is another variable you may want to initialize
  fixedExpenseValue!: fixedExpenseList[]
  clonedFixedExpense: { [s: string]: fixedExpenseList } = {};
  afterExpense?: number;

  readonly dialog = inject(MatDialog);

  //private mockapi: MockApiService = inject (MockApiService)
  
  fixedexpense: FixedExpense[] = [];
  categories: Category[] = [];
  fixedExpenseBehave$ = this.budgetService.fixedExpense$
  categoryBehave$ = this.budgetService.category$;
  budgetInfo: BudgetInfo | null = null; 

  constructor(private budgetService: BudgetService){}

ngOnInit(): void {
    // Subscribe to budget$
    this.budgetService.budget$
      .pipe(
        switchMap((budgetInfo) => {
          this.budgetInfo = budgetInfo;
          this.afterExpense = budgetInfo?.afterExpense;

          if (budgetInfo) {
            // Use forkJoin to combine fixed expenses and categories calls
            return forkJoin({
              fixedExpense: this.budgetService.getFixedExpense(budgetInfo.id),
              categories: this.budgetService.getCategoryList(budgetInfo.id),
            });
          }

          // Return an empty observable if no budget info is available
          return forkJoin({ fixedExpense: [], categories: [] });
        })
      )
      .subscribe({
        next: ({ fixedExpense, categories }) => {
          this.fixedexpense = fixedExpense;
          this.budgetService.setFixedExpenseList(fixedExpense)
          this.categories = categories
          this.budgetService.setCategoryList(categories)
          console.log("Fixed Expenses: ", this.fixedexpense);
          //console.log("Categories: ", this.categories);
        },
        error: (err) => {
          console.error("Error loading budget data:", err);
        },
      });
  }


  onRowEditInit(fixedExpense: fixedExpenseList) {
    this.clonedFixedExpense[fixedExpense.id ] = { ...fixedExpense };
    console.log(this.clonedFixedExpense)
}

onRowEditSave(fixedExpense: fixedExpenseList) {
    if (fixedExpense.spent > 0) {
      console.log("clone", this.clonedFixedExpense[fixedExpense.id ].spent)
    //  this.mockapi.updatingFixedExpense(fixedExpense.spent, this.clonedFixedExpense[fixedExpense.id ].spent)
        delete this.clonedFixedExpense[fixedExpense.id ];
        console.log(fixedExpense)
        
        //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
}

onRowEditCancel(fixedExpense: fixedExpenseList, index: number) {
    this.fixedExpenseValue[index] = this.clonedFixedExpense[fixedExpense.id ];
    delete this.clonedFixedExpense[fixedExpense.id ];
    console.log(this.clonedFixedExpense)
}



  openAddCatDialog() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEditCatDialog(category: any) {
    const dialogRef = this.dialog.open(EditCategoryComponent,  {
      data: category
    });
    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

  openAddFixedExpenseDialog() {
    const dialogRef = this.dialog.open(AddFixedExpenseComponent, {
      data: { id: this.budgetInfo?.id, fixedExpense: this.fixedexpense  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteCat(catId: number) {
    //console.log("testing", this.budgetInfo)

    if(this.budgetInfo) {
      this.budgetService.deleteCategory(catId, this.budgetInfo.id).subscribe({
        next: (val) => {
          console.log('::deleteCat next',val)
          this.categories = this.categories.filter(category => category.id !== catId)
          console.log("this is removed categories", this.categories)
          this.budgetService.setCategoryList(this.categories)
        },
        error:(error) => {
          console.log("::deleteCat error", error)
        }
      })


    }

  }
  
  deleteFixedExpense(fixedId: number) {
   // this.mockapi.deleteFixedExpense(fixedId)
   if(this.budgetInfo) {
    this.budgetService.deleteFixedExpense(fixedId, this.budgetInfo.id).subscribe({
      next: (val) => {
        this.fixedexpense = this.fixedexpense.filter(fixedExpense => fixedExpense.id !== fixedId)
        console.log("this is removed categories", this.fixedexpense)
        this.budgetService.setFixedExpenseList(this.fixedexpense)
      },
      error:(error) => {
        console.log("::deleteFixed expense error", error)
      }
    })


  }

  }
  

  categoryContent: {id: number, title: string, total: number, spent: number, remaining: number,}[] = [

    {id: 1, title: 'Food', total: 300, spent: 100, remaining: 20.00},
    {id: 2, title: 'Transportation', total: 500, spent: 250,  remaining: 22.00},
    {id: 3, title: 'Bills', total: 1000, spent: 500,  remaining: 21.00},
    {id: 4, title: 'Rent', total: 1500, spent: 1000,  remaining: 23.00},
  ];
}
