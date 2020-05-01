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

export const highlightLegendItemBySeriesMouseHover = e => {
  const hoveredItem = e.legendItem.element
  e.legendGroup.parentGroup.element.childNodes.forEach(function(itemGroup) {
    const text = itemGroup.firstChild
    if (text === hoveredItem) {
      text.style.fill = 'chartreuse'
    } else {
      itemGroup.style.opacity = 0.2
    }
  })
}

export const highlightLegendItemBySeriesMouseOut = e => {
  e.legendGroup.parentGroup.element.childNodes.forEach(function(itemGroup) {
    const text = itemGroup.firstChild
    itemGroup.style.opacity = 1
    text.style.fill = 'white'
  })
}

export const highlightLegendItemByLegend = (series, chart = null) => {
  series.forEach(function(s) {
    const legendItem = s.legendItem
    const hoveredElement = legendItem.element
    legendItem.on('mouseover', function() {
      series.forEach(item => {
        const element = item.legendItem.element
        if (element !== hoveredElement) {
          element.parentElement.style.opacity = 0.2
        } else {
          chart && chart.tooltip.refresh(series[item.index])
        }
      })
    })

    legendItem.on('mouseout', function() {
      chart && chart.tooltip.hide()
      series.forEach(item => {
        const element = item.legendItem.element
        element.parentElement.style.opacity = 1
      })
    })
  })
}
