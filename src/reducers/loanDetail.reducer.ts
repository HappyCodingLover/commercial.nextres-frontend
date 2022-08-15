import { SET_LOAN_DETAIL } from 'actions/types'
import cloneDeep from 'clone-deep'

import { createReducer } from '../utils'

export const partiesMap: Record<string, string> = {
  creator: 'Loan Creator',
  processor: 'Loan Processor',
  executive: 'Account Executive',
  underwriter: 'Underwriter',
  manager: 'Account Manager',
}

export const getloanDetailInitialState = () => {
  return {
    loanNumber: '',
    borrowerName: '',
    propertyAddress: '',
    loanStatus: 'Prequal',
    includeCoborrower: false,
    parties: {
      creator: {
        name: 'charles park',
        email: 'charles@gmail.com',
        phone: '233-239-2939',
        phoneExt: '',
      },
      processor: {
        name: 'processor',
        email: 'processor@gmail.com',
        phone: '233-239-2939',
        phoneExt: '',
      },
      executive: {
        name: 'executive',
        email: 'executive@gmail.com',
        phone: '233-239-2939',
        phoneExt: '',
      },
      underwriter: {
        name: 'underwriter',
        email: 'underwriter@gmail.com',
        phone: '233-239-2939',
        phoneExt: '',
      },
      manager: {
        name: 'manager',
        email: 'manager@gmail.com',
        phone: '233-239-2939',
        phoneExt: '',
      },
    },
    rateData: {},
  }
}

export const loanDetail = createReducer(getloanDetailInitialState(), {
  [SET_LOAN_DETAIL]: (state: any, payload: any) => {
    let newState = cloneDeep(state)
    newState = {
      ...newState,
      ...payload.data,
    }
    return newState
  },
})
