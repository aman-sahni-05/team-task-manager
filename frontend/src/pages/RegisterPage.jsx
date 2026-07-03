import { useState } from "react"
import { register } from "../services/authServices"
import { useNavigate } from "react-router-dom"


export default function RegisterPage(){
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    async function handleSubmit() {
        try{
            const data = await register(name,email,username,password)
            navigate('/')
        }catch(err){
            console.log(err.message)
        }

    }


    return(
        <>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}