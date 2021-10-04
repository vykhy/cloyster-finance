import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { createUser, userExists } from '../services/firebase'

export default function SignIn(): any {
    const [error, setError] = useState<string | null>('Signing you in...')

    const history = useHistory()
    
    useEffect(() => {
       handleSignIn()
    }, [])
    
function handleSignIn(){
            if(!navigator.onLine) {setError('You are offline'); return }
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
            <button onClick={handleSignIn} >Sign in with Google</button>
            {error &&  <h3>{error} </h3>}
        </div>
    )
}
