export default {
  locale: 'en',
  formats: {
    date: {
      numericDate: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      },
      monthAndYear: {
        month: 'long',
        year: 'numeric'
      },
      dayMonthAndYear: {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      },
      year: {
        year: 'numeric'
      },
      shortDMY: {
        year: '2-digit',
        month: 'short',
        day: '2-digit'
      }
    },
    number: {
      currency: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      currencyWithoutCents: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percentRounded: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }
    }
  }
}
