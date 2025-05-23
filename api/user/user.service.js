import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { utilService } from '../../services/util.service.js'

const users = utilService.readJsonFile('data/user.json')

const USER_STARTER_POINTS = 20

export const userService = {
  query,
  getUserByName,
  remove,
  add,
  getUserByCode,
  spendPoints,
  refreshPoints
}

async function query() {
 try {
    const collection = await dbService.getCollection('user')
    const users = await collection.find({}).toArray()
    return users
  } catch (err) {
    console.error('Failed to query users:', err)
    throw err
  }}

async function getUserByCode(code) {
  try {


    const collection = await dbService.getCollection('user')
    return await collection.findOne({ code })
  } catch (err) {
    logger.error(`cannot get user by code`, err)
    throw err
  }

}
async function getUserByName(name) {
  try {


    const collection = await dbService.getCollection('user')
    return await collection.findOne({ name })
    // return users.find((user) => user.code === code)
  } catch (err) {
    logger.error(`cannot get user by code`, err)
    throw err
  }

}

async function remove(userId) {
  // const userIdx = users.findIndex((user) => user.id == userId)
  // users.splice(userIdx, 1)
  // // users = users.filter((user) => user._id !== userId)
  // return utilService.saveToFile('user', users)

  try {
    const criteria = { _id: ObjectId.createFromHexString(userId) }

    const collection = await dbService.getCollection('user')
    await collection.deleteOne(criteria)
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }

}

async function add(name, code, pointsLeft = USER_STARTER_POINTS) {
  try {

    const userToAdd = {
      // id: utilService.makeId(5),
      name,
      code: code ? code : utilService.makeId(3),
      pointsLeft,
      activities: [],
    }
    // users.push(user)
    // return utilService.saveToFile('user', users).then(() => user)
    const collection = await dbService.getCollection('user')
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    logger.error('cannot add user', err)
    throw err
  }


}

async function spendPoints(amount, userId, houseName) {
  console.log("🚀 ~ spendPoints ~ houseName:", houseName)
  console.log("🚀 ~ spendPoints ~ amount:", amount)
  console.log("🚀 ~ spendPoints ~ userId:", userId)
  try {
    const collection = await dbService.getCollection('user')
    const _id = ObjectId.createFromHexString(userId)

    // Step 1: Fetch user
    const user = await collection.findOne({ _id })
    if (!user) throw new Error('Cannot find user')
    if (user.pointsLeft < amount) throw new Error('Insufficient funds')

    // Step 2: Build updated fields
    const updatedFields = {
      pointsLeft: user.pointsLeft - amount,
      $push: {
        activities: {
          at: Date.now(),
          action: `${user.name} gave ${amount} points to ${houseName}`,
        },
      },
    }

    // Step 3: Update user in MongoDB
    await collection.updateOne(
      { _id },
      {
        $set: { pointsLeft: updatedFields.pointsLeft },
        $push: updatedFields.$push,
      }
    )

    return { success: true }
  } catch (err) {
    console.error('Failed to spend points:', err)
    throw err
  }
}

function spendPoints1(amount, userId, houseName) {
  const user = users.find((user) => user.id == userId)
  if (!user) throw new Error('Cannot find user')
  if (user.pointsLeft < amount) throw new Error('Insufficient funds')
  user.pointsLeft -= amount
  user.activities.push({
    at: Date.now(),
    action: `${user.name} game ${amount} points to ${houseName}`
  })
  utilService.saveToFile('user', users)
}

async function refreshPoints1(amount = USER_STARTER_POINTS) {
  users.forEach((user) => {
    user.pointsLeft = +amount
  })

  return await utilService.saveToFile('user', users).then(() => users)
}

async function refreshPoints(amount = USER_STARTER_POINTS) {
  try {
    const collection = await dbService.getCollection('user')

    // Step 1: Update all users
    await collection.updateMany({}, { $set: { pointsLeft: +amount } })

    // Step 2: Fetch updated users to return
    const updatedUsers = await collection.find({}).toArray()

    return updatedUsers
  } catch (err) {
    console.error('Failed to refresh points:', err)
    throw err
  }
}