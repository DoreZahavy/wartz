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
  return users
}

async function getUserByCode(code) {
  return users.find((user) => user.code === code)
}
async function getUserByName(code) {
  return users.find((user) => user.name === name)
}

async function remove(userId) {
  const userIdx = users.findIndex((user) => user.id == userId)
  users.splice(userIdx, 1)
  // users = users.filter((user) => user._id !== userId)
  return utilService.saveToFile('user', users)
}

async function add(name, code) {
  const user = {
    id: utilService.makeId(5),
    name,
    code: code ? code : utilService.makeId(3),
    pointsLeft: USER_STARTER_POINTS,
    activities: [],
  }
  users.push(user)
  return utilService.saveToFile('user', users).then(() => user)
}

function spendPoints(amount, userId, houseName) {
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

async function refreshPoints(amount = USER_STARTER_POINTS) {
  users.forEach((user) => {
    user.pointsLeft = +amount
  })

  return await utilService.saveToFile('user', users).then(() => users)
}
