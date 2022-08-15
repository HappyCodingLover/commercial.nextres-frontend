import { SET_OVERVIEW_STEP } from 'actions'
import cloneDeep from 'clone-deep'

import { createReducer } from '../utils'

export const mapStepDetailDescription: Record<string, string> = {
  rateAndPrice: 'Select Interest Rate and Base Price',
  lockRate: 'Lock Rate',
  dataComplete: 'Complete Application Data',
  signApplication: 'Sign Application',
  creditScorePull: 'Pull Credit Score',
  conditionSubmit: 'Submit Conditions',
  submitSetup: 'Submit to LoanSetup',
  submitUnderwriter: 'Submit to Underwriter',
}

export const stepInitialState = () => {
  return {
    application: {
      property: -1,
      borrower: -1,
      asset: 0,
      track: 0,
      hmda: -1,
      credit: -1,
      sign: -1,
      borrower2: -1,
      hmda2: -1,
      credit2: -1,
      sign2: -1,
    },
    overview: {
      structure: {
        label: 'Loan Structure',
        status: 0,
        detail: {
          rateAndPrice: 0,
          lockRate: 0,
        },
      },
      application: {
        label: 'Loan Application',
        status: -1,
        detail: {
          dataComplete: 0,
          signApplication: 0,
          creditScorePull: 0,
        },
      },
      submit: {
        label: 'Loan Submission',
        status: -1,
        detail: {
          conditionSubmit: 0,
          submitSetup: 0,
          submitUnderwriter: 0,
        },
      },
    },
  }
}

export const step = createReducer(stepInitialState(), {
  [SET_OVERVIEW_STEP]: (state: any, payload: any) => {
    let newState = cloneDeep(state)
    newState.overview = payload.data
    return newState
  },
})
