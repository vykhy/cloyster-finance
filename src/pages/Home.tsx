import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div>
            <Link to='/sign-in'> Sign in </Link>
            <h2>You are not signed in</h2>
        </div>
    )
}
