import { LOAN_SET_ALL_DATA, LOAN_SET_DATA, LOAN_SET_GROUP_DATA } from 'actions'

import { createReducer } from '../utils'

export interface ILoanState {
  [key: string]: any
}
const initialState: ILoanState = {
  selfEmployed: false,
  firstTimeHomeBuyer: false,
  firstTimeHomeInvestor: false,
  ruralProperty: false,
}

export const loan = createReducer(initialState, {
  [LOAN_SET_DATA]: (state: any, payload: any) => {
    const { key, data } = payload
    return { ...state, ...{ [key]: data } }
  },
  [LOAN_SET_ALL_DATA]: (state: any, payload: any) => {
    return payload.data
  },
  [LOAN_SET_GROUP_DATA]: (state: any, payload: any) => {
    return { ...state, ...payload.data }
  },
})
