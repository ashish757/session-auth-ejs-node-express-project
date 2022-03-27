
const auth = (req, res, next) => {
    // console.log(req.headers.cookie);
    // console.log(req.session);
    if (req.session.user) return next()

    return res.status(401).json({status: false, msg:"Not Authenticted"})
}

module.exports = auth