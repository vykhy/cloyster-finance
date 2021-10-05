import React from 'react'
import { formatDate } from '../pages/Dashboard'

export default function ExpenseRow({expense}: any) {
    return (
        <div>
            <div style={{ color:'red', display:'flex', justifyContent:'space-between', minWidth:'100%'}}>
                            <div className="column">{expense.projectId} </div>
                            <div className="column">---</div>
                            <div className="column">{expense.item} </div>
                            <div className="column">---</div>
                            <div className="column">{expense.amount} </div>
                            <div className="column">{formatDate(expense.createdAt)}</div>
                            {/* <div className="column">{transaction.type} </div> */}
                        </div>
        </div>
    )
}
