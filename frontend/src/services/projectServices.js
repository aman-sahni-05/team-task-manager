import { apiFetch } from "./apiHelper"

async function getProjects(){
    const response = await apiFetch('http://localhost:5000/projects',{
        method: 'GET',
        headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
        }    
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

async function getTasks() {
    const response = await apiFetch('http://localhost:5000/tasks',{
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

async function getProjectsTasks(id) {
    const response = await apiFetch(`http://localhost:5000/projects/${id}/tasks`,{
        method: "GET",
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

async function createProject(name,description,due_date) {
    const response = await apiFetch('http://localhost:5000/projects',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': 'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify({name,description,due_date})
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

async function createTask(title,description,project_id,due_date,assigned_to) {
    const response = await apiFetch('http://localhost:5000/tasks',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': 'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,project_id,due_date,assigned_to})
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

export { getProjects,getProjectsTasks,getTasks,createProject,createTask }