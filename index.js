import alfy from 'alfy'
import got from 'got'
import { csv2Obj, avaiableCurrency } from './utils.js'

// Bank Of Taiwan
const BOT_HOST = 'https://rate.bot.com.tw'
const CSV_PATH = '/xrt/flcsv/0/day'

const resp = await got(`${BOT_HOST}${CSV_PATH}`)
const rates = csv2Obj(resp.body)

const output = rates.map(item => {
  const currency = avaiableCurrency[item[0][1]]
  return {
    title: item[12][1],
    subtitle: `${item[0][1]} ${currency.name} | 現金賣出: ${item[12][1]} 現金買入: ${item[2][1]}`,
    icon: {
      path: `./flags/flag_${currency.flag}.png`
    }
  }
})

alfy.output(output)
