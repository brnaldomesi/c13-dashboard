import 'moment-timezone'

import fp from 'lodash/fp'
import moment from 'moment'

export const parseQueryString = string =>
  fp.compose(
    JSON.parse,
    JSON.stringify,
    fp.reduce((acc, part) => {
      const [name, value] = part.split('=')
      acc[name] = decodeURIComponent(value || '')
      return acc
    }, {}),
    str => (str ? str.split('&') : []),
    fp.replace('?', '')
  )(string)

export const jsonToQueryString = obj => {
  const pairs = []
  obj &&
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        const value = encodeURIComponent(obj[key])
        value && pairs.push(`${key}=${value}`)
      }
    })

  return pairs.length ? `?${pairs.join('&')}` : ''
}

export const truncate = (input, len = 100) => {
  if (input && input.length > len) {
    return `${input.substring(0, len)}...`
  } else {
    return input
  }
}

export const capitalize = str =>
  typeof str === 'string' && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str

export const getFullName = person => `${person.firstName} ${person.lastName}`

export const bindCallbackToPromise = () => {
  let _resolve
  const promise = () => {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
  const cb = args => _resolve(args)

  return {
    promise,
    cb
  }
}

export const getRankings = (item, rankingsList) =>
  rankingsList.reduce(
    (acc, listItem) => {
      if (item) {
        Object.keys(acc).forEach(key => {
          if (listItem[key] > item[key]) {
            acc[key]++
          }
        })
      }
      return acc
    },
    {
      dayOneDownloads: 1,
      weekOneDownloads: 1,
      totalDownloads: 1
    }
  )

export const getHmsDuration = seconds => {
  const hh = parseInt(seconds / (60 * 60), 10)
    .toString()
    .padStart(2, '0')
  const mm = (parseInt(seconds / 60, 10) % 60).toString().padStart(2, '0')
  const ss = (parseInt(seconds) % 60).toString().padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

export const escapeCsvColumnText = str => (/[,"]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str)

export const getESTDateStr = (localDate, format) => {
  return moment.tz(localDate, 'America/New_York').format(format)
}

export const getUTCDateStr = (localDate, format) => {
  return moment.tz(localDate, 'UTC').format(format)
}

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
