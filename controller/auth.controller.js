const Users = require('../models/user.model')
const fetch = require('node-fetch')
const bcrypt = require('bcrypt')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const MAILING_SERVICE_CLIENT_ID = process.env.MAILING_SERVICE_CLIENT_ID
const client = new OAuth2(MAILING_SERVICE_CLIENT_ID)
const jwt = require('jsonwebtoken')
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const GOOGLE_SECRET = process.env.GOOGLE_SECRET

const googleLogin =  async (req, res) => {
    try {
        const {tokenId} = req.body

        const verify = await client.verifyIdToken({idToken: tokenId, audience: MAILING_SERVICE_CLIENT_ID})
        
        const {email_verified, email, name, picture} = verify.payload

        const password = email + GOOGLE_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

        if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

        const user = await Users.findOne({email})

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }else{
            const newUser = new Users({
                name, email, password: passwordHash, avatar: picture
            })

            await newUser.save()
            
            const refresh_token = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = {
    googleLogin
}