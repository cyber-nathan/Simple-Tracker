// import { inject, Injectable } from "@angular/core";
// import { collection, collectionData, doc, docData, Firestore, Transaction, updateDoc } from "@angular/fire/firestore";
// import { combineLatest, map, Observable, switchMap, tap } from "rxjs";
// import { AllBudget, CategoryList, fixedExpenseList, TransactionList } from "../interface";
// import { BudgetService } from "./budget.service";

// @Injectable({providedIn: 'root'})
// export class BudgetFirebaseSerice {
//     firestore = inject(Firestore);
//     budgetCollection = collection(this.firestore, 'Budget Info');
//     budgetService: BudgetService = inject(BudgetService)



//     getBudget(): Observable<AllBudget[]> { // gets the collection as array from firebase
//         return collectionData(this.budgetCollection, { idField: 'id' }) as Observable<AllBudget[]>;
//       }

//     getCategories(budgetId: string ): Observable<CategoryList[]> {
//       const categoryCollection = collection(this.firestore, `Budget Info/${budgetId}/category`);
//       return collectionData(categoryCollection, { idField: 'id' }) as Observable<CategoryList[]>;
//     }
//     getFixedExpenses(budgetId: string): Observable<fixedExpenseList[]> {
//       const fixedExpenseCollection = collection(this.firestore, `Budget Info/${budgetId}/fixedExpense`);
//       return collectionData(fixedExpenseCollection, {idField: 'id'}) as Observable<fixedExpenseList[]>
//     }
      

//     saveSettings(id: string, balance: number, salery: number, payPeriod: string, payReset: string): Promise<void> {
//       const budgetDocRef = doc(this.firestore, 'Budget Info', id); // Create a document reference
// console.log("reee")
//       // Create an object with the updated data
//       const updatedData = {
//           totalBalance: balance,
//           salery: salery,
//           payPeriod: payPeriod,
//           payReset: payReset,
//       };
//       console.log('updated settings data = ', updatedData)

//       // Update the document with the new data
//       return updateDoc(budgetDocRef, updatedData)
//           .then(() => {
//               console.log('Document successfully updated!');
//           })
//           .catch((error) => {
//               console.error('Error updating document: ', error);
//           });
//   }

//   addCategory() {

//   }


// }