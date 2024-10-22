import { AllBudget } from "./interface"


export let allBudgetValue: AllBudget = 
    {
        id: 0,
        totalBalance: 15700,
        salery: 2100,
        totalSpent: 106.32,
        payPeriod: "Biweekly",
        payReset: "Monthly",
        fixedExpense: [{
            id:0,
            title: "Rent",
            spent: 1500
        }],
        category: [{
            id: 0,
            title: "Food",
            total: 300,
            spent: 56.32,
            remaining: 243.68,
            transaction: [ {
                id: 0,
                date: "2024-10-02",
                description: "All you can eat sushi",
                spent: 56.32,
                transactionCategory: "Food"
            }]


        },
        {
            id: 1,
            title: "Personal",
            total: 200,
            spent: 50,
            remaining: 150,
            transaction: [ {
                id: 1,
                date: "2024-10-08",
                description: "new clothes",
                spent: 50,
                transactionCategory: "Personal"
            }]


        }
    
    ]
    }

