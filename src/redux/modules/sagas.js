import { all } from 'redux-saga/effects'
import { saga as auth } from './auth'
import { saga as media } from './media'
import { saga as metrics } from './metrics'
import { saga as profiles } from './profiles'
import { saga as todo } from './todo'
import { saga as users } from './users'

export default function* rootSaga() {
  yield all([auth(), media(), metrics(), profiles(), todo(), users()])
}
