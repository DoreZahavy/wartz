import { authService } from '../api/auth/auth.service.js'

export function requireAuth(req, res, next) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')

  req.loggedinUser = loggedinUser
  next()
}

export function requireAdmin(req, res, next) {
    console.log('admin')
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
      if (loggedinUser.name !== 'Dean') {
        logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
        return res.status(403).end('Not Authorized')
      }
      
      req.loggedinUser = loggedinUser
      console.log('admin pass')
  next()
}
