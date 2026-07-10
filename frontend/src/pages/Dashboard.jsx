import { getProjects } from "../services/projectServices"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { createProject } from "../services/projectServices"

export default function Dashboard(){
    const [projects, setProjects] = useState([]) //existing projects

    // project creation form
    const [showForm, setShowForm] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [projectDate, setProjectDate] = useState("")


    async function loadProjects() {
        try{

            const data = await getProjects()
            setProjects(data)
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        loadProjects()
    },[])

    async function handleSubmit() {
        try{
            await createProject(projectName,projectDescription,projectDate)
            setShowForm(false)
            loadProjects()
        }catch(err){
            console.log(err.message)
        }
    }
    function handleLogout(){
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return(
        <>
        {projects.map((data) => {
            return <li key={data.id}><Link to={`/projects/${data.id}`}>{data.name}</Link></li>
        })}
        <button onClick={() => setShowForm(!showForm)}>Add Project</button>
        {showForm && (
            <div>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
                <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Description" />
                <input type="date" value={projectDate} onChange={(e) => setProjectDate(e.target.value)} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        )}
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}


