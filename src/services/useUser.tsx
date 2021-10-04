import { useState, useEffect } from 'react'
import { getUserData } from './firebase';

export default function useUser(uid: string | null){


    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const appUser = async() => {
            if (uid === null)  return
            const user = await getUserData(uid)
            setUser(user)
        }
        appUser()
    }, [uid])

    if(user === undefined) return null
    return user
}