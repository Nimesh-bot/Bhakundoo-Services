const jwt = require('jsonwebtoken')

const secret1 = process.env.ACCESS_TOKEN_SECRET
const secret2 = process.env.REFERESH_TOKEN_SECRET

const verifyAccess = async(token)=>{
    const dec = jwt.verify(token, secret1, (err, decod)=>{
        if(err){
            return {"Error": err.message}
        }
        return decod
    })

    return dec
}

const verifyRefresh = async(token)=>{
    const dec = jwt.verify(token, secret2, (err, decod)=>{
        if(err){
            return {"Error": err.message}
        }
        return decod
    })
    return dec
}

module.exports = {verifyAccess, verifyRefresh }