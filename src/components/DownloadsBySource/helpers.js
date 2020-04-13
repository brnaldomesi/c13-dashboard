import fp from 'lodash/fp'

export const downloadsSourceMap = {
  Apple: 'Apple',
  'Apple Desktop': 'Apple',
  'Apple Mobile': 'Apple',
  'Apple Other': 'Apple',
  'Mobile Safari': 'Apple',
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
  GoogleHome: 'Google',
  'Google Assistant': 'Google',
  'Google Podcasts': 'Google',
  'Google Play': 'Google',
  stagefright: 'Google',
  okhttp: 'Google',
  atc: 'Google',
  Android: 'Android',
  'Android Misc': 'Android',
  'Android Mobile': 'Android',
  'Android browser': 'Android',
  AndroidDownloadManager: 'Android',
  'Android HttpURLConnection': 'Android',
  Chrome: 'Chrome',
  'Chrome Mobile': 'Chrome',
  'Chrome Mobile WebView': 'Chrome',
  'Chrome Mobile iOS': 'Chrome',
  'Alexa Media Player': 'Amazon',
  'Amazon Echo': 'Amazon',
  Echo: 'Amazon',
  'Amazon Alexa': 'Amazon',
  'Amazon Fire': 'Amazon',
  'Amazon Silk': 'Amazon',
  Firefox: 'Firefox',
  'Firefox Mobile': 'Firefox',
  Edge: 'Edge',
  'Internet Explorer': 'Edge',
  // DoggCatcher: 'DoggCatcher',
  // 'TuneIn Radio': 'TuneIn Radio',
  Safari: 'Safari',
  'Safari Mobile': 'Safari'
}

export const downloadsSourceColorMap = {
  Apple: '#832ac4',
  Others: '#ffffff',
  Google: '#1a73e8',
  Amazon: '#ff9900',
  Firefox: '#0060df',
  Edge: '#0067b8',
  DoggCatcher: '#0072bc',
  'TuneIn Radio': '#00d8cd',
  Safari: '#0fb5ee',
  'Samsung Internet': '#1428a0',
  Chrome: '#1a73e8',
  'Radio.com': '#1F055E',
  Spotify: '#26d657',
  'The Podcast App': '#2C90ED',
  Deezer: '#2d96c8',
  Pandora: '#3668ff',
  Twitter: '#38A1F3',
  Facebook: '#4267B2',
  'NPR One': '#558fcb',
  Roku: '#662d91',
  Android: '#78C257',
  'Player FM': '#8BC34A',
  PodBean: '#8fc31f',
  Sonos: '#bb4725',
  iHeartRadio: '#C6002B',
  RadioPublic: '#ce262f',
  Downcast: '#d60008',
  'Windows Media Player': '#ee7213',
  Instagram: '#f00075',
  'Podcast Republic': '#f16c20',
  'Pocket Casts': '#f33e37',
  CastBox: '#f45b1f',
  'Podcast Addict': '#f4842e',
  Stitcher: '#f8c700',
  Overcast: '#fc7e0f',
  Himalaya: '#ff4444',
  Luminary: '#ffe500'
}

export const getDownloadsTotalData = sourceData => {
  const sourceNames = []
  const data = sourceData.map(item => {
    const sources = item.sourceList.reduce((acc, source) => {
      const key = downloadsSourceMap[source.sourceName] || source.sourceName
      const color = downloadsSourceColorMap[key]
      const sourceNameItem = {}

      sourceNameItem['name'] = key
      sourceNameItem['color'] = color
      if (fp.some(sourceNameItem)(sourceNames) === false) {
        sourceNames.push(sourceNameItem)
      }

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
    sourceNames
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
    .map(key => ({ name: key, y: data[key], color: downloadsSourceColorMap[key] }))
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
