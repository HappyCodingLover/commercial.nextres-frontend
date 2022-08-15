import { ClockIcon } from '@heroicons/react/outline'
import { dispatchLoanDetail } from 'actions'
import { loanStatusConstants } from 'config'
import { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import svgLoading from 'stories/assets/loading.svg'
import { Select } from 'stories/components'

export function _LoanStatus(props: any) {
  const { loanDetail, auth } = props
  const [loading, setLoading] = useState(false)

  const options = useMemo(() => {
    return loanStatusConstants.status
  }, [auth.profile])

  const changeLoanDetail = (value: string) => {
    setLoading(true)

    setTimeout(() => {
      props.dispatchLoanDetail({
        loanStatus: value,
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="LoanStatus-container flex">
      <div className="w-44">
        <Select
          id="loan-status"
          title=""
          options={options}
          disabled={loading}
          value={loanDetail.loanStatus}
          onChange={(value) => changeLoanDetail(value)}
        />
      </div>
      {loading && <img src={svgLoading} className="inline w-5 h-5 ml-2 mt-2 text-white animate-spin" />}
      {!loading && (
        <span className="ml-2 mt-2 text-gray-500 cursor-pointer">
          <ClockIcon className="w-5 h-5" />
        </span>
      )}
    </div>
  )
}

function mapStateToProps(state: any) {
  return {
    auth: state.auth,
    loanDetail: state.loanDetail,
  }
}

export const LoanStatus = connect(mapStateToProps, { dispatchLoanDetail })(_LoanStatus)
