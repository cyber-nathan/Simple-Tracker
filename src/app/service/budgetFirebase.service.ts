import { inject, Injectable } from "@angular/core";
import { collection, collectionData, doc, docData, Firestore, updateDoc } from "@angular/fire/firestore";
import { Observable, tap } from "rxjs";
import { AllBudget, CategoryList } from "../interface";
import { BudgetService } from "./budget.service";

@Injectable({providedIn: 'root'})
export class BudgetFirebaseSerice {
    firestore = inject(Firestore);
    BudgetCollection = collection(this.firestore, 'Budget Info');
    budgetService: BudgetService = inject(BudgetService)
    getBudget(): Observable<AllBudget[]> { // gets the collection as array from firebase
        return collectionData(this.BudgetCollection, { idField: 'id' }) as Observable<AllBudget[]>;
      }
      
    //   getBudgetById(): Observable<AllBudget> {
    //     const budgetDocRef = doc(this.firestore, 'Budget Info', id); // Create a document reference
    //     return docData(budgetDocRef, { idField: 'id' }); // Fetch the document data
    // } 

  //   getCategories(budgetId: string): Observable<CategoryList[]> { // gets the categories which is an object inside budgetInfo in firebase
  //     const categoriesCollection = collection(doc(this.firestore, 'budget Info', budgetId), 'category');
  //     return collectionData(categoriesCollection) as Observable<CategoryList[]>;
  // }

    saveSettings(id: string, balance: number, salery: number, payPeriod: string, payReset: string): Promise<void> {
      const budgetDocRef = doc(this.firestore, 'Budget Info', id); // Create a document reference
console.log("reee")
      // Create an object with the updated data
      const updatedData = {
          totalBalance: balance,
          salery: salery,
          payPeriod: payPeriod,
          payReset: payReset,
      };
      console.log('updated settings data = ', updatedData)

      // Update the document with the new data
      return updateDoc(budgetDocRef, updatedData)
          .then(() => {
              console.log('Document successfully updated!');
          })
          .catch((error) => {
              console.error('Error updating document: ', error);
          });
  }

  addCategory() {

  }


}