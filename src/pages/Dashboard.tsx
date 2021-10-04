import React, { useState, useContext, useEffect } from 'react'
import AppUserContext, { Expense, Sale } from '../contexts/app-user-context'

interface Transaction{
    id: string;
    projectId: string;
    customer?: string;
    amount: number;
    reason: Text;
    createdAt: number;
    type?: string;
}

export default function Dashboard() {

    const user = useContext(AppUserContext)
    const [transactions, setTransactions] = useState<any>([])//Array<Transaction | Expense | Sale| undefined>
    const [expenses, setExpenses] = useState<Array<number>>([])
    const [sales, setSales] = useState<Array<number>>([])
    const [period, setPeriod] = useState<'7 days' | '24 hours' | '28 days' | '6 months'>('24 hours')

    useEffect(() => {
        setStats(period, user?.expenses, expenses, setExpenses)
        setStats(period, user?.sales, sales, setSales)
        setTransactions(user?.sales.concat(user.expenses))
    }, [user])

    function setStats(period: string,
         array: Array<Transaction | Expense | Sale> | undefined,
         parentArray: Array<number>,
         setFunction: Function,
        ){
            let newArray: Array<number> = []
            const timestamp = getTimestamp(period)
            array && array.map(object => {
                if(object.createdAt > timestamp){
                    newArray.push(object.amount)
                }
            setFunction(newArray)
            })
    }

    function getTimestamp(period: string){
        let timestamp = 0
        switch (period) {
            case '24 hours':
                timestamp = Date.now() - (1000*3600*24)
                break;
            case '7 days':
                timestamp = Date.now() - (1000*3600*24*7)
                break;
            case '28 days':
                timestamp = Date.now() - (1000*3600*24*28)
                break;
            case '6 months':
                timestamp = Date.now() - (1000*3600*24*180)
                break;        
            default:
                timestamp = 0
                break;            
        }
        return timestamp
    }
    function getSum(total: number, num: number){
        return total + Math.round(num)
    }

    return (
        <div>
            <h3>Expenses: {expenses.reduce(getSum, 0)} </h3>
            <h3>Sales: {sales.reduce(getSum, 0)} </h3>
        </div>
    )
}
