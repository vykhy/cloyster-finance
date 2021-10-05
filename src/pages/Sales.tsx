import { CircularProgress } from '@material-ui/core'
import { useState, FormEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import AppUserContext, { SaleType } from '../contexts/app-user-context'
import { addSale } from '../services/firebase'

export default function Sales() {

    const history = useHistory()
    const appUser = useContext(AppUserContext)
    const [isFetching, setIsFetching] = useState(false)

    const [projectId, setProjectId] = useState<string>('')
    const [customer, setCustomer] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [amount, setAmount] = useState<string | number>('')
    const [error, setError] = useState<string | null>(null)
    const type: string = 'sale'

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        if(!navigator.onLine) {setError('You are offline'); setIsFetching(false);return }

        const sale: SaleType = {
            projectId: projectId,
            customer: customer,
            amount: +amount,
            weight: +weight,
            type: type,
            createdAt: Date.now()
        }
        if(appUser?.user?.uid) addSale(appUser?.user?.uid, sale)
        setIsFetching(false)
        appUser?.sales.push(sale)
        
        history.push('/')
    }

    return (
        <div>
            <form className="text-lg text-left w-4/5 md:w-64 mx-auto">
                <label >Batch(optional): <br />
                    <input className="w-full border py-1 text-lg mx-1" type="text" aria-label="batch" value={projectId} onChange={(e) =>setProjectId(e.target.value)}
                    />
                </label>
                <br />
                <label>Customer(optional): <br />
                    <input className="w-full border py-1 text-lg mx-1" type="text" aria-label="customer name" value={customer} onChange={(e) =>setCustomer(e.target.value)}
                    />
                </label> <br />
                <label>Price: <br />
                    <input className="w-full border py-1 text-lg mx-1" type="number" required aria-label="amount" value={amount} onChange={(e) => {setAmount(e.target.value)}}
                    />
                </label>
                <br />
                <label>Weight in kg(optional): <br />
                    <input className="w-full py-1 text-lg mx-1" type="number" aria-label="amount" value={weight} onChange={(e) => {setWeight(e.target.value)}}
                    />
                </label>
                <br />
                <button  className="bg-blue-500 mx-auto text-white text-lg w-2/4 rounded py-2" type="submit" onClick={(e) => handleSubmit(e)} >
                    {isFetching ? <CircularProgress style={{color:'white'}} /> : <p>Add sale</p> }
                </button>
            </form>         
            {error &&  <h3>{error} </h3>}
        </div>
    )
}
