import { BORROWER_SET_ALL_DATA, BORROWER_SET_GROUP_DATA } from 'actions'
import cloneDeep from 'clone-deep'

import { createReducer } from '../utils'

export const borrowerInitialState = () => {
  return {
    borrower: {},
    coBorrower: {},
  }
}

export const borrower = createReducer(borrowerInitialState(), {
  [BORROWER_SET_ALL_DATA]: (state: any, payload: any) => {
    return payload.data
  },
  [BORROWER_SET_GROUP_DATA]: (state: any, payload: any) => {
    let newState = cloneDeep(state)
    newState[payload.borrowerSeperator] = {
      ...newState[payload.borrowerSeperator],
      ...payload.data,
    }
    return newState
  },
})
