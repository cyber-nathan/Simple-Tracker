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
    id: number;
    totalBalance: number;
    afterExpense: number;
    salary: number;
    totalSpent: number;
    payPeriod: string;
    payReset: string;
    fixedExpense: FixedExpense[]
category: Category []
}

export interface FixedExpense {
    id?: number;
    title: string;
    spent: number;
}

export interface Category {
    id?: number;
    title: string;
    total: number;
    spent: number;
    remaining: number;
    transactions: Transaction []
}

export interface Transaction {
    id: number;
    date: string;
    description: string;
    spent: number;
    transactionCategory: string;
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

