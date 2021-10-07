import { ArrowForwardIos } from '@material-ui/icons'
import{ Link } from 'react-router-dom'

export default function New() {
    return (
        <div className="h-vw flex align-center">
            <div className="text-lg container h-72 flex flex-col justify-center ">
                <Link to='/batch'> 
                    <div className='text-left mb-3 relative text-white bg-blue-600 p-2 w-4/5 mx-auto rounded' >
                        New Batch <ArrowForwardIos style={{color:'white',position:'absolute', right:10,top:10}} />
                    </div>
                </Link>
                <Link to='/expense'> 
                    <div className='text-left mb-3 relative text-white bg-blue-600 p-2 w-4/5 mx-auto rounded'>
                        New Expense <ArrowForwardIos style={{color:'white',position:'absolute', right:10,top:10}} />
                    </div> 
                </Link>
                <Link to='/sale'>
                    <div className='text-left mb-3 relative text-white bg-blue-600 p-2 w-4/5 mx-auto rounded'>
                        New Sale <ArrowForwardIos style={{color:'white',position:'absolute', right:10,top:10}} />
                    </div>
                </Link>
            </div>            
        </div>
    )
}
