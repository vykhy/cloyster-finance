import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { createUser, userExists } from '../services/firebase'

export default function SignIn(): any {
    

    const history = useHistory()
    
    useEffect(() => {
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

        }).catch((error) => {
            // Handle Errors here.
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
    }, [])
    

    history.push('/')
    return (
        <div>
            Register
        </div>
    )
}
