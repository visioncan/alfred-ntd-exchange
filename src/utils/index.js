const avaiableCurrency = require('./currency')

const csv2Obj = body => {
  body = body.split('\n')
  const headers = body.shift().split(',')

  const table = body
    .filter(item => item !== '')
    .map((item, index) => {
      const row = item.split(',')
      return [...row.map((item, idx) => [headers[idx], item])]
    })

  return table
}

const getUpdateTimeFromHeaders = headers => {
  const csvfilename = headers['content-disposition']
  if (!csvfilename) return undefined
  const [, date] = csvfilename.match(/ExchangeRate@(\d+)/) || []
  return date
}

const getUpdateTime = headers => {
  let date = getUpdateTimeFromHeaders(headers)
  if (!date) {
    return ''
  }
  const pattern = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/
  return date.replace(pattern, '$1/$2/$3 $4:$5')
}

const numFormater = new Intl.NumberFormat('zh-Hant', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 3
})

module.exports = {
  avaiableCurrency,
  csv2Obj,
  getUpdateTime,
  numFormater
}
