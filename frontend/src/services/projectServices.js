

async function getProjects(){
    const response = await fetch('http://localhost:5000/projects',{
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
    const response = await fetch('http://localhost:5000/tasks',{
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
    const response = await fetch(`http://localhost:5000/projects/${id}/tasks`,{
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

export { getProjects,getProjectsTasks,getTasks }