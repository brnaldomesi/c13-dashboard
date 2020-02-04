import { SEARCH_PODCASTS } from './types'
import { apiCallSaga } from '../api'
import { takeLatest } from 'redux-saga/effects'

const searchPodcasts = apiCallSaga({
  type: SEARCH_PODCASTS,
  method: 'get',
  allowedParamKeys: ['search'],
  path: '/series/search',
  selectorKey: 'podcastsSearch'
})

export default function* rootSaga() {
  yield takeLatest(SEARCH_PODCASTS, searchPodcasts)
}
