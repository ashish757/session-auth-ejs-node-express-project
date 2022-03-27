const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require("express")
const authMiddle = require("./middlewares/auth")
const session = require("express-session")

const app = express()


const dbURI = "mongodb+srv://ashish757:Ashish757@cluster0.sx5d0.mongodb.net/session-auth?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(result => app.listen(8080, () => console.log("lisining on 8000")))
    .catch(err => console.log(err))


const corsOptions = {
    origin: "*",
    methods:  "GET,POST,PATCH,DELETE",
    allowedHeaders: 'content-type'
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(session({
    secret: 'secretKEY',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))



app.use('/api', authRoutes)

app.get('/secret', authMiddle, (req, res) => {
    res.json({msg: `hi, ${req.user.name}`, data: "your secret data"})
})


// app.use(errorHandler)

app.all("*", (req, res) => {
    res.status(404).send("<strong><h1>404</h1></strong>")
})
