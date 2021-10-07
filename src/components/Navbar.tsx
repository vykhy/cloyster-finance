import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='flex mt-4 justify-center  w-full'>
                <Link to='/' >
                    <div className='p-3 w-40 bg-blue-300 font-bold rounded'>
                        <h4>Dashboard</h4>
                    </div>
                </Link>
                <Link to='/new' >
                    <div className='p-3 bg-blue-300 w-40 font-bold rounded'>
                        <h4>New </h4>
                    </div>
                </Link>
        </div>
    )
}
