const errorHandler = (err, req, res, next) => {
    // console.log("ERROR", err);
    res.status(500).json({msg: "internal server error"})
}

module.exports = errorHandler