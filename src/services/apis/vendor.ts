import { API_VENDOR_CREDIT_REPORT } from 'config'
import Api from 'services/api'

export const vendorCreditReport = () => {
  return Api.get(API_VENDOR_CREDIT_REPORT)
}
