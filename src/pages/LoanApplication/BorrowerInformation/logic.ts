import cloneDeep from 'clone-deep'
import { store } from 'reducers'
import { InputValidate } from 'utils'

export const visibleBorrowerFieldsLogic = (borrowerSeperator: string) => {
  const { borrower } = store.getState()

  let visibleFields: any = [
    'borrowerType',
    'firstName',
    'middleName',
    'lastName',
    'email',
    'ssn',
    'phone',
    'dob',
    'presentAddress',
    'mailingAddress',
    'ownership',
    'ownedRentedYears',
    'maritalStatus',
  ]
  if (borrowerSeperator === 'borrower') {
    visibleFields.push('hasEntityTitle')
    if (borrower[borrowerSeperator].hasEntityTitle) {
      visibleFields.push('entityTitle')
    }
  }

  if (borrowerSeperator === 'coBorrower') {
  }

  if (borrower[borrowerSeperator].ownedRentedYears === '1') {
    visibleFields.push('formerAddress')
    visibleFields.push('formerOwnership')
    visibleFields.push('formerOwnedRentedYears')
  }
  return visibleFields
}

export const borrowerInfoValidate = (borrowerSeperator: string, visibles: any, fields: any, validateOnly = false) => {
  const { borrower } = store.getState()
  let success = true
  fields = cloneDeep(fields)
  Object.keys(fields).map((key) => {
    if (visibles.indexOf(key) !== -1) {
      const error = InputValidate({ ...fields[key], value: borrower[borrowerSeperator][key] })
      fields[key].error = error
      if (error.length > 0) {
        success = false
      }
    }
  })
  if (validateOnly) return success
  return fields
}
