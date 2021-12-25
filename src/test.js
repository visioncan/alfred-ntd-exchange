const got = require('got')
const { csv2Obj } = require('./utils')

const BOT_HOST = 'https://rate.bot.com.tw'
const CSV_PATH = '/xrt/flcsv/0/day'

const fetchcsv = () => got(`${BOT_HOST}${CSV_PATH}`).then(resp => csv2Obj(resp.body))

let csvobj = []

beforeAll(async () => {
  csvobj = await fetchcsv()
})

test('Rows of per currency', () => {
  const row1 = csvobj[0]
  expect(row1.length).toEqual(22)
})

test('First row data', () => {
  const row1 = csvobj[0]
  expect(row1[0]).toEqual(expect.arrayContaining(['USD']))
})

test('Bought and sell row index', () => {
  const row1 = csvobj[0]
  // 現金 本行買入 index
  const buyIndex = 1
  // 現金 本行賣出 index
  const sellIndex = 11
  expect(row1[buyIndex]).toEqual(expect.arrayContaining(['本行買入']))
  expect(row1[sellIndex]).toEqual(expect.arrayContaining(['本行賣出']))
})

