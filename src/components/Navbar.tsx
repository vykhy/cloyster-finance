import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='flex mt-4 justify-center  w-full'>
                <div className='p-3 w-40 bg-blue-300 font-bold rounded'>
                    <Link to='/' >
                        <h4>Dashboard</h4>
                    </Link>
                </div>
                <div className='p-3 bg-blue-300 w-40 font-bold rounded'>
                    <Link to='/expense' >
                        <h4>New expense</h4>
                    </Link>
                </div>
                <div className='p-3 bg-blue-300 w-40 font-bold rounded'>
                    <Link to='/sale' >
                        <h4>New sale</h4>
                    </Link>
                </div>
        </div>
    )
}
