import { dbService } from '../../services/db.service.js'
import { utilService } from '../../services/util.service.js'
import { userService } from '../user/user.service.js'

export const scoreService = {
  query,
  raiseScore,
  saveNewBoard,
  scoresToCSV

}


async function query() {
  try {
    const collection = await dbService.getCollection('score')
    const scoreBoard = await collection.find({}).toArray()
    return scoreBoard
  } catch (err) {
    console.error('Failed to query scores:', err)
    throw err
  }
}



async function raiseScore(houseName, amount, userId) {
  try {
    await userService.spendPoints(amount, userId, houseName)

    const collection = await dbService.getCollection('score')

    const updateResult = await collection.updateOne(
      { houseName },
      { $inc: { score: amount } }
    )

    if (updateResult.matchedCount === 0) {
      throw new Error('House not found')
    }

    const updatedScoreBoard = await collection.find({}).toArray()
    return updatedScoreBoard
  } catch (err) {
    console.error('Failed to raise score:', err)
    throw err
  }
}



async function saveNewBoard() {
  const scoreBoard = [
    { houseName: 'Slytherin', score: 0 },
    { houseName: 'Hufflepuff', score: 0 },
    { houseName: 'Ravenclaw', score: 0 },
    { houseName: 'Gryffindor', score: 0 },
  ]

  try {
    const collection = await dbService.getCollection('score')

    await collection.deleteMany({})

    await collection.insertMany(scoreBoard)

    return scoreBoard
  } catch (err) {
    console.error('Failed to save new board:', err)
    throw err
  }
}

async function scoresToCSV() {
  try {
    const collection = await dbService.getCollection('score')
    const scoreBoard = await collection.find({}).toArray()
    const header = 'House Name,Score\n'
    const rows = scoreBoard.map(house => `${house.houseName},${house.score}`).join('\n')
    return header + rows
  } catch (err) {
    console.error('Failed to generate CSV from scores:', err)
    throw err
  }
}

