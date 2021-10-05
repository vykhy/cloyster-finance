import React from 'react'
import { SaleType } from '../contexts/app-user-context'
import { formatDate, Transaction } from '../pages/Dashboard'

export default function Sale({sale} : any) {
    return (
        <div>
            <div style={{ color:'green', display:'flex', justifyContent:'space-between', minWidth:'100%'}}>
                <div className='column'>{sale.projectId}</div>
                <div className='column'>{sale.customer || '---'} </div>
                <div className='column'>---</div>
                <div className='column'>{sale.weight} </div>
                <div className='column'>{sale.amount} </div>
                <div className='column'>{formatDate(sale.createdAt)} </div>
                {/* <div className='column'>{transaction.type} </div> */}
            </div>
        </div>
    )
}
