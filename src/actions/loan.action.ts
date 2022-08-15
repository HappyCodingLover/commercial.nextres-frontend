import type { ILoanState } from 'reducers/loan.reducer'

import { LOAN_SET_ALL_DATA, LOAN_SET_DATA, LOAN_SET_GROUP_DATA } from './types'

export function setLoanData(data: { key: string; data: any }) {
  return { type: LOAN_SET_DATA, key: data.key, data: data.data }
}

export function setLoanAllData(data: ILoanState) {
  return { type: LOAN_SET_ALL_DATA, data }
}

export function setLoanGroupData(data: ILoanState) {
  return { type: LOAN_SET_GROUP_DATA, data }
}
