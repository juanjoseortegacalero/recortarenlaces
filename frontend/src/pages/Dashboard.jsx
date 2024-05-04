import { useContext } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../content/userContext";

export default function Dashboard(){
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const logOut=  () => {
            axios.get('/logout')
            navigate('/')
    }
      
    return(
        <>
        <div className="form">
            <h1>
                Página de usuario
            </h1>
            {!!user &&(<h2>¡Buenos días, {user.name}!</h2>)}
            <button className='submitBtnred' onClick={logOut}>Cerrar sesión</button>
        </div>
        </>
    )
}