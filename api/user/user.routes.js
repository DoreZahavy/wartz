import express from 'express'
import { getUsers, deleteUser, addUser, resetPoints } from './user.controller.js'
import { requireAdmin } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('/',requireAdmin, getUsers)
router.post('/', requireAdmin, addUser)
router.delete('/:id', requireAdmin, deleteUser)
router.put('/reset-points', requireAdmin, resetPoints)

export const userRoutes = router