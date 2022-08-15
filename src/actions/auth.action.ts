import { API_USER_PERMISSIONS, API_USER_SIGN_IN } from 'config'
import type { Dispatch } from 'react'
import { toast } from 'react-toastify'
import Api from 'services/api'

import { AUTH_LOGOUT, AUTH_PROFILE_UPDATE, AUTH_TOKEN_SET, SIGNIN_USER_REQUEST, USER_PERMISSIONS_SET } from './types'

export function signInRequest(params: any) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: SIGNIN_USER_REQUEST })
    const queryParams = { ...params }
    const response = await Api.post(API_USER_SIGN_IN, queryParams)
    const { token, user } = response

    toast('Authorized', { type: 'success' })
    return dispatch({ type: AUTH_TOKEN_SET, token, user })
  }
}

export function getUserPermissions() {
  return async (dispatch: Dispatch<any>) => {
    const response = await Api.get(API_USER_PERMISSIONS)
    const { role } = response
    return dispatch({ type: USER_PERMISSIONS_SET, role })
  }
}

export function setUserPermissions(role: any) {
  return async (dispatch: Dispatch<any>) => {
    return dispatch({ type: USER_PERMISSIONS_SET, role })
  }
}

export function logout() {
  return { type: AUTH_LOGOUT }
}

export function authUpdateProfile(profile: any) {
  return { type: AUTH_PROFILE_UPDATE, profile }
}
