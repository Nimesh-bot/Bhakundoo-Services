// const {verifyAccess} = require('../services/verifytoken')

// exports.auth_user = async(req, res, next)=>{
//     var accessToken = req.header("Authorization")

//     try{
//         if(!accessToken){
//             return res.status(401).json({"Unauthenticated": "No token found"})
//         }

//         if(accessToken.startsWith("Bearer")){
//             accessToken = accessToken.split(" ")[1]
//         }

//         var verify = await verifyAccess(accessToken)

//         if(verify.Error === "jwt expired"){
//             return res.status(401).json({"Unauthenticated": "Token expired"})
//         }

//         if(verify.Error){
//             return res.status(401).json({"Unauthenticated": "Invalid token"})
//         }
//         req.user = verify.aud
//         next()

//     }catch(err){
//         next(err)
//     }
// }

const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const auth_user = (req, res, next) => {
    try {
        var token = req.header("Authorization")
        console.log(token);
        if(!token) return res.status(400).json({msg: "Invalid."})

        if(token.startsWith("Bearer")){
            token = token.split(" ")[1]
        }

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    auth_user
}