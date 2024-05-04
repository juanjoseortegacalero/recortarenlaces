const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logOut, cortarEnlace, verEnlace, reDirect, ultimoEnlace} = require('../controllers/authControllers')

//Middleware

router.use(
    cors({
        credentials: true,
        origin: 'https://recortarenlaces.vercel.app'
        
    })
)


router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logOut)
router.post('/corta', cortarEnlace)
router.get('/verEnlace', verEnlace)
router.get('/ultimoEnlace', ultimoEnlace)
router.post('/:id', reDirect)


module.exports = router

