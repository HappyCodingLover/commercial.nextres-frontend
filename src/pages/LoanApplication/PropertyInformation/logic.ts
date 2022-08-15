import { setLoanGroupData } from 'actions'
import { visibleLoansLogic } from 'pages/PricePlayground/Logic'
import { store } from 'reducers'
import { InputConvert, InputValidate } from 'utils'

const LOAN_STRUCTURE_DUPLICATE_INPUT = 'You can set this value in "Loan Structure"'

export const initFields = (fields: any) => {
  const visibleLoans = visibleLoansLogic()
  Object.keys(fields).map((key) => {
    if (visibleLoans.indexOf(key) !== -1) {
      fields[key].readOnly = true
      fields[key].tooltip = LOAN_STRUCTURE_DUPLICATE_INPUT
    }
  })
  return fields
}

export const propertyDataConvert = (fields: any) => {
  const { loan } = store.getState()
  let data: any = {}
  Object.keys(fields).map((key) => {
    let value = InputConvert(fields[key], loan[key])
    data[key] = value
  })
  store.dispatch(setLoanGroupData(data))
}

export const propertyInfoValidate = (fields: any, validateOnly = false) => {
  const { loan } = store.getState()
  let success = true
  Object.keys(fields).map((key) => {
    const error = InputValidate({ ...fields[key], value: loan[key] })
    if (error.length > 0) {
      success = false
      fields[key].error = error
    }
  })
  if (validateOnly) return success
  return fields
}
