import { all } from 'redux-saga/effects'

import { saga as auth } from './auth'
import { saga as media } from './media'
import { saga as profiles } from './profiles'
import { saga as todo } from './todo'

export default function* rootSaga() {
  yield all([auth(), media(), profiles(), todo()])
}
