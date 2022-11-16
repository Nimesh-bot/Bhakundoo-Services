const Users = require('../models/user.model')
const fetch = require('node-fetch')
const bcrypt = require('bcrypt')
const {google} = require('googleapis')
const jwt = require('jsonwebtoken')

const {OAuth2} = google.auth
const MAILING_SERVICE_CLIENT_ID = process.env.MAILING_SERVICE_CLIENT_ID
const client = new OAuth2(MAILING_SERVICE_CLIENT_ID)

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
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

            // const access_token = await access_token(user._id)
            // const refresh_token = await refresh_token(user._id)

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/',
                maxAge: 7*24*60*60*1000,
                domain: 'localhost:3000',
                sameSite: 'None',
                secure: false, // 7 days
            }).json(user)

            // res.json(user)
        }else{
            const newUser = new Users({
                name, email, password: passwordHash, avatar: picture
            })

            await newUser.save()
            
            // const access_token = await access_token(newUser._id)
            // const refresh_token = await refresh_token(newUser._id)

            const refresh_token = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                
                path: '/',
                maxAge: 7*24*60*60*1000,
                domain: 'localhost:3000', 
                sameSite: 'None',
                secure: false,// 7 days
            }).json({ msg: 'Login Success! '})

            // res.json({msg: "Login success!"})
        }


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

module.exports = {
    googleLogin,
    createAccessToken
}