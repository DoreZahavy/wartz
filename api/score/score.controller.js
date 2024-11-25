// Car CRUDL API
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
      req.loggedinUser.id
    )
    loggerService.info(
      `${req.loggedinUser.name} gave ${houseName} ${amount} points`
    )
    res.send(scoreBoard)
  } catch (err) {
    res.status(400).send(`Couldn't raise points`)
  }
}

export function resetScores() {
  

  scoreService.saveNewBoard()
  res.send({ msg: 'Reset successfully' })
}



