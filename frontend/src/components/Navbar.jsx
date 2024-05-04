import {Link} from 'react-router-dom'

export default function Navbar(){
    return(
    <nav className='nav'>
        <div className='h-screen flex flex-col items-center gap-6'>
        <a href="/" className='site-title'>
            <h1>RECORTA-ENLACES</h1>
        </a>
        </div>
            <ul>
                <li>
                    <a> 
                        <Link to='/'>
                        <button className="navbarBtn" type="button">
                            Inicio
                        </button>
                        </Link>
                    </a>
                </li>
                <li>
                    <a>
                        <Link to='/register'>
                        <button className="navbarBtn" type="button">
                            Registro
                        </button>
                        </Link>
                    </a>
                </li>
                <li>
                    <a>
                    <Link to='/login'>
                        <button className="navbarBtn" type="button">
                            Iniciar sesión
                        </button>
                    </Link>
                    </a>
                </li>
                <li>
                    <a>
                    <Link to='/dashboard'>
                        <button className="navbarBtn" type="button">
                            Usuario
                        </button>
                    </Link>
                    </a>
                </li>
            </ul>
        </nav>
    )
}