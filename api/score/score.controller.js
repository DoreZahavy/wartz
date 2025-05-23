import { loggerService } from '../../services/logger.service.js'
import { scoreService } from './score.service.js'

export async function getScoreBoard(req, res) {
  try {
    const scoreBoard = await scoreService.query()
    res.send(scoreBoard)
  } catch (err) {
    res.status(400).send(`Couldn't get scores`)
  }
}

export async function raiseScore(req, res) {
  const { houseName, amount } = req.body

  try {
    const scoreBoard = await scoreService.raiseScore(
      houseName,
      amount,
      req.loggedinUser._id
    )
    loggerService.info(
      `${req.loggedinUser.name} gave ${houseName} ${amount} points`
    )
    res.send(scoreBoard)
  } catch (err) {
    res.status(400).send(`Couldn't raise points`)
  }
}

export async function resetScores(req, res) {

  const scoreBoard = await scoreService.saveNewBoard()
  res.send(scoreBoard)
}

export async function getCSV(req, res) {

  try {
    const csv = await scoreService.scoresToCSV()
    res.setHeader('Content-Disposition', 'attachment; filename="house_scores.csv"')
    res.setHeader('Content-Type', 'text/csv')
    res.send(csv)

  } catch (err) {
    res.status(500).send('Failed to generate CSV')
  }

}




