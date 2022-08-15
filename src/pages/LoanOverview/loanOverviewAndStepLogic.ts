import { setBorrowerAllData, setLoanAllData, setLoanDetail, setOverviewStep } from 'actions'
import { store } from 'reducers'
import { borrowerInitialState } from 'reducers/borrower.reducer'
import { getloanDetailInitialState } from 'reducers/loanDetail.reducer'
import { stepInitialState } from 'reducers/step.reducer'
import { getLoanOverview } from 'services/apis/loan'

export const loanOverviewAndStepLogic = async (loan_number: string, menu: string) => {
  return new Promise(async (resolve) => {
    try {
      const { auth } = await store.getState()
      let { overview } = stepInitialState()
      if (loan_number === 'new') {
        await store.dispatch(setOverviewStep(overview))

        let loanDetailData = getloanDetailInitialState()
        loanDetailData.loanNumber = 'New'
        loanDetailData.borrowerName = '-'
        loanDetailData.propertyAddress = '-'
        await store.dispatch(setLoanDetail(loanDetailData))

        const borrowerData = borrowerInitialState()
        await store.dispatch(setBorrowerAllData(borrowerData))

        await store.dispatch(setLoanAllData({}))
        return resolve(true)
      }

      const res = await getLoanOverview(loan_number)
      console.log('track loan overview response', res, menu, auth)
      await store.dispatch(setLoanAllData(res.loan))

      let loanDetailData = getloanDetailInitialState()
      loanDetailData.loanNumber = res.loan.no
      loanDetailData.borrowerName = `${res.loan.borrowerFirstName} ${res.loan.borrowerLastName}`
      loanDetailData.propertyAddress = res.loan.subjectPropertyAddress
      await store.dispatch(setLoanDetail(loanDetailData))

      let borrowerData = res.borrower
      await store.dispatch(setBorrowerAllData(borrowerData))

      // Overview Step Update
      // Structure Step
      if (res.pricing.rate > 0) {
        overview.structure.detail.rateAndPrice = 1
      }
      if (res.pricing.locked) {
        overview.structure.detail.lockRate = 1
      }
      let overview_structure_status = 1
      Object.keys(overview.structure.detail).map((key) => {
        const detail: any = overview.structure.detail
        if (detail[key] !== 1) {
          overview_structure_status = 0
        }
      })
      overview.structure.status = overview_structure_status

      // Application Step
      if (overview.structure.detail.rateAndPrice === 1) {
        overview.application.status = 0
      }

      // Submission Step
      if (overview.structure.detail.rateAndPrice === 1) {
        overview.submit.status = 0
      }

      await store.dispatch(setOverviewStep(overview))

      if (menu === 'application') {
        if (overview.application.status === -1) {
          return resolve({
            success: false,
            message: 'Redirect Overview',
          })
        }
      }

      if (menu === 'submit') {
        if (overview.submit.status === -1) {
          return resolve({
            success: false,
            message: 'Redirect Overview',
          })
        }
      }

      resolve({
        success: true,
      })
    } catch (error) {
      console.log('track loanOverviewAndStepLogic Error', error)
      resolve({
        success: false,
        message: 'Redirect Pipeline',
      })
    }
  })
}
