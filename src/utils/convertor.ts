import moment from 'moment-timezone'

export const formatTime = (time: Date | string) => {
  if (time === 'now') return moment().tz('America/New_York').format('MM/DD/YYYY HH:mm')
  return moment(time).tz('America/New_York').format('MM/DD/YYYY HH:mm')
}

export const formatDate = (time: Date | string) => {
  if (time === 'now') return moment().tz('America/New_York').format('MM/DD/YYYY')
  return moment(time).tz('America/New_York').format('MM/DD/YYYY')
}

const removePrefix0 = (val: string) => {
  let rlt = ''
  if (val === '0') return '0'
  for (let i = 0; i < val.length; i += 1) {
    if (val[i] >= '0' && val[i] <= '9') {
      if (rlt.length === 0 && val[i] === '0') {
      } else rlt += val[i]
    }
  }
  return rlt
}

const getOnlyNumber = (val: string) => {
  try {
    let rlt = ''
    let data = val.toString()
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] >= '0' && data[i] <= '9') rlt += data[i]
    }
    return rlt
  } catch {
    return ''
  }
}

export const thousandSeperator = (param: any, withoutDecimal = false, decimalCount = 3) => {
  try {
    param = param.toString()
    let sign = param[0]
    let no_decimal = removePrefix0(getOnlyNumber(param.split('.')[0]))
    let decimal = param.split('.')[1]
    let value: any = no_decimal.replace(/,/g, '')
    let caret = value.length - 1
    while (caret - 3 > -1) {
      caret -= 3
      value = value.split('')
      value.splice(caret + 1, 0, ',')
      value = value.join('')
    }
    if (decimal !== undefined && !withoutDecimal) {
      decimal = getOnlyNumber(decimal).substring(0, decimalCount)
      value += '.' + decimal
    }
    if (sign === '-') value = '-' + value
    return value
  } catch {
    return ''
  }
}

export const phoneConvertor = (val: any) => {
  try {
    let rlt = ''
    for (let i = 0; i < val.length; i += 1) {
      if (rlt.length < 10) {
        if (val[i] >= '0' && val[i] <= '9') rlt += val[i]
      }
    }
    if (rlt.length === 10) {
      rlt = `(${rlt.substring(0, 3)}) ${rlt.substring(3, 6)}-${rlt.substring(6, 10)}`
    }
    return rlt
  } catch {
    return ''
  }
}

export const InputConvert = function (data: any, value: any) {
  try {
    if (data.type === 'phone') {
      value = phoneConvertor(value)
    }
    if (data.type === 'thousandSep') {
      value = thousandSeperator(value)
    }
  } catch {}
  return value
}

export const sortByKey = (arr: Array<any>, key: string) => {
  return arr.sort((a: any, b: any) => {
    const valueA = a[key].toUpperCase() // ignore upper and lowercase
    const valueB = b[key].toUpperCase() // ignore upper and lowercase
    if (valueA < valueB) return -1
    if (valueA > valueB) return 1

    return 0
  })
}
