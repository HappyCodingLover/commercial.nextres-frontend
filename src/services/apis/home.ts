import { API_HOME_NEWSLETTER, API_HOME_SUBMIT_CONTACTUS } from 'config'
import Api from 'services/api'

export const requestNewsletter = (email: string) => {
  return Api.post(API_HOME_NEWSLETTER, { email })
}

export const submitContactUs = (data: Record<string, string>) => {
  return Api.post(API_HOME_SUBMIT_CONTACTUS, data)
}
