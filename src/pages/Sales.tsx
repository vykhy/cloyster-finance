import { useState, FormEvent, useContext } from 'react'
import AppUserContext, { Sale } from '../contexts/app-user-context'
import { addSale } from '../services/firebase'

export default function Sales() {

    const appUser = useContext(AppUserContext)

    const [projectId, setProjectId] = useState<string>('')
    const [customer, setCustomer] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [amount, setAmount] = useState<string | number>('')
    const type: string = 'sale'

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        const sale: Sale = {
            projectId: projectId,
            customer: customer,
            amount: +amount,
            type: type,
            createdAt: Date.now()
        }
        if(appUser?.user?.uid)addSale(appUser?.user?.uid, sale)
        appUser?.sales.push(sale)
        
    }

    return (
        <div>
            <form>
                <label >Batch: <br />
                    <input type="text" aria-label="batch" value={projectId} onChange={(e) =>setProjectId(e.target.value)}
                    />
                </label>
                <br />
                <label>Customer: <br />
                    <input type="text" aria-label="customer name" value={customer} onChange={(e) =>setCustomer(e.target.value)}
                    />
                </label> <br />
                <label>Price: <br />
                    <input type="number" aria-label="amount" value={amount} onChange={(e) => {setAmount(e.target.value)}}
                    />
                </label>
                <br />
                <label>Weight in kg: <br />
                    <input type="number" aria-label="amount" value={weight} onChange={(e) => {setWeight(e.target.value)}}
                    />
                </label>
                <br />
                <button type="submit" onClick={(e) => handleSubmit(e)} >Add expense</button>
            </form>
        </div>
    )
}
