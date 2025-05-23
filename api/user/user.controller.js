import { userService } from './user.service.js'
import { loggerService } from '../../services/logger.service.js'

export async function getUser(req, res) {
  try {
    const user = await userService.getById(req.params.id)
    res.send(user)
  } catch (err) {
    loggerService.error('Failed to get user', err)
    res.status(400).send({ err: 'Failed to get user' })
  }
}

export async function getUsers(req, res) {
  try {
    const users = await userService.query()
    res.send(users)
  } catch (err) {
    loggerService.error('Failed to get users', err)
    res.status(400).send({ err: 'Failed to get users' })
  }
}

export async function deleteUser(req, res) {
  try {
    console.log('req.params.id', req.params.id)
    await userService.remove(req.params.id)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    loggerService.error('Failed to delete user', err)
    res.status(400).send({ err: 'Failed to delete user' })
  }
}

export async function addUser(req, res) {
  try {
    const { name, code } = req.body
    const addedUser = await userService.add(name, code)
    res.send(addedUser)
  } catch (err) {
    loggerService.error('Failed to update user', err)
    res.status(400).send({ err: 'Failed to update user' })
  }
}

export async function resetPoints(req, res) {
  const { amount } = req.params
  const users = await userService.refreshPoints(amount)
  res.send(users)
}
