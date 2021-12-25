const got = require('got')
const {
  csv2Obj,
  avaiableCurrency,
  getUpdateTime,
  numFormater
} = require('./utils')

// Bank Of Taiwan
const BOT_HOST = 'https://rate.bot.com.tw'
const CSV_PATH = '/xrt/flcsv/0/day'

const outputList = ({ currencyName, currency, sell, buy, uptime }) => {
  return {
    title: sell,
    subtitle: `${currencyName} ${currency.name} | 現金賣出: ${sell} 現金買入: ${buy} 更新時間: ${uptime}`,
    icon: {
      path: `./flags/flag_${currency.flag}.png`
    }
  }
}

async function app () {
  const resp = await got(`${BOT_HOST}${CSV_PATH}`)

  const rates = csv2Obj(resp.body)
  const uptime = getUpdateTime(resp.headers)

  const list = rates.map(item => {
    const currencyName = item[0][1]
    return outputList({
      currencyName,
      currency: avaiableCurrency[currencyName],
      sell: numFormater.format(item[12][1]),
      buy: numFormater.format(item[2][1]),
      uptime
    })
  })

  return list
}

module.exports = app
