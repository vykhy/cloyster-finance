import { useContext } from "react"
import { Link } from "react-router-dom"
import userContext from "../contexts/user-context"

export default function Header(){
    const user = useContext(userContext)
    return (
        <div className="p-2 bg-blue-500  border-b-2 border-black">
            {user ? <div className=' flex items-center w-full justify-between'>
                <h3 className='font-bold text-white'>{user.displayName}</h3> <Link to='sign-out'><h3 className="p-3 bg-blue-300 rounded">Log out</h3></Link>
            </div>
            : <h5>No user</h5>}
            
        </div>
    )
}
