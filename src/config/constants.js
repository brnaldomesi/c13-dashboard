export const DEFAULT_PAGE_SIZE = 25

export const EMPTY_LIST_DATA = {
  data: [],
  total: 0,
  prevCursor: null,
  nextCursor: null
}

export const BASE_URL = '/api/v1'

export const SHOWS_DOMAIN = process.env.REACT_APP_SHOWS_DOMAIN || 'shows.cadence13.com'

export const SNACKBAR_MAX_STACK = 3

export const SNACKBAR_TYPE = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning'
}

export const SNACKBAR_AUTOHIDE_TIMEOUT = 3000
