const User = require('../models/user')
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    if (req.session.user) return res.json({status: false, msg: "you are alresdy authenticated", user: req.session.user})
    
    const {email, password} = req.body
     if ( email && password) {
        req.session.user = {email, password}
        res.json({status: true, email, password, session: req.session})
     }

}

const signup = async (req, res) => {
    const {email, password} = req.body
 
}


module.exports = {login, signup}