import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom"

export default function Register(){
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = data
        try {
            const {data} = await axios.post('/register', {
                name, email, password})
            if(data.error){
                toast.error(data.error)
            } else{
                setData({})
                toast.success('Registro completado.')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }

    }

    
    return (
        
<div className="signupFrm">
<form onSubmit={registerUser} className="form">
  <h1 className="title">Regístrate</h1>

  <div className="inputContainer">
    <input type="text" className="input" placeholder='introduce email...' value={data.email} onChange={(e,) => setData({...data, email:e.target.value})}/>
    <label  className="label">Email</label>
  </div>

  <div className="inputContainer">
    <input type="text" className="input" placeholder='introduce nombre...' value={data.name} onChange={(e,) => setData({...data, name:e.target.value})}/>
    <label  className="label">Nombre</label>
  </div>

  <div className="inputContainer">
    <input type="password" className="input" placeholder='introduce contraseña...' value={data.password} onChange={(e,) => setData({...data, password:e.target.value})}/>
    <label className="label">Contraseña</label>
  </div>

  <input type="submit" className="submitBtn" value="Registrarse"/>
</form>
</div>
    )
}
