export interface AllBudget {
    id: number;
    totalBalance: number;
    salery: number;
    totalSpent: number;
    payPeriod: string;
    payReset: string;
    fixedExpense: fixedExpenseList[]
    category: CategoryList[] 
}

export interface CategoryList {
    id: number;
    title: string;
    total: number;
    spent: number;
    remaining: number;
    transaction: TransactionList []
  
}

export interface TransactionList {
    id: number;
    date: string;
    description: string;
    spent: number;
    transactionCategory: string;
  
}

export interface fixedExpenseList {
    id: number;
    title: string;
    spent: number;
}

