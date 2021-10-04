import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";
import { useState, useEffect } from 'react'

export default function SignOut(){    

    const [error, setError] = useState<string | null>('Signing you out...')

    const history = useHistory()

    useEffect(() => {
        handleSignOut()
    }, [])
    function handleSignOut(){
        const auth = getAuth()
        if(!navigator.onLine) {setError('You are offline'); return }
        signOut(auth)
        .then(() => {
            history.push('/')
        })
        .catch((e) => {
           setError(e)
        })

    }
    
    return(
        <div>
            {error &&  <h3>{error} </h3>}
        </div>
        
    )
}
