import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import React, { useState, useEffect } from 'react'
import firebase from "../lib/firebase";

export default function useAuthListener(){

    const auth = getAuth()
    const [user, setUser] = useState<User | null>(
        localStorage.getItem('cloyster-finance-user') === null ? null
        : JSON.parse(localStorage.getItem('cloyster-finance-user') || '') )

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (authUser) => {
        if(authUser){
            localStorage.setItem('cloyster-finance-user', JSON.stringify(authUser))
            setUser(user)
        }
        else{
           localStorage.removeItem('cloyster-finance-user')
           setUser(null)
        }
        return () => listener()
    })
    },[firebase])
    

    return { user }
}
