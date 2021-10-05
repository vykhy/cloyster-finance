import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { createUser, userExists } from '../services/firebase'
import { CircularProgress } from '@material-ui/core'

export default function SignIn(): any {
    const [error, setError] = useState<string | null>('Signing you in...')
    const [isFetching, setisFetching] = useState<boolean>(true)
    const history = useHistory()
    
    useEffect(() => {
       handleSignIn()
    }, [])
    
    function handleSignIn(){
        setisFetching(true)
            if(!navigator.onLine) {setError('You are offline'); setisFetching(false); return }
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
                history.push('/')

            }).catch((error) => {
                // Handle Errors here.
                setError(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
            setisFetching(false)
            // signInWithRedirect(auth, provider)

            // getRedirectResult(auth) 
            //     .then((result) => {
            //         if(result != null){
            //             const credential = GoogleAuthProvider.credentialFromResult(result)
            //             const token = credential?.accessToken
            //             const user = result?.user
            //             console.log(user)
            //         }
            //         else{
            //             console.log('User returned null')
            //         }            
            //     })
            //     .catch((error) =>{
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         // The email of the user's account used.
            //         const email = error.email;
            //         // The AuthCredential type that was used.
            //         const credential = GoogleAuthProvider.credentialFromError(error);
            //         console.error(error); 
            // })
        }
    
    return (
        <div>
            <button className="rounded text-lg bg-blue-500 mt-4 text-white w-2/5 mx-auto py-3"
             onClick={handleSignIn} >
                {isFetching? <CircularProgress className="text-white" /> : <p>Sign in with Google</p>}
                 </button>
            {error &&  <h3>{error} </h3>}
        </div>
    )
}
