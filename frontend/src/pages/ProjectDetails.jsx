import { getProjectsTasks } from "../services/projectServices"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { createTask } from "../services/projectServices"

export default function ProjectDetails(){
    const [projectTask,setProjectTask] = useState([])
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [dueDate,setDueDate] = useState('')
    const [assignedTo,setAssignedTo] = useState(0)
    const [showForm,setShowForm] = useState(false)

    const { id } = useParams()
    async function fetchData() {
        try{
            const data = await getProjectsTasks(id)
            setProjectTask(data)
        }catch(err){
            console.log(err.message)
        }
    }


    useEffect(() => {
        fetchData()
    },[])


    async function handleSubmit() {
        try{
            await createTask(title,description,id,dueDate,assignedTo)
            setShowForm(false)
            fetchData()
        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <>
        {projectTask.map((data) => {
            return <li key={data.id}>{data.title}</li>
        })}
        <button onClick={() => setShowForm(!showForm)}>Add Task</button>
        {
            showForm && (
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}/>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )
        }
        </>
    )
}