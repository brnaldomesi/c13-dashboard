// Pass error messages

import Highcharts from 'highcharts'
import highchartsMap from 'highcharts/modules/map'

const allowNegativeLog = () => {
  Highcharts.addEvent(Highcharts.ColorAxis, 'init', function(e) {
    this.allowNegativeLog = e.userOptions.allowNegativeLog
  })

  // Override conversions
  Highcharts.wrap(Highcharts.ColorAxis.prototype, 'log2lin', function(proceed, num) {
    if (!this.allowNegativeLog) {
      return proceed.call(this, num)
    }

    var isNegative = num < 0,
      adjustedNum = Math.abs(num),
      result
    if (adjustedNum < 10) {
      adjustedNum += (10 - adjustedNum) / 10
    }
    result = Math.log(adjustedNum) / Math.LN10
    return isNegative ? -result : result
  })
  Highcharts.wrap(Highcharts.ColorAxis.prototype, 'lin2log', function(proceed, num) {
    if (!this.allowNegativeLog) {
      return proceed.call(this, num)
    }

    var isNegative = num < 0,
      absNum = Math.abs(num),
      result = Math.pow(10, absNum)
    if (result < 10) {
      result = (10 * (result - 1)) / (10 - 1)
    }
    return isNegative ? -result : result
  })

  highchartsMap(Highcharts)
}

export default allowNegativeLog
