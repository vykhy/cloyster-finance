import React, { useState, useContext, useEffect } from 'react'
import AppUserContext, { Expense, Sale } from './contexts/app-user-context'

interface Transaction{
    id: string;
    projectId: string;
    customer?: string;
    amount: number;
    reason: Text;
    createdAt: string;
    type?: string;
}

export default function Dashboard() {

    const user = useContext(AppUserContext)
    const [transactions, setTransactions] = useState<Array<Transaction | Expense | Sale>>([])
    const [expenses, setExpenses] = useState<Array<number>>([])
    const [sales, setSales] = useState<Array<number>>([])

    useEffect(() => {
        user?.expenses.map(expense => {
            expense.type = 'expense'
            setTransactions([...transactions, expense])
            setExpenses([...expenses, expense.amount])
        })
        user?.sales.map(sale => {
            sale.type = 'sale'
            setTransactions([...transactions, sale])
            setSales([...sales, sale.amount])
        })
    }, [user])

    function getSum(total: number, num: number){
        return total + Math.round(num)
    }

    return (
        <div>
            <h3>Expenses: {expenses?.reduce(getSum, 0)} </h3>
            <h3>Sales: {sales.reduce(getSum, 0)} </h3>
        </div>
    )
}
