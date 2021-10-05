import { useState, useContext, useEffect } from 'react'
import AppUserContext, { Expense, SaleType } from '../contexts/app-user-context'
import Sale from '../components/Sale'
import '../styles/table.css'
import ExpenseRow from '../components/ExpenseRow'
import { CircularProgress } from '@material-ui/core'

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
/**
     * 
     * @param time millisecond timestamp value
     * @returns formatted date (yyyy/mm/dd)
     */
    export function formatDate(time: number){
        let date = new Date(time)
        return date.getUTCFullYear()+'/'+date.getMonth()+'/'+date.getDate()
    }

export default function Dashboard() {

    const user = useContext(AppUserContext)
    const [transactions, setTransactions] = useState<any>([])//Array<Transaction | Expense | Sale| undefined>
    const [expenses, setExpenses] = useState<Array<number>>([])
    const [sales, setSales] = useState<Array<number>>([])
    const [profit, setProfit] = useState(0)

    //for filtering
    const [batch, setBatch] = useState<string>('all')
    const [type, setType] = useState<string>('all')
    const [period, setPeriod] = useState<string>('7 days') //<'7 days' | '24 hours' | '28 days' | '6 months' | 'all'>('7 days')

    useEffect(() => {
        //populate expense array with expense amount values that are in time period
        setStats(period, user?.expenses, setExpenses)
        //populate sales array with sale amount values that are in time period
        setStats(period, user?.sales, setSales)

        //called outside so that we dont call getTimestamp for each element
        let timestamp = getTimestamp(period)
        //populate transactions array with transactions that pass the period, type and batch filters
        setTransactions(
            user?.sales.filter(sale => (
                sale.createdAt > timestamp  && (type === 'sales' || type === 'all') && (sale.projectId === batch || batch === 'all')           
            ))
            .concat(user?.expenses.filter(expense => (
                expense.createdAt > timestamp  && (type === 'expenses' || type === 'all') && (expense.projectId === batch || batch === 'all' )
            ))
        ))
    }, [user, period, type, batch])

    useEffect(() => {
        setProfit(sales.reduce(getSum, 0) - expenses.reduce(getSum, 0))
    }, [sales, expenses])
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
            //if element passes period filter, add its amount to array
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
    

    return (
        <div className=''>
            <div className="flex border-t-2 border-gray-600 justify-evenly bg-blue-500 p-2">
                <div >
                    <label className='text-gray-100 font-bold text-sm' htmlFor="cars">Choose duration:</label><br />
                    <select className='p-1 w-28 rounded px-3' value={period} onChange={(e)=> setPeriod(e.target.value)} name="period" id="period" form="dashboardForm">
                        <option value="4 hours">last 4 hrs</option>
                        <option value="24 hours">last 24 hrs</option>
                        <option value="7 days">last week</option>
                        <option value="28 days">1 month</option>
                        <option value="180 days">6 months</option>
                        <option value="all">all</option>
                    </select>
                </div>
                <div>
                    <label className='text-gray-100 font-bold text-sm'  htmlFor="cars">Choose type:</label><br />
                    <select className='p-1 w-28 rounded px-3'  value={type} onChange={(e)=> setType(e.target.value)} name="type" id="type" form="dashboardForm">
                        <option value="all">all</option>
                        <option value="expenses">expenses</option>
                        <option value="sales">sales</option>
                    </select>
                </div>
                <div>
                    <label className='text-gray-100 font-bold text-sm'  htmlFor="cars">Choose batch:</label><br />
                    <select className='p-1 rounded px-3 w-28'  value={batch} onChange={(e)=> setBatch(e.target.value)} name="period" id="period" form="dashboardForm">
                        {user?.projects.map(project => (
                            <option value={project.id}>project.id</option>
                        )) }
                        
                    </select>
                </div>
            </div>

            <div className="container text-lg bg-blue-50 mx-auto font-bold rounded">
                <div className="flex py-4 justify-evenly w-4/5 mx-auto" >
                    <div className='flex mt-4 items-end pb-2 justify-center border-8 border-red-500 rounded-full border-b-0 h-28 w-28'>
                    <h3>{expenses.reduce(getSum, 0)} <br /> Expenses</h3>
                    </div>
                    <h3 className='flex mt-4 items-end pb-2 justify-center border-8 border-green-500 rounded-full border-b-0 h-28 w-28'>
                        {sales.reduce(getSum, 0)} <br />Sales
                    </h3>
                </div>
                <div className='text-xl font-bold mt-4 pb-2'>
                    Total profit: {profit >= 0 ? <span className="text-green-500">{profit} </span> : <span className="text-red-700">{profit} </span>}
                </div>
            </div>
            <div className='pb-4' >
                <div className="flex justify-evenly w-full font-bold bg-blue-400 py-2 rounded">
                    <div className='column'>batch</div>
                    <div className='column'>customer</div>
                    <div className='column'>item</div>
                    <div className='column'>weight</div>
                    <div className='column'>amount</div>
                    <div className='column'>Date</div>
                </div>
                {!navigator.onLine 
                ? <div className='text-4xl pt-4 font-bold'>You are offline</div>
                :   // sort by date(descending and display transactions) 
                     transactions ? transactions.sort((a: Transaction, b: Transaction) => b.createdAt - a.createdAt).map((transaction: Transaction) => (
                        <div className="transaction" key={transaction.createdAt} >
                            {transaction.type === 'sale' ? 
                            <Sale sale={transaction} />
                            : 
                            <ExpenseRow expense={transaction} />
                        }
                        </div>
                    )) : <div className="pt-4 text-xl font-bold flex align-center justify-center">loading... <CircularProgress /> </div> 
                }
                
            </div>
        </div>
    )
}
