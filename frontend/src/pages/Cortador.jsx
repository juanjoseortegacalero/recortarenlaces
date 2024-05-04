import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';

export default function Cortador(){
    const [data, setData] = useState({
        full: '',
    })

    const cortaURL = async (e) => {
        e.preventDefault();
        const {full} = data
        try {
            const {data} = await axios.post('/corta', {full});
            if(data.error){
                toast.error(data.error)
            } else{
                setData({})
                toast.success('Corte exitoso.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="signupFrm">
            
            <form className="form2" onSubmit={cortaURL}>
            <h3>Recorta aquí tu URL</h3>
            <div className="inputContainer">
            <input type="url" className="input2" value={data.full} onChange={(e,) => setData({...data, full:e.target.value})} required></input>
            
            <button className="submitBtn2" type="submit">RECÓRTALO</button></div>
            </form>
        </div>  
    )

}