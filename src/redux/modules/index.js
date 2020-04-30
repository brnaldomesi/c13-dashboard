import api from './api'
import auth from './auth'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import media from './media'
import { reducer as modal } from 'redux-modal'
import profiles from './profiles'
import users from './users'

export default history =>
  combineReducers({
    api,
    auth,
    modal,
    media,
    profiles,
    users,
    router: connectRouter(history)
  })
