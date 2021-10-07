import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { createUser, userExists } from '../services/firebase'
import { CircularProgress } from '@material-ui/core'

export default function SignIn(): any {
    const [error, setError] = useState<string | null>('Signing you in...')
    const [isFetching, setisFetching] = useState<boolean>(false)
    const history = useHistory()
    
    useEffect(() => {
      handleSignIn()
    }, )
    
    function handleSignIn(){
        setisFetching(true)

        if(!navigator.onLine) {
            setError('You are offline');
            setisFetching(false);
            return 
        }
        else{
            const provider = new GoogleAuthProvider()
            const auth = getAuth()

            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;

                if(!user) return 
                const userDoc = async() => {
                    const exists= await userExists( user?.uid )
                    if(!exists){
                        createUser(user)
                    }
                }
                userDoc()
                setisFetching(false)
                history.push('/')

            }).catch((error) => {
                setisFetching(false)
                setError(error.message)
            });
        }
    }
    
    return (
        <div>
            <button className="rounded text-lg bg-blue-500 mt-4 text-white w-2/5 mx-auto py-3"
             onClick={() => handleSignIn()} >
                {isFetching? <CircularProgress style={{color:'white'}} /> : <p>Sign in with Google</p>}
                 </button>
            {error &&  <h3>{error} </h3>}
        </div>
    )
}
