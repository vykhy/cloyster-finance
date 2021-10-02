import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../contexts/user-context'
import { userExists } from '../services/firebase'

export default function Home() {

    const { user } = useContext(userContext) 
    // const [doc, setdoc] = useState(false)

    // useEffect(() => {
    //     const userDoc = async() => {
    //         const exists= await userExists( user?.uid )
    //         setdoc(exists)
    //     }
    //     userDoc()
    //     console.log(doc)

    // }, [])

    return (
        <div>
            <Link to='/sign-in'> Sign in </Link>
            <Link to='/sign-out'> Log out</Link>
            {user && ( user !== '' || user !== {}) ?
            <h2>You are signed in {user.displayName}</h2>    
            : <h2>You are not signed in</h2> }
        </div>
    )
}
