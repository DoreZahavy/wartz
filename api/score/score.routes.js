import express from 'express'
import {  getScoreBoard, raiseScore } from './score.controller.js'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()


router.get('/', log, getScoreBoard)
router.put('/', requireAuth, raiseScore)




export const scoreRoutes = router