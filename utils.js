export const avaiableCurrency = {
  AUD: {
    name: '澳幣',
    flag: 'australia'
  },
  CAD: {
    name: '加拿大幣',
    flag: 'canada'
  },
  CHF: {
    name: '瑞士法郎',
    flag: 'switzerland'
  },
  CNY: {
    name: '人民幣',
    flag: 'china'
  },
  EUR: {
    name: '歐元',
    flag: 'european_union'
  },
  GBP: {
    name: '英鎊',
    flag: 'united_kingdom'
  },
  HKD: {
    name: '港幣',
    flag: 'hong_kong_sar_china'
  },
  IDR: {
    name: '印尼幣',
    flag: 'indonesia'
  },
  JPY: {
    name: '日圓',
    flag: 'japan'
  },
  KRW: {
    name: '韓元',
    flag: 'south_korea'
  },
  MYR: {
    name: '馬來幣',
    flag: 'malaysia'
  },
  NZD: {
    name: '紐元',
    flag: 'new_zealand'
  },
  PHP: {
    name: '菲國比索',
    flag: 'philippines'
  },
  SEK: {
    name: '瑞典幣',
    flag: 'sweden'
  },
  SGD: {
    name: '新加坡幣',
    flag: 'singapore'
  },
  THB: {
    name: '泰銖',
    flag: 'thailand'
  },
  USD: {
    name: '美金',
    flag: 'united_states'
  },
  VND: {
    name: '越南盾',
    flag: 'vietnam'
  },
  ZAR: {
    name: '南非幣',
    flag: 'south_africa'
  },
  NTD: {
    name: '新台幣',
    flag: 'taiwan'
  }
}

export const csv2Obj = body => {
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

// module.exports = { avaiableCurrency, csv2Obj }
