import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as modal } from 'redux-modal'

import api from './api'
import auth from './auth'
import media from './media'
import profiles from './profiles'

export default history =>
  combineReducers({
    api,
    auth,
    modal,
    media,
    profiles,
    router: connectRouter(history)
  })
