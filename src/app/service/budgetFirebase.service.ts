import { inject, Injectable } from "@angular/core";
import { collection, collectionData, doc, docData, Firestore, updateDoc } from "@angular/fire/firestore";
import { Observable, tap } from "rxjs";
import { AllBudget, CategoryList } from "../interface";

@Injectable({providedIn: 'root'})
export class BudgetFirebaseSerice {
    firestore = inject(Firestore);
    BudgetCollection = collection(this.firestore, 'Budget Info');

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

      // Create an object with the updated data
      const updatedData = {
          totalBalance: balance,
          salery: salery,
          payPeriod: payPeriod,
          payReset: payReset,
      };

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