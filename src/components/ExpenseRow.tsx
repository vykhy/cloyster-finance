import React from 'react'
import { formatDate } from '../pages/Dashboard'

export default function ExpenseRow({expense}: any) {
    return (
        <div>
            <div className='flex justify-evenly bg-blue-50 text-sm font-semibold w-full border-b border-gray-300 py-2'>
                <div className="column">{expense.projectId} </div>
                <div className="column">---</div>
                <div className="column">{expense.item} </div>
                <div className="column">---</div>
                <div className="column text-red-500">{expense.amount} </div>
                <div className="column">{formatDate(expense.createdAt)}</div>
                {/* <div className="column">{transaction.type} </div> */}
            </div>
        </div>
    )
}
