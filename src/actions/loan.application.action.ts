import { BORROWER_SET_ALL_DATA, BORROWER_SET_GROUP_DATA } from './types'

export function setBorrowerAllData(data: any) {
  return { type: BORROWER_SET_ALL_DATA, data }
}

export function setBorrowerGroupData(borrowerSeperator: string, data: any) {
  return { type: BORROWER_SET_GROUP_DATA, borrowerSeperator, data }
}
