const User = require('../models/user')
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    const {email, password} = req.body
     if ( email && password) {
         res.json({status: true, email, password})
     }

}

const signup = async (req, res) => {
    const {email, password} = req.body
 
}


module.exports = {login, signup}