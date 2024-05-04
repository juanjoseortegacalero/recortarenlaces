import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

export default function Lista(){
    const [urls, setUrl] = useState([])
    useEffect( ()=>{
        getUrls()
    },[])

    const [last, setlastUrl] = useState([])
    useEffect( ()=>{
        lastUrl()
    },[])

    //procedimineto para mostrar todos los enlaces
    const getUrls = async () => {
        const res = await axios.get('/verEnlace')
        setUrl(res.data)
    }

    const lastUrl = async () => {
        const res = await axios.get('/ultimoEnlace')
        setlastUrl(res.data)
    }

    return(
        <div>
        <div className="tables">
            <div>
            <h3>Último URL acortado</h3>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className='tableTheadBg'>
                            <tr>
                                <th>URL Completo</th>
                                <th>URL Acortado</th>
                                <th>Visitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            { last.map ( (url, index) => (
                                <tr key={ index }>
                                   <td><a href={ url.full }>{ url.full }</a></td>
                                   <td><a href={ url.short }>{ url.short }</a></td>
                                    <td> { url.clicks } </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
        <div>
            <h3>URLs más visitadas</h3>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className='tableTheadBg'>
                            <tr>
                                <th>URL Completo</th>
                                <th>URL Acortado</th>
                                <th>Visitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            { urls.map ( (url, index) => (
                                <tr key={ index }>
                                   <td><a href={ url.full }>{ url.full }</a></td>
                                   <td><a href={ url.short }>{ url.short }</a></td>
                                    <td> { url.clicks } </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
    </div>
    </div>
    )
}
