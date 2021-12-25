const alfy = require('alfy')
const app = require('./src/app')

;(async () => {
  try {
    alfy.output(await app())
  } catch (error) {
    alfy.log(error)
  }
})()
