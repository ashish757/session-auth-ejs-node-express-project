const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require("express")
const authMiddle = require("./middlewares/auth")
const session = require("express-session")
const User = require("./models/user")
const MongoDBStore = require('connect-mongodb-session')(session);
const ejs = require('ejs');
ejs.delimiter = '?';

const app = express()
const corsOptions = {
    origin: "http://localhost:5500",
    methods:  "GET,POST,PATCH,DELETE",
    allowedHeaders: 'content-type',
    credentials: true
}
const dbURI = "mongodb+srv://ashish757:<pass]>@cluster0.sx5d0.mongodb.net/session-auth?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(result => app.listen(8000, () => console.log("lisining on 8000")))
    .catch(err => console.log("MONGOOSE", err))

let store = new MongoDBStore({
        uri: 'mongodb+srv://ashish757:Ashish757@cluster0.sx5d0.mongodb.net',
        collection: 'mySessions', 
        databaseName: "session-auth"
      });


app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(cors())
app.use(express.json())

app.use(session({
    secret: 'secretKEY',
    resave: false,
    saveUninitialized: false,
    store: store,
    name: "sid",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    }
}))

app.use('/api', authRoutes)

app.get("/", async (req, res) => {
    const users = await User.find()

    res.render('pages/index', {auth: req.session.auth, users})
})
app.get("/auth/signin", (req, res) => {
    res.render('pages/login', {auth: req.session.auth})
})

app.post("/auth/signin",  async(req, res) => {
    const {username, password} = req.body
    if (username && password) {
        const user = await User.findOne({username}) 
        if (user) {
            if (user.password === password) {
                req.session.user = user._id
                req.session.auth = true
                res.json({status: true})
            }
        }
    }
})

app.get("/auth/signup", (req, res) => {
    
    res.render('pages/signup', {auth: req.session.auth})
})
app.post("/auth/signup", async (req, res) => {
    const {username, email, password} = req.body
    const user = new User({username, email, password})
    const savedUser = await user.save()
    req.session.user = savedUser._id
    req.session.auth = true
    res.json({user: savedUser, status: true})
})


app.get('/user/:id', authMiddle, async (req, res) => {
    const id = req.params
    const user = await User.findOne({id: id})

    res.json({user: user, status: true})
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
