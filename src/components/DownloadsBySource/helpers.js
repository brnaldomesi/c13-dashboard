import fp from 'lodash/fp'

export const downloadsSourceMap = {
  Apple: 'Apple',
  'Apple Desktop': 'Apple',
  'Apple Mobile': 'Apple',
  'Apple Other': 'Apple',
  'Mobile Safari': 'Apple',
  Safari: 'Apple',
  'Safari Mobile': 'Apple',
  Podcasts: 'Apple',
  'Apple Watch': 'Apple',
  'Apple Desktop (iTunes)': 'Apple',
  'Apple Desktop (Podcasts)': 'Apple',
  'Apple TV': 'Apple',
  '(null)': 'Others',
  Others: 'Others',
  Other: 'Others',
  Unknown: 'Others',
  Google: 'Google',
  Android: 'Google',
  'Android Misc': 'Google',
  'Android Mobile': 'Google',
  'Android browser': 'Google',
  'Chrome Mobile': 'Google',
  'Chrome Mobile WebView': 'Google',
  'Chrome Mobile iOS': 'Google',
  GoogleHome: 'Google',
  'Google Assistant': 'Google',
  'Google Podcasts': 'Google',
  'Google Play': 'Google',
  Chrome: 'Google',
  AndroidDownloadManager: 'Google',
  stagefright: 'Google',
  'Android HttpURLConnection': 'Google',
  okhttp: 'Google',
  atc: 'Google',
  'Alexa Media Player': 'Amazon',
  'Amazon Echo': 'Amazon',
  Echo: 'Amazon',
  'Amazon Alexa': 'Amazon',
  'Amazon Fire': 'Amazon',
  'Amazon Silk': 'Amazon',
  'Firefox Mobile': 'Firefox'
}

export const getDownloadsTotalData = sourceData => {
  const sourceNames = {}
  const data = sourceData.map(item => {
    const sources = item.sourceList.reduce((acc, source) => {
      const key = downloadsSourceMap[source.sourceName] || source.sourceName
      sourceNames[key] = true
      if (acc[key]) {
        acc[key] += source.downloads
      } else {
        acc[key] = source.downloads
      }
      return acc
    }, {})
    return {
      date: item.date,
      sources
    }
  })
  return {
    data,
    sourceNames: Object.keys(sourceNames)
  }
}

export const getDownloadsPercentageData = percentages => {
  const data = Object.keys(percentages || {}).reduce((acc, key) => {
    const finalKey = downloadsSourceMap[key] || key
    const percentage = percentages[key]
    if (acc[finalKey]) {
      acc[finalKey] += percentage
    } else {
      acc[finalKey] = percentage
    }
    return acc
  }, {})
  return Object.keys(data)
    .sort()
    .map(key => [key, data[key]])
}

const sortByDownloads = fp.compose(
  fp.sortBy(item => -item.downloads),
  Object.values
)

export const getDownloadsBreakdownData = fp.compose(
  data => ({
    data,
    totalDownloads: fp.sumBy('downloads')(data)
  }),
  fp.map(item => ({
    downloads: item.downloads,
    name: item.name,
    sourcesList: sortByDownloads(item.sources)
  })),
  sortByDownloads,
  fp.reduce((acc, item) => {
    const key = item.sourceName
    const groupKey = downloadsSourceMap[key] || key
    if (acc[groupKey]) {
      acc[groupKey].downloads += item.downloads
    } else {
      acc[groupKey] = {
        downloads: item.downloads,
        sources: {},
        name: groupKey
      }
    }
    if (acc[groupKey].sources[key]) {
      acc[groupKey].sources[key].downloads += item.downloads
    } else {
      acc[groupKey].sources[key] = {
        downloads: item.downloads,
        name: item.sourceName
      }
    }
    return acc
  }, {}),
  fp.flatten,
  fp.map(item => item.sourceList)
)
