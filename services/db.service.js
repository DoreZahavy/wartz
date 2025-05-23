import { MongoClient } from 'mongodb'


import { loggerService } from './logger.service.js'

const config = {
    dbURL: process.env.MONGO_URL,
    dbName: process.env.DB_NAME
}

export const dbService = { getCollection }


var dbConn = null


async function getCollection(collectionName) {
    try {
        const db = await _connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        loggerService.error('Failed to get Mongo collection', err)
        throw err
    }
}


async function _connect() {
    if (dbConn) return dbConn
    
    
    console.log("🚀 ~ config:", config)
    try {
        const client = await MongoClient.connect(config.dbURL)
        return dbConn = client.db(config.dbName)
    } catch (err) {
        loggerService.error('Cannot Connect to DB', err)
        throw err
    }
}
