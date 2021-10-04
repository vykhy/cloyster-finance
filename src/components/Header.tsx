import { useContext } from "react"
import { Link } from "react-router-dom"
import userContext from "../contexts/user-context"

export default function Header(){
    const user = useContext(userContext)
    return (
        <pre>
            {user?.displayName}
            <Link to='sign-out'>Log out</Link>
        </pre>
    )
}
