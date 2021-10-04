import React, { useState, useEffect, FormEvent, useContext } from 'react'
import { Expense } from '../contexts/app-user-context'
import userContext from '../contexts/user-context'
import { addExpense } from '../services/firebase'

export default function Expenses() {

    const user = useContext(userContext)

    const [projectId, setProjectId] = useState<string>('')
    const [item, setItem] = useState<string>('')
    const [amount, setAmount] = useState<string | number>('0')
    const [reason, setReason] = useState<string>('')
    const [type, setType] = useState<string>('expense')

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        const expense: Expense = {
            id: 'adfs',
            projectId: projectId,
            item: item,
            amount: +amount,
            reason: reason,
            type: type,
            createdAt: Date.now()
        }
        if(user?.uid)addExpense(user?.uid, expense)
        
    }

    return (
        <div>
            <form>
                <label >Batch: <br />
                    <input type="text" aria-label="batch" value={projectId} onChange={(e) =>setProjectId(e.target.value)}
                    />
                </label>
                <br />
                <label>Item: <br />
                    <input type="text" aria-label="item name" value={item} onChange={(e) =>setItem(e.target.value)}
                    />
                </label> <br />
                <label>Price: <br />
                    <input type="number" aria-label="amount" value={amount} onChange={(e) => {setAmount(e.target.value)}}
                    />
                </label>
                <br />
                <label>Reason: <br />
                    <input type="text" aria-label="reason" value={reason} onChange={(e) =>setReason(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit" onClick={(e) => handleSubmit(e)} >Add expense</button>
            </form>
        </div>
    )
}
