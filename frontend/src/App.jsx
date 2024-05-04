import axios from 'axios';
import './App.css'
import './index.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar.jsx';
import Register from '../src/pages/Register.jsx'
import Login from '../src/pages/Login.jsx'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../content/userContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cortador from './pages/Cortador.jsx';
import Lista from './pages/Lista.jsx';
import Redirect from './pages/shortId.jsx';

axios.defaults.baseURL = 'https://recortaenlaces-b4d82e2ca64b.herokuapp.com';
axios.defaults.withCredentials = true;


function App() {
  
  return (
    <div className='app'>
    <UserContextProvider>
    <Navbar />
    <Toaster position='bottom-right' toastOptions={{duration: 2000}}/> 
    <Routes>
      <Route path='/' element={<Cortador />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/:id' element={<Redirect />}></Route>
    </Routes>
      <Lista></Lista>
    </UserContextProvider>
    <footer className="footer">Made by <a href="https://jjportfolio.onrender.com/" target="_blank">Juan José Ortega Calero</a>. Copyright 2024©</footer>
    </div> 
  )
}

export default App
