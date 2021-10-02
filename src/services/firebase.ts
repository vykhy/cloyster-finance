import { User } from '@firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export async function userExists(uid: string){
    console.log('fnction ran')
    const results = await getDoc(doc(db, "users", uid))
    return results.data() ? true : false
}

export async function createUser(user: User){
    await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        expenses: [],
        sales: [],
        projects: [],
        createdAt: Date.now()
    })
}