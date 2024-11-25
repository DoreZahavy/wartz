import fs from 'fs'
import { utilService } from '../../services/util.service.js'

const users = utilService.readJsonFile('data/user.json')

export const userService = {
  query,
  getUserByName,
  remove,
  add,
  getUserByCode,
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
  console.log('🚀 ~ add ~ code:', code)
  const user = {
    id: utilService.makeId(5),
    name,
    code: code ? code : utilService.makeId(3),
    pointsLeft: 20,
    activities: [],
  }
  users.push(user)
  return utilService.saveToFile('user', users).then(() => user)
}
