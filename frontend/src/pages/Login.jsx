import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser= async (e) => {
        e.preventDefault()
        
        const {email, password} = data
        try {
            const{data} = await axios.post('/login', {
                email,
                password 
            });
            if(data.error){
                toast.error(data.error)
                } else {
                setData({});
                toast.success('Sesión iniciada.')
                navigate('/dashboard')
                }
            } catch (error) {
                console.log(error)
            }
        }

    return(
        <div className="signupFrm">
<form onSubmit={loginUser} className="form">
  <h1 className="title">Inicia sesión</h1>

  <div className="inputContainer">
    <input type="text" className="input" placeholder='introduce email...' value={data.email} onChange={(e,) => setData({...data, email:e.target.value})}/>
    <label  className="label">Email</label>
  </div>

  <div className="inputContainer">
    <input type="password" className="input" placeholder='introduce contraseña...' value={data.password} onChange={(e,) => setData({...data, password:e.target.value})}/>
    <label className="label">Contraseña</label>
  </div>

  <input type="submit" className="submitBtn" value="Iniciar sesión"/>
</form>
</div>
    )
}