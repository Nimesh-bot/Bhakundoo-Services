const {verifyAccess} = require('../service/verifytoken')

exports.auth_user = async(req, res, next)=>{
    var accessToken = req.header("Authorization")

    try{
        if(!accessToken){
            return res.status(401).json({"Unauthenticated": "No token found"})
        }

        if(accessToken.startsWith("Bearer")){
            accessToken = accessToken.split(" ")[1]
        }

        var verify = await verifyAccess(accessToken)

        if(verify.Error === "jwt expired"){
            return res.status(401).json({"Unauthenticated": "Token expired"})
        }

        if(verify.Error){
            return res.status(401).json({"Unauthenticated": "Invalid token"})
        }
        req.user = verify.aud
        next()

    }catch(err){
        next(err)
    }
}