export interface AllBudget {
    id: string;
    totalBalance: number;
    afterExpense: number;
    salery: number;
    totalSpent: number;
    payPeriod: string;
    payReset: string;
    fixedExpense: fixedExpenseList[]
category: CategoryList []
}

export interface BudgetInfo { // new
    id: string;
    totalBalance: number;
    afterExpense: number;
    salary: number;
    totalSpent: number;
    payPeriod: string;
    payReset: string;
    fixedExpense: fixedExpenseList[]
category: CategoryList []
}

export interface CategoryList {
    id: string;
    title: string;
    total: number;
    spent: number;
    remaining: number;
    transaction: TransactionList []
  
}

export interface TransactionList {
    id: string;
    date: string;
    description: string;
    spent: number;
    transactionCategory: string;
  
}

export interface fixedExpenseList {
    id: string;
    title: string;
    spent: number;
}

