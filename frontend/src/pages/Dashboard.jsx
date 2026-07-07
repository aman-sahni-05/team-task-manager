import { getProjects } from "../services/projectServices"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Dashboard(){
    const [projects, setProjects] = useState([])
    useEffect(() => {
        async function fetchData() {
            try{

                const data = await getProjects()
                setProjects(data)
            }catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    },[])

    return(
        <>
        {projects.map((data) => {
            return <li key={data.id}><Link to={`/projects/${data.id}`}>{data.name}</Link></li>
        })}
        </>
    )
}