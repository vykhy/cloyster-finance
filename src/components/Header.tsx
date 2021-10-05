import { useContext } from "react"
import { Link } from "react-router-dom"
import userContext from "../contexts/user-context"

export default function Header(){
    const user = useContext(userContext)
    return (
        <pre>
            {user ? <div style={{ display:'flex', width:'100%', justifyContent:'space-between'}}>
                <h3>{user.displayName}</h3> <Link to='sign-out'><h3>Log out</h3></Link>
            </div>
            : <h5>No user</h5>}
            
        </pre>
    )
}
