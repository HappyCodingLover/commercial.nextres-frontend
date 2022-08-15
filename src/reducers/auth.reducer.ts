import {
  AUTH_LOGOUT,
  AUTH_PROFILE_UPDATE,
  AUTH_TOKEN_SET,
  ON_APPLICATION_ERROR,
  SIGNIN_USER_REQUEST,
  USER_PERMISSIONS_SET,
} from 'actions'

import { createReducer } from '../utils'

const initialState = {
  isAuthenticated: false,
  token: null,
  profile: {},
  fetchingToken: false,
  role: {},
}

export const auth = createReducer(initialState, {
  [SIGNIN_USER_REQUEST]: (state: any) => ({ ...state, fetchingToken: true }),
  [ON_APPLICATION_ERROR]: (state: any) => ({ ...state, fetchingToken: false }),
  [AUTH_TOKEN_SET]: (state: any, payload: any) => {
    const { token, user: profile } = payload
    return {
      ...state,
      isAuthenticated: true,
      token,
      profile,
      fetchingToken: false,
    }
  },
  [AUTH_PROFILE_UPDATE]: (state: any, payload: any) => {
    return {
      ...state,
      profile: {
        ...state.profile,
        ...payload.profile,
      },
    }
  },
  [USER_PERMISSIONS_SET]: (state: any, payload: any) => {
    const { role } = payload
    return {
      ...state,
      role,
    }
  },
  [AUTH_LOGOUT]: () => initialState,
})
