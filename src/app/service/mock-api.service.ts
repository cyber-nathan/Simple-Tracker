import { Injectable } from '@angular/core';
import { allBudgetValue } from '../db.data';
@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor() { }

  getBudgetData() {
    return allBudgetValue
  }
}
