import { utilService } from '../../services/util.service.js'
import { userService } from '../user/user.service.js'

export const scoreService = {
  query,
  raiseScore,
  saveNewBoard,
  
}

var scoreBoard = utilService.readJsonFile('./data/score.json')

function query() {
  return Promise.resolve(scoreBoard)
}

async function raiseScore(houseName, amount, userId) {
  await userService.spendPoints(amount, userId)

  const houseScore = scoreBoard.find((house) => house.houseName === houseName)

  if (houseScore) {
    houseScore.score += amount

    return utilService.saveToFile('score', scoreBoard).then(() => scoreBoard)
  } else throw new Error('edit not available')
}

function saveNewBoard() {
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

  utilService.saveToFile('score', scoreBoard)
}

