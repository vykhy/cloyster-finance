import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div>
            <Link to='/sign-in'>
                <div className="bg-blue-500 text-white mx-auto text-lg py-2 mt-4 rounded w-2/4">
                    Sign in
                </div>                              
            </Link>
            <h2 className="font-semibold py-3">You are not signed in</h2>
            <p>Refresh your page if you are seeing this page after signing in</p>
        </div>
    )
}
