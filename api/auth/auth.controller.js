import { authService } from './auth.service.js'
import { loggerService } from './../../services/logger.service.js'
import { userService } from '../user/user.service.js'

export async function login(req, res) {
    const { code } = req.body
    console.log("🚀 ~ login ~ code:", code)

    try {
        const user = await authService.login(code)

        const loginToken = authService.getLoginToken(user)
        loggerService.info('User login: ', user.name)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(user)
    } catch (err) {
        loggerService.error('Failed to Login ', err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

export async function signup(req, res) {

    try {
        const { name, code, pointsLeft } = req.body
        const userExist = await userService.getUserByName(name)
        if (userExist) throw 'Username already taken'

        const addedUser = await userService.add(name, code, pointsLeft)
        // const addedUser = await authService.signup(name, code)
        loggerService.info(`new account created: ` + JSON.stringify(addedUser))
        res.send(addedUser)
    } catch (err) {
        loggerService.error('Failed to signup', err)
        res.status(400).send({ err: 'Failed to signup' })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(400).send({ err: 'Failed to logout' })
    }
}