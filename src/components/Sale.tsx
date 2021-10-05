import React from 'react'
import { SaleType } from '../contexts/app-user-context'
import { formatDate, Transaction } from '../pages/Dashboard'

export default function Sale({sale} : any) {
    return (
        <div>
            <div className='flex border-b bg-blue-50 border-gray-300 py-2 justify-evenly text-sm font-semibold'>
                <div className='column'>{sale.projectId}</div>
                <div className='column'>{sale.customer || '---'} </div>
                <div className='column'>---</div>
                <div className='column'>{sale.weight} </div>
                <div className='column text-green-600'>{sale.amount} </div>
                <div className='column'>{formatDate(sale.createdAt)} </div>
                {/* <div className='column'>{transaction.type} </div> */}
            </div>
        </div>
    )
}
