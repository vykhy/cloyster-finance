import { useState, useContext, useEffect } from 'react'
import AppUserContext, { Expense, SaleType } from '../contexts/app-user-context'
import Sale from '../components/Sale'
import '../styles/table.css'
import ExpenseRow from '../components/ExpenseRow'

export interface Transaction{
    id: string;
    projectId: string;
    customer?: string;
    weight?: number;
    item?: string;
    amount: number;
    reason: Text;
    createdAt: number;
    type?: string;
}
    export function formatDate(time: number){
        let date = new Date(time)
        return date.getUTCFullYear()+'/'+date.getMonth()+'/'+date.getDate()
    }

export default function Dashboard() {

    const user = useContext(AppUserContext)
    const [transactions, setTransactions] = useState<any>([])//Array<Transaction | Expense | Sale| undefined>
    const [expenses, setExpenses] = useState<Array<number>>([])
    const [sales, setSales] = useState<Array<number>>([])

    //for filtering
    const [batch, setBatch] = useState<string>('all')
    const [type, setType] = useState<string>('all')
    const [period, setPeriod] = useState<string>('7 days') //<'7 days' | '24 hours' | '28 days' | '6 months' | 'all'>('7 days')

    useEffect(() => {
        setStats(period, user?.expenses, setExpenses)
        setStats(period, user?.sales, setSales)

        let timestamp = getTimestamp(period)
        setTransactions(
            user?.sales.filter(sale => (
                sale.createdAt > timestamp  && (type === 'sales' || type === 'all') && (sale.projectId === batch || batch === 'all')           
            ))
            .concat(user?.expenses.filter(expense => (
                expense.createdAt > timestamp  && (type === 'expenses' || type === 'all') && (expense.projectId === batch || batch === 'all' )
            ))
        ))
    }, [user, period, type, batch])

    /**
     * 
     * @param period period for which to return data
     * @param array input of items
     * @param setFunction a usestate function to update corresponding state
     */
    function setStats(period: string,
         array: Array<Transaction | Expense | SaleType> | undefined,
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

    /**
     * returns a timestamp so that we can filter items for only after specified timestamp
     * @param period duration for which to return timestamp
     * @returns a timestamp value at various intervals based on period
     */
    function getTimestamp(period: string){
        switch (period) {
            case '4 hours':
                return Date.now() - (1000*3600*4)
            case '24 hours':
                return Date.now() - (1000*3600*24)
            case '7 days':
                return Date.now() - (1000*3600*24*7)
            case '28 days':
                return Date.now() - (1000*3600*24*28)
            case '6 months':
                return Date.now() - (1000*3600*24*180)                        
            default:
                return 0                            
        }
    }
    /**
     * to sum an array 
     */
    function getSum(total: number, num: number){
        return total + Math.round(num)
    }
    /**
     * 
     * @param time millisecond timestamp value
     * @returns formatted date (yyyy/mm/dd)
     */

    return (
        <div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-evenly', margin:'0 auto'}} >
                <h3>Expenses: {expenses.reduce(getSum, 0)} </h3>
                <h3>Sales: {sales.reduce(getSum, 0)} </h3>
            </div>
            <div><h3>Total profit: {sales.reduce(getSum, 0) - expenses.reduce(getSum, 0)} </h3></div>
                
            <br />
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <div >
                    <label htmlFor="cars">Choose duration:</label><br />
                    <select value={period} onChange={(e)=> setPeriod(e.target.value)} name="period" id="period" form="dashboardForm">
                        <option value="4 hours">last 4 hrs</option>
                        <option value="24 hours">last 24 hrs</option>
                        <option value="7 days">last week</option>
                        <option value="28 days">1 month</option>
                        <option value="180 days">6 months</option>
                        <option value="all">all</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="cars">Choose type:</label><br />
                    <select value={type} onChange={(e)=> setType(e.target.value)} name="type" id="type" form="dashboardForm">
                        <option value="all">all</option>
                        <option value="expenses">expenses</option>
                        <option value="sales">sales</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="cars">Choose batch:</label><br />
                    <select value={batch} onChange={(e)=> setBatch(e.target.value)} name="period" id="period" form="dashboardForm">
                        {user?.projects.map(project => (
                            <option value={project.id}>project.id</option>
                        )) }
                        
                    </select>
                </div>
            </div>
            
            <br />
            <div className="transactions-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', minWidth:'100%'}} className="transaction-headers">
                    <div className='column'>batch</div>
                    <div className='column'>customer</div>
                    <div className='column'>item</div>
                    <div className='column'>weight</div>
                    <div className='column'>amount</div>
                    <div className='column'>Date</div>
                </div>
                {/* sort by date(descending and display transactions) */}
                { transactions ? transactions.sort((a: Transaction, b: Transaction) => b.createdAt - a.createdAt).map((transaction: Transaction) => (
                    <div className="transaction" key={transaction.createdAt} >
                        {transaction.type === 'sale' ? 
                        <Sale sale={transaction} />
                        : 
                        <ExpenseRow expense={transaction} />
                    }
                    </div>
                )) : <div>nothing</div> }
            </div>
        </div>
    )
}
