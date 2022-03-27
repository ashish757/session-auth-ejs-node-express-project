const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require("express")
const authMiddle = require("./middlewares/auth")
const session = require("express-session")

const app = express()

const dbURI = "mongodb+srv://ashish757:Ashish757@cluster0.sx5d0.mongodb.net/session-auth?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(result => app.listen(8000, () => console.log("lisining on 8000")))
    .catch(err => console.log("MONGOOSE", err))


const corsOptions = {
    origin: "http://localhost:5500",
    methods:  "GET,POST,PATCH,DELETE",
    allowedHeaders: 'content-type',
    credentials: true
}

app.set('view engine', 'ejs');
app.use(cors(corsOptions))
app.use(express.json())

app.use(session({
    secret: 'secretKEY',
    resave: false,
    saveUninitialized: false,
    name: "sid",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    }
}))

app.use('/api', authRoutes)

app.get("/", (req, res) => {
    res.render('pages/index')
})



app.get('/secret', authMiddle, (req, res) => {
    res.json({msg: `hi, ${req.session.user.email}`, status: true})
})

app.delete('/logout', authMiddle, (req, res) => {
    req.session.destroy((err) => {
        if(err) res.json({msg: `still loggedin`, status: false})
        res.clearCookie("sid")
        res.json({msg: `loggedout`, status: true})

    })
})



// app.use(errorHandler)

app.all("*", (req, res) => {
    res.status(404).send("<strong><h1>404</h1></strong>")
})
