import { authService } from './auth.service.js'
import { loggerService } from './../../services/logger.service.js';

export async function login(req, res) {
    const { code } = req.body
    
    try {
        const user = await authService.login(code)
      
        const loginToken = authService.getLoginToken(user)
        loggerService.info('User login: ', user.name)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(user)
    } catch (err) {
        loggerService.error('Failed to Login ' , err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

export async function signup(req, res) {
    try {
        const {name} = req.body
     
        const user = await authService.signup(name)
        loggerService.info(`new account created: ` + JSON.stringify(account))

        res.json(user)
    } catch (err) {
        loggerService.error('Failed to signup ' + err)
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