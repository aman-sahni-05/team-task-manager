import { getProjectsTasks } from "../services/projectServices"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function ProjectDetails(){
    const [projectTask,setProjectTask] = useState([])
    const { id } = useParams()
    useEffect(() => {
        async function fetchData() {
            try{
                const data = await getProjectsTasks(id)
                setProjectTask(data)
            }catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    },[])

    return(
        <>
        {
            projectTask.map((data) => {
                return <li key={data.id}>{data.title}</li>
            })
        }
        </>
    )
}