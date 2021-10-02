import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";
import React from 'react'

export default function SignOut(){
    const history = useHistory()

    const auth = getAuth()
    signOut(auth).then(() => {
        console.log('signed out')
    }).catch((e) => {
        console.log('sign out failed')
    })

    history.push('/')

    return(
        <h3>Signing you out...</h3>
    )
}
