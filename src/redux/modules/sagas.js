import { all } from 'redux-saga/effects'

import { saga as auth } from './auth'
import { saga as todo } from './todo'

export default function* rootSaga() {
  yield all([auth(), todo()])
}
