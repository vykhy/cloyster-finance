import { useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../contexts/user-context'

export default function Home() {

    const user = useContext(userContext) 

    return (
        <div>
            <Link to='/sign-in'> Sign in </Link>
            <Link to='/sign-out'> Log out</Link>
            {user ?
            <h2>You are signed in {user.displayName}</h2>    
            : <h2>You are not signed in</h2> }
        </div>
    )
}
