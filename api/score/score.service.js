import { utilService } from '../../services/util.service.js'
import { userService } from '../user/user.service.js'

export const scoreService = {
  query,
  raiseScore,
  saveNewBoard,
  scoresToCSV

}

var scoreBoard = utilService.readJsonFile('./data/score.json')

function query() {
  return Promise.resolve(scoreBoard)
}

async function raiseScore(houseName, amount, userId) {
  userService.spendPoints(amount, userId, houseName)
  const houseScore = scoreBoard.find((house) => house.houseName === houseName)

  if (houseScore) {
    houseScore.score += amount

    return await utilService.saveToFile('score', scoreBoard).then(() => scoreBoard)
  } else throw new Error('edit not available')
}

async function saveNewBoard() {
  scoreBoard = [
    {
      houseName: 'Slytherin',
      score: 0,
    },
    {
      houseName: 'Hufflepuff',
      score: 0,
    },
    {
      houseName: 'Ravenclaw',
      score: 0,
    },
    {
      houseName: 'Gryffindor',
      score: 0,
    },
  ]

  return await utilService.saveToFile('score', scoreBoard).then(() => scoreBoard)
}

function scoresToCSV() {
  const header = 'House Name,Score\n'
  const rows = scoreBoard.map(house => `${house.houseName},${house.score}`).join('\n')
  return header + rows
}

