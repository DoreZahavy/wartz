import fs from 'fs'
import { utilService } from '../../services/util.service.js'

const users = utilService.readJsonFile('data/user.json')

export const userService = {
  query,
  getUserByName,
  remove,
  add,
  getUserByCode
}

async function query() {
  return users
}



async function getUserByCode(code) {
  return users.find(user => user.code === code)
}
async function getUserByName(code) {
  return users.find(user => user.name === name)
}

async function remove(userId) {
  users = users.filter((user) => user._id !== userId)
  return utilService.saveToFile('user', users)
}

async function add(name) {
  const user = {
    id: utilService.makeId(5),
    name,
    code: utilService.makeId(3),
    activities: [],
  }
  return utilService.saveToFile('user', users)
}
