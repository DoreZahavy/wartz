import fs from 'fs'

export const utilService = {
  readJsonFile,

  makeId,
  saveToFile,
}

function readJsonFile(path) {
  const str = fs.readFileSync(path, 'utf8')
  const json = JSON.parse(str)
  return json
}

function makeId(length = 5) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function saveToFile(key, entity) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`data/${key}.json`, JSON.stringify(entity, null, 2), (err) => {
      if (err) {
        console.log(err)
        reject('Cannot write to file')
      } else {
        console.log('Wrote Successfully!')
        resolve()
      }
    })
  })
}
