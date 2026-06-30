import { useState } from "react"
import { login } from "../services/authServices"
import { useNavigate } from "react-router-dom"

export default function LoginPage(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    async function handleSubmit(){
        try{
            const data = await login(username,password)
            localStorage.setItem('token',data.jwtToken)
            navigate('/dashboard', {replace: true})
        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value) } placeholder="Enter Username"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}