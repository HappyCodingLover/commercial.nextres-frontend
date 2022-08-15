import {
  API_LOAN_APPLICATION_SET_VALUE,
  API_LOAN_GET_LATEST_RATESHEET,
  API_LOAN_GET_PRICE_LIMIT,
  API_LOAN_GET_PROCESS,
  API_LOAN_GET_SUBMISSION,
  API_LOAN_HISTORY,
  API_LOAN_LOG,
  API_LOAN_OVERVIEW,
  API_LOAN_PIPELINE,
  API_LOAN_PRICING,
  API_LOAN_SAVE_PROCESS,
  API_LOAN_SAVE_RATESHEET,
  API_LOAN_SAVE_TO_PIPELINE,
  API_LOAN_UPDATE_FIELDS,
  API_LOAN_UPDATE_SUBMISSION,
  pipelineLoanFilterQuery,
} from 'config'
import Api from 'services/api'

export const filterPipeline = (filterQuery: pipelineLoanFilterQuery = {}) => {
  return Api.get(API_LOAN_PIPELINE, filterQuery)
}

export const getLoanOverview = (loan_number: string) => {
  Api.setLoanNumber(loan_number)
  return Api.get(API_LOAN_OVERVIEW)
}

export const setLoanValue = (keys: Array<string>, value: string) => {
  return Api.put(API_LOAN_APPLICATION_SET_VALUE, { keys, value })
}

export const priceLoan = (loanFields: any) => {
  return Api.post(API_LOAN_PRICING, loanFields)
}

export const getPriceLimit = (loanFields: any) => {
  return Api.post(API_LOAN_GET_PRICE_LIMIT, loanFields)
}

export const saveToPipeLine = (loanFields: any) => {
  return Api.post(API_LOAN_SAVE_TO_PIPELINE, loanFields)
}

export const getLoanSubmission = () => {
  return Api.get(API_LOAN_GET_SUBMISSION)
}

export const updateLoanSubmission = (
  templateNumber: number,
  conditions: Record<string, Array<any>>, // set | update | delete
  documents: Record<string, Array<any>> = {},
  conditionOrder: Record<string, Array<any>> = {},
) => {
  return Api.post(API_LOAN_UPDATE_SUBMISSION, { templateNumber, conditions, documents, conditionOrder })
}

export const updateLoanFields = (loanFields: any) => {
  return Api.put(API_LOAN_UPDATE_FIELDS, loanFields)
}

export const saveLoanProcess = (data: object) => {
  return Api.post(API_LOAN_SAVE_PROCESS, data)
}

export const getLoanProcess = () => {
  return Api.get(API_LOAN_GET_PROCESS)
}

export const saveLoanRatesheet = (data: any) => {
  return Api.post(API_LOAN_SAVE_RATESHEET, data)
}

export const getLatestLoanRatesheet = () => {
  return Api.get(API_LOAN_GET_LATEST_RATESHEET)
}

export const getLoanLogs = (key: string) => {
  return Api.get(API_LOAN_LOG, {}, { key })
}

export const getLoanHistory = () => {
  return Api.get(API_LOAN_HISTORY)
}
