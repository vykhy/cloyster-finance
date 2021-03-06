import { User } from '@firebase/auth'
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore'
import { Expense, Project, SaleType } from '../contexts/app-user-context'
import { db } from '../lib/firebase'

export async function userExists(uid: string){
    const result = await getDoc(doc(db, "users", uid))
    return result.data() ? true : false
}

export async function createUser(user: User){
    await setDoc(doc(db, "users", user.uid), {
        user: {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
        },
        name: user.displayName,
        expenses: [],
        sales: [],
        projects: [],
        createdAt: Date.now()
    })
}

export async function getUserData(uid: string){
    const result = await getDoc(doc(db, "users", uid))
    return result.data()
}

export async function addExpense(uid: string, expense: Expense){
    return await updateDoc(doc(db,'users', uid), {
        expenses: arrayUnion(expense)
    })
     
}
export async function addSale(uid: string, sale: SaleType){
    return await updateDoc(doc(db,'users', uid), {
        sales: arrayUnion(sale)
    })
}
export async function addBatch(uid: string, project: Project){
    await updateDoc(doc(db, 'users', uid), {
        projects: arrayUnion(project)
    })
}