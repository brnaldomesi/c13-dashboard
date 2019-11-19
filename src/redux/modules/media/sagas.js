import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import * as types from './types'

const getNetworks = apiCallSaga({
  type: types.GET_NETWORKS,
  method: 'get',
  allowedParamKeys: [],
  path: '/media/networks',
  selectorKey: 'networks'
})

export default function* rootSaga() {
  yield takeLatest(types.GET_NETWORKS, getNetworks)
}
