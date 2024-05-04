const express = require ('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require ('mongoose')
const cookieParser = require ('cookie-parser')
const app= express();


//Conection database
mongoose.connect(process.env.MONGODB_URI) .then(()=> console.log('Database Connected')) .catch(()=> console.log('Database Connected', err))

//Middleware
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

//Middleware
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
