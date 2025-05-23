import Cryptr from 'cryptr'

import { userService } from '../user/user.service.js'
import { loggerService } from '../../services/logger.service.js'

const cryptr = new Cryptr(process.env.SECRET || 'Secret-Puk-1234')

export const authService = {
    getLoginToken,
    validateToken,
    login,
    signup
}


function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptedStr = cryptr.encrypt(str)
    return encryptedStr
}

function validateToken(token) {
    try {
        const json = cryptr.decrypt(token)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

async function login(code) {
    var user = await userService.getUserByCode(code)

    if (!user) throw 'Unkown code'

    const miniUser = {
        _id: user._id,
        name: user.name,
        pointsLeft: user.pointsLeft,
        activities: user.activities,
    }
    return miniUser

}

async function signup(name, code) {

    loggerService.debug(`auth.service - signup with name: ${name}`)
    if (!name) throw 'Missing required signup information'

    const userExist = await userService.getUserByName(name)
    if (userExist) throw 'Username already taken'

    return userService.add(name)
}