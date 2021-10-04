import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div style={{ display:'flex', minWidth:'100%', justifyContent:'space-evenly'}} >
                <div>
                    <Link to='/' >
                        <h4>Dashboard</h4>
                    </Link>
                </div>
                <div>
                    <Link to='/expense' >
                        <h4>New expense</h4>
                    </Link>
                </div>
                <div>
                    <Link to='/sale' >
                        <h4>New sale</h4>
                    </Link>
                </div>
        </div>
    )
}
