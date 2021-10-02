import { User } from '@firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
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