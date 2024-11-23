import express from 'express'
import { login, logout, signup } from './auth.controller.js'
import { requireAdmin } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/signup',requireAdmin, signup)
router.post('/logout', logout)

export const authRoutes = router