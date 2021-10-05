import { CircularProgress } from '@material-ui/core'
import { useState, FormEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import AppUserContext, { Expense } from '../contexts/app-user-context'
import { addExpense } from '../services/firebase'

export default function Expenses() {

    const history = useHistory()
    const appUser = useContext(AppUserContext)
    const [error, setError] = useState<string | null>(null)
    const [isFetching, setiIsFetching] = useState(false)

    const [projectId, setProjectId] = useState<string>('')
    const [item, setItem] = useState<string>('')
    const [amount, setAmount] = useState<string | number>('')
    const [reason, setReason] = useState<string>('')
    const type: string = 'expense'

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        setiIsFetching(true)
        if(!navigator.onLine) {setError('You are offline');setiIsFetching(false); return }

        const expense: Expense = {
            projectId: projectId,
            item: item,
            amount: +amount,
            reason: reason,
            type: type,
            createdAt: Date.now()
        }
        if(appUser?.user.uid){
            await addExpense(appUser?.user?.uid, expense)
            setiIsFetching(false)
            appUser?.expenses.push(expense)
            history.push('/')
        }       

    }

    return (
        <div>
            <form className="text-lg text-left w-4/5 md:w-64 mx-auto">
                <label >Batch: <br />
                    <input className="w-full border py-1 text-lg"  type="text" aria-label="batch" value={projectId} onChange={(e) =>setProjectId(e.target.value)}
                    />
                </label>
                <br />
                <label>Item: <br />
                    <input className="w-full border py-1 text-lg "  type="text" required aria-label="item name" value={item} onChange={(e) =>setItem(e.target.value)}
                    />
                </label> <br />
                <label>Price: <br />
                    <input className="w-full border py-1 text-lg"  type="number" required aria-label="amount" value={amount} onChange={(e) => {setAmount(e.target.value)}}
                    />
                </label>
                <br />
                <label>Reason(optional): <br />
                    <input className="w-full border py-1 text-lg"  type="text" aria-label="reason" value={reason} onChange={(e) =>setReason(e.target.value)}
                    />
                </label>
                <br />
                <button className="bg-blue-500 mx-auto text-white text-lg w-2/4 rounded py-2" type="submit" onClick={(e) => handleSubmit(e)} >
                    {isFetching ? <CircularProgress style={{color:'white'}} /> : <p>Add expense</p>} 
                </button>
            </form>
            {error &&  <h3>{error} </h3>}
        </div>
    )
}
