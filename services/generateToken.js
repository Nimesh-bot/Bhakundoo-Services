const jwt = require('jsonwebtoken')

const secret1 = process.env.ACCESS_TOKEN_SECRET
const secret2 = process.env.REFERESH_TOKEN_SECRET

const access_token = async(_id, session_id="", time='30d') =>{
    const payload = {session_id}
    const token = jwt.sign(payload, secret1, {expiresIn: time, issuer: 'bhakundoo', audience: String(_id)})
    return token
}

const refresh_token = async(_id, session_id="", time='60d') =>{
    const payload = {session_id}
    const token = jwt.sign(payload, secret2, {expiresIn: time, issuer: 'bhakundoo', audience: String(_id)})
    return token
}

module.exports = { access_token, refresh_token }