import { setLoanData, setLoanGroupData } from 'actions'
import { fieldsByTransactionTypeAndProductTypeConstant, loanOptionsConstants } from 'config/loan.constants'
import { store } from 'reducers'
import { InputConvert } from 'utils'

export const visibleLoansLogic = () => {
  const { loan } = store.getState()

  let visibleFields = ['productType', 'transactionType']
  if (loan['productType'] && loan['transactionType']) {
    visibleFields = [
      ...visibleFields,
      ...fieldsByTransactionTypeAndProductTypeConstant[loan['productType']][loan['transactionType']],
    ]
    if (loan['propertyType'] === 'Condo') {
      visibleFields.push('condoType')
    }
  }
  return visibleFields
}

export const loanFieldsInternalLogic = (loanField: any) => {
  const { loan } = store.getState()
  const smallPropertyListInLoanDet = ['Commercial Bridge', 'Commercial DSCR']
  const bigPropertyListInLoanDet = ['Commercial Rehab and Construction', 'Residential DSCR']
  /*
   ** if Product Type is Commercial Bridge or Commercial DSCR, set property type options as small property list
   */
  if (loan['productType'] && smallPropertyListInLoanDet.includes(loan['productType'])) {
    loanField['propertyType'].options = loanOptionsConstants.propertyTypeSmallList
    if (loanOptionsConstants.propertyTypeSmallList.indexOf(loan['propertyType']) === -1) {
      store.dispatch(setLoanData({ key: 'propertyType', data: undefined }))
    }
  }
  /*
   ** if Product Type is Commercial Rehab and Construction or Residential DSCR, set property type options as big property list
   */
  if (loan['productType'] && bigPropertyListInLoanDet.includes(loan['productType'])) {
    loanField['propertyType'].options = loanOptionsConstants.propertyTypeBigList
    if (loanOptionsConstants.propertyTypeBigList.indexOf(loan['propertyType']) === -1) {
      store.dispatch(setLoanData({ key: 'propertyType', data: undefined }))
    }
  }
  return loanField
}

export const loanDataConvert = (fields: any) => {
  const { loan } = store.getState()
  let data: any = {}
  Object.keys(fields).map((key) => {
    let value = InputConvert(fields[key], loan[key])
    data[key] = value
  })
  store.dispatch(setLoanGroupData(data))
}
