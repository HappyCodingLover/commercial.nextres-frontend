import { API_BORROWER_INFO_UPDATE, API_BORROWER_LOG } from 'config'
import Api from 'services/api'

export const borrowerInfoUpdate = (data: Record<string, string>) => {
  return Api.put(API_BORROWER_INFO_UPDATE, data)
}

export const getBorrowerLogs = (borrowerSeperator: string, fieldName: string) => {
  return Api.get(API_BORROWER_LOG, {}, { borrowerSeperator, fieldName })
}
