import { useState, useContext, useEffect } from 'react'
import AppUserContext, { Expense, SaleType } from '../contexts/app-user-context'
import '../styles/table.css'

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
    const [period, setPeriod] = useState<'7 days' | '24 hours' | '28 days' | '6 months'>('7 days')

    useEffect(() => {
        setStats(period, user?.expenses, setExpenses)
        setStats(period, user?.sales, setSales)
        setTransactions(user?.sales.concat(user.expenses))
    }, [user])

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

    function getTimestamp(period: string){
        switch (period) {
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
    function getSum(total: number, num: number){
        return total + Math.round(num)
    }

    return (
        <div>
            <h3>Expenses: {expenses.reduce(getSum, 0)} </h3>
            <h3>Sales: {sales.reduce(getSum, 0)} </h3>
            <br />
            <br />
            <div className="transactions-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', minWidth:'100%'}} className="transaction-headers">
                    <div className='column'>batch</div>
                    <div className='column'>customer</div>
                    <div className='column'>item</div>
                    <div className='column'>weight</div>
                    <div className='column'>amount</div>
                    <div className='column'>Date</div>
                    {/* <div className='column'>type</div>  */}
                </div>
                { transactions ? transactions.map((transaction: Transaction) => (
                    <div className="transaction" key={transaction.createdAt} >
                        {transaction.type === 'sale' ? 
                        <div style={{ color:'green', display:'flex', justifyContent:'space-between', minWidth:'100%'}}>
                            <div className='column'>{transaction.projectId}</div>
                            <div className='column'>{transaction.customer || '---'} </div>
                            <div className='column'>---</div>
                            <div className='column'>{transaction.weight} </div>
                            <div className='column'>{transaction.amount} </div>
                            <div className='column'>{formatDate(transaction.createdAt)} </div>
                            {/* <div className='column'>{transaction.type} </div> */}
                        </div>
                        : 
                        <div style={{ color:'red', display:'flex', justifyContent:'space-between', minWidth:'100%'}}>
                            <div className="column">{transaction.projectId} </div>
                            <div className="column">---</div>
                            <div className="column">{transaction.item} </div>
                            <div className="column">---</div>
                            <div className="column">{transaction.amount} </div>
                            <div className="column">{formatDate(transaction.createdAt)}</div>
                            {/* <div className="column">{transaction.type} </div> */}
                        </div>
                    }
                    </div>
                )) : <div>nothing</div> }
            </div>
        </div>
    )
}
