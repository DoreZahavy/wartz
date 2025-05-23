import express from 'express'
import {  getCSV, getScoreBoard, raiseScore, resetScores } from './score.controller.js'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()


router.get('/', log, getScoreBoard)
router.get('/csv', requireAdmin, getCSV)
router.put('/', requireAuth, raiseScore)
router.put('/reset-scores', requireAdmin, resetScores)





export const scoreRoutes = router