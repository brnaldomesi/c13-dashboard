import { all } from 'redux-saga/effects'

import { saga as auth } from './auth'
import { saga as profiles } from './profiles'
import { saga as todo } from './todo'

export default function* rootSaga() {
  yield all([auth(), profiles(), todo()])
}
