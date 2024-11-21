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
  clonedFixedExpense: { [s: string]: FixedExpense } = {};
  afterExpense?: number;

  readonly dialog = inject(MatDialog);

  
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


  onRowEditInit(fixedExpense: FixedExpense) {
    if(fixedExpense.id){

      this.clonedFixedExpense[fixedExpense.id] = { ...fixedExpense };
      console.log(this.clonedFixedExpense)
    }
}

onRowEditSave(fixedExpense: FixedExpense) {
    if (fixedExpense.spent > 0 && fixedExpense.id && this.budgetInfo) {
      console.log("this is edit save", fixedExpense)
      console.log("clone", this.clonedFixedExpense[fixedExpense.id ].spent)
      this.budgetService.editFixedExpense(this.budgetInfo.id, fixedExpense).subscribe({
        next: (editFixedExpesnse) => {
          const indexToReplace = this.fixedexpense.findIndex(fixedexp => fixedexp.id === fixedExpense.id);
          this.fixedexpense.splice(indexToReplace, 1, editFixedExpesnse); // Update the local categories list with id from backend
          this.budgetService.setFixedExpenseList(this.fixedexpense)
        },
        error: (error) => {
          console.error('Error adding fixed Expense:', error);
        }
      });
   
        delete this.clonedFixedExpense[fixedExpense.id ];
      
    } else {
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
}

onRowEditCancel(fixedExpense: FixedExpense, index: number) {
  if(fixedExpense.id) {

    this.fixedexpense[index] = this.clonedFixedExpense[fixedExpense.id ];
    delete this.clonedFixedExpense[fixedExpense.id ];
    console.log(this.clonedFixedExpense)
  }
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
  
}
