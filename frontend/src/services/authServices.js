
async function login(username,password){
    const response = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,password})
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

async function register(name,email,username,password) {
    const response = await fetch("http://localhost:5000/auth/register",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,username,password})
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

export {login,register}