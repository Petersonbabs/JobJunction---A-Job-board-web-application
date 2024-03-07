
const sendDuplicateError = (err, res) => {
    const errKey = Object.keys(err.keyValue)[0]
    const errVal = Object.values(err.keyValue)[0]
    const message = `The ${errKey} ${errVal} already exists.`
    const error = new Error(message);
    error.statusCode = 400;

    return error

}

const sendCastError = (err, res) => {
    const message = `${err.path} ${err.value} is not valid`
    const error = new Error(message)
    return error
}

const handleProdError = (err, res) => {

    //  Duplicate Error
    if(err.code == 11000) {
        const error = sendDuplicateError(err)
        res.status(error.statusCode).json({
            status: "Failed",
            message: error.message
        })
    } else if (err.name == "CastError") {
        const error = sendCastError(err)
        
        res.status(404).json({
            error: error.message
        })

        return
    }

}

module.exports = handleProdError