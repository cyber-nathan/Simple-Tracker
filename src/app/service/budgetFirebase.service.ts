import { inject, Injectable } from "@angular/core";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AllBudget } from "../interface";

@Injectable({providedIn: 'root'})
export class BudgetFirebaseSerice {
    firestore = inject(Firestore);
    BudgetCollection = collection(this.firestore, 'Budget Info');

    getBudget() : Observable<AllBudget>{
        return collectionData(this.BudgetCollection, {
            idField: 'id',
        }) as Observable<AllBudget>;
    }

}