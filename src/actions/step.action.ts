import type { Dispatch } from 'react'

import { SET_OVERVIEW_STEP } from './types'

export function setOverviewStep(data: any) {
  return async (dispatch: Dispatch<any>) => {
    return dispatch({ type: SET_OVERVIEW_STEP, data })
  }
}
