
import {utilService} from '../../services/util.service.js'

export const scoreService = {
    query,
   
    raiseScore
}


var scoreBoard = utilService.readJsonFile('./data/score.json')

function query() {
    
    return Promise.resolve(scoreBoard)
}

async function raiseScore( houseName, amount, user) {

    const houseScore = scoreBoard.find((house) => house.houseName === houseName)

        if (houseScore) {
            houseScore.score += amount
        
            return utilService.saveToFile('score',scoreBoard).then(() => scoreBoard)
        }
        else return Promise.reject('edit not available')
    } 


