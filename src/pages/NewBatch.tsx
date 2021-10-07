import { useContext } from 'react'
import { CircularProgress } from '@material-ui/core'
import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'
import AppUserContext, { Project } from '../contexts/app-user-context'
import { hasEmpty } from '../services/functions'
import { addBatch } from '../services/firebase'

export default function NewBatch() {

    const history = useHistory()
    const user = useContext(AppUserContext)
    const [projectId, setProjectId] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isFetching, setiIsFetching] = useState(false)

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        setiIsFetching(true)
        if(!navigator.onLine){
            setTimeout(() => {
                setiIsFetching(false)
                setError('You are offline')
                return
            }, 3000)            
        }
        if(hasEmpty([projectId])){
            setError('Fill in all required fields')
            setiIsFetching(false)
            return
        }        
        if(user?.user && navigator.onLine){
            const project: Project = {
                id: projectId
            }
            await addBatch(user?.user?.uid, project)
            setiIsFetching(false)
            user?.projects.push(project)
            history.push('/')
        }    
        
    }

    return (
        <div>
            <div className="container mx-auto text-xl font-bold my-3">New Batch</div>
            <form className="text-lg text-left w-4/5 md:w-64 mx-auto">
            <label> New Batch name:</label><br />
            <input className="w-full mb-2 border py-1 text-lg"  type="text" aria-label="batch" value={projectId} onChange={(e) =>setProjectId(e.target.value)} />                         
            <button className="bg-blue-500 mx-auto text-white text-lg w-2/4 rounded py-2" type="submit" onClick={(e) => handleSubmit(e)} >
                {isFetching ? <CircularProgress  style={{color:'white'}} /> : <p>Add batch</p>} 
            </button>
            </form>
            {error? <h3 className='text-black'>{error}</h3> : null}
        </div>
    )
}
