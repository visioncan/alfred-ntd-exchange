import alfy from 'alfy'
import got from 'got'
import {
  csv2Obj,
  avaiableCurrency,
  getUpdateTime,
  numFormater
} from './utils.js'

// Bank Of Taiwan
const BOT_HOST = 'https://rate.bot.com.tw'
const CSV_PATH = '/xrt/flcsv/0/day'

try {
  const resp = await got(`${BOT_HOST}${CSV_PATH}`)

  const rates = csv2Obj(resp.body)
  const uptime = getUpdateTime(resp.headers)

  const output = rates.map(item => {
    const currencyName = item[0][1]
    const currency = avaiableCurrency[currencyName]
    const sell = numFormater.format(item[12][1])
    const buy = numFormater.format(item[2][1])

    return {
      title: sell,
      subtitle: `${currencyName} ${currency.name} | 現金賣出: ${sell} 現金買入: ${buy} 更新時間: ${uptime}`,
      icon: {
        path: `./flags/flag_${currency.flag}.png`
      }
    }
  })
  alfy.output(output)
} catch (error) {
  alfy.log(error)
}

