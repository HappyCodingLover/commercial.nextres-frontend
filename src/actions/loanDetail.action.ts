import type { Dispatch } from 'react'

import { SET_LOAN_DETAIL } from './types'

export function dispatchLoanDetail(data: any) {
  return async (dispatch: Dispatch<any>) => {
    return dispatch({ type: SET_LOAN_DETAIL, data })
  }
}

export function setLoanDetail(data: any) {
  return { type: SET_LOAN_DETAIL, data }
}
