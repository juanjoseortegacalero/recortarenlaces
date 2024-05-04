const User = require ('../models/user');
const urlModel = require ('../models/shortUrl');
const { hashPassword, comparePassword } =require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

//Register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //Check if name is entered
        if(!name){
            return res.json({
                error:'name is required'
            })
        };//Check if password is valid
        if(!password||password.length < 6){
            return res.json({
                error:'password is required and should be at least 6 characters long'
            })
        };
        //Check email
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error:'email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)
        //Create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

//Login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        //Check if user exist
        const user= await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }

        //Check if password match
        const match= await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => 
            {
            if(err) throw err;
            res.cookie('token', token).json(user)
            })
        if(!match){
            res.json({
                error: "Passwords do not match"
            })
        }
    }} catch (error) {
        console.log(error)
    }
}

//getProfile endpoint
const getProfile =(req, res) =>{
const {token} = req.cookies 
if(token){
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.json(user)
    })
} else{
    res.json(null)
}
}

//Logout 
const logOut =(req, res)=>{
    const {token} = req.cookies 
    if(token){
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.clearCookie('token')
        res.json(user)    
        //return res.json({Status: 'Success'})
    })
} else{
   res.json(null)
}
    
}

//Cortar enlaces
const cortarEnlace = async (req, res)=>{
   const {full} = req.body;
   const url = await urlModel.create({full})
   return res.json(url)   
}

const verEnlace = async (req, res)=>{
    try{
        const urls = await urlModel.find().sort({clicks:-1}).limit(10)
        res.status(200).json(urls)
    } catch (error){
        res.json( { message: error.message})
    }
  }

  const ultimoEnlace = async (req, res)=>{
    try{
        const urls = await urlModel.find().sort({_id:-1}).limit(1)
        res.status(200).json(urls)
    } catch (error){
        res.json( { message: error.message})
    }
  }

const reDirect = async (req, res) => {
      const shortUrl = await urlModel.findOne({short: req.params.id })
        console.log(shortUrl)
      if (shortUrl == null) return res.sendStatus(404)
    
        res.status(200).json({url: shortUrl.full})
        
        shortUrl.clicks++

        shortUrl.save()
        
        //res.redirect(shortUrl.full)
    }

module.exports={
    test,
    registerUser,
    loginUser,
    getProfile,
    logOut,
    cortarEnlace,
    verEnlace,
    reDirect,
    ultimoEnlace
}
