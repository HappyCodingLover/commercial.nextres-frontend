import { DownloadIcon } from '@heroicons/react/outline'
import { LayoutLoading } from 'components/LayoutLoading'
import { loanStatusConstants } from 'config'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { filterPipeline } from 'services'
import svgLoading from 'stories/assets/loading.svg'
import svgSearch from 'stories/assets/search.svg'
import { Input, Pagination, Select } from 'stories/components'
import { thousandSeperator } from 'utils/convertor'
import { useTitle } from 'utils/pageTitle'

import { StatusDetail } from './StatusDetail'

const itemCountPerPage = 10

export function Pipeline() {
  useTitle(`Pipeline - ${process.env.REACT_APP_COMPANY}`)
  const [statusLoading, setStatusLoading] = useState(false)
  const [pipelineLoading, setPipelineLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(0)
  const [loans, setLoans] = useState([])
  const [filters, setFilters] = useState<Record<string, any>>({
    query: '',
    status: 'All',
    lock: 'All',
    testLoan: false,
    orderBy: 'companyName',
    orderDir: '1',
  })

  const navigate = useNavigate()

  const onChangeFilter = (key: string, value: any) => {
    const newFilters = Object.assign({}, filters)
    newFilters[key] = value
    setFilters(newFilters)
    // if (key === 'query') setFilterQuery(value)
    // else filterUsersData(newFilters)
  }

  const auth = useSelector((state: any) => state.auth)

  const downloadLink = useMemo(() => {
    return `${process.env.REACT_APP_API_URL}/home/downloadUser/${auth.profile.id}/${auth.token}`
  }, [auth.token])

  const filterLoanData = async (filters: any) => {
    setPipelineLoading(true)
    const { data } = await filterPipeline({
      query: filters.query,
    })
    setLoans(data)
    setPipelineLoading(false)
  }

  useEffect(() => {
    setStatusLoading(true)
    filterLoanData(filters)
    setTotal(10)
    setPageNum(0)
  }, [])

  const onPageNavigate = (num: number) => {
    setPageNum(num)
  }

  const viewLoan = (no: number) => {
    navigate(`/loan_process/overview/${no}`)
  }

  return (
    <div className="Pipeline-container py-6 px-2">
      <div className="shadow1 max-w-screen-2xl m-auto bg-white rounded p-3 md:p-7 sm:text-center lg:text-left w-full">
        <div className="flex flex-wrap justify-between mb-5">
          <h1 className="text-2xl font-bold flex items-center mb-3">
            <span>Pipeline Status</span>{' '}
            <span className="text-base ml-3">
              {statusLoading && <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />}
            </span>
          </h1>
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          <StatusDetail status="Funded" amount={9004564} loans={10432} color="green" percent={20.05} download={true} />
          <StatusDetail status="Withdrawn" amount={3452342} loans={12340} percent={30.03} color="yellow" />
          <StatusDetail status="Declined" amount={3452342} loans={12340} percent={20.43} color="red" />
          <StatusDetail status="In Progress" amount={3452342} loans={12340} percent={10.53} color="gray" />
        </div>
        <div className="mt-4 flex flex-wrap md:gap-6">
          <div className="shadow px-4 py-2 rounded my-1">
            Total: <span className="font-black text-[16px]">{thousandSeperator(10000)}</span> Loans
          </div>
          <div className="shadow px-4 py-2 rounded my-1">
            Locked: <span className="font-black text-[16px]">{thousandSeperator(6000)}</span> Loans
          </div>
          <div className="shadow px-4 py-2 rounded my-1">
            Float: <span className="font-black text-[16px]">{thousandSeperator(4000)}</span> Loans
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="relative shadow1 max-w-screen-2xl m-auto bg-white rounded p-3 md:p-7 sm:text-center lg:text-left w-full">
          <LayoutLoading show={pipelineLoading} />
          <div className="flex flex-wrap justify-between mb-5">
            <h1 className="text-2xl font-bold flex items-center mb-3">
              <span>Loan Pipeline</span>{' '}
              <span className="text-base ml-3">
                {pipelineLoading ? (
                  <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
                ) : (
                  `(${total})`
                )}
              </span>
            </h1>
          </div>
          <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <Input
              type="search"
              title="Search Loans"
              hasIcon
              icon={svgSearch}
              value={filters.query}
              onChange={(value) => onChangeFilter('query', value)}
            />
            <Select
              id="loan-status"
              title="Loan Status"
              options={loanStatusConstants.status}
              value={filters.status}
              hasDefaultOption
              defaultOptionText="All"
              onChange={(value) => onChangeFilter('status', value)}
            />
            <Select
              id="lock-status"
              title="Lock"
              options={['Locked', 'Float']}
              value={filters.lock}
              hasDefaultOption
              defaultOptionText="All"
              onChange={(value) => onChangeFilter('lock', value)}
            />
            <div className="form-check flex mb-4 justify-center">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-sky-600 checked:border-sky-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={filters.testLoan}
                onChange={(e) => onChangeFilter('testLoan', e.target.checked)}
                id="TestLoan"
              />
              <label className="form-check-label inline-block text-gray-800 ml-1 text-sm" htmlFor="TestLoan">
                Test Loan
              </label>
            </div>
          </div>
          <div className="mt-2">
            <div className="table-container mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-2 pl-4 py-3">Loan #</th>
                    <th className="px-2">Borrower</th>
                    <th className="px-2">Property Address</th>
                    <th className="px-2">Status</th>
                    <th className="px-2">As Of</th>
                    <th className="px-2">Loan Amount</th>
                    <th className="px-2">Lock Price</th>
                    <th className="px-2">Lock Exp.</th>
                    <th className="px-2">Broker</th>
                    <th className="px-2">A.E</th>
                    <th className="px-2">A.M</th>
                    <th className="px-2">U.W</th>
                    <th className="px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-gray-900">
                  {loans.map((item: any, index: number) => {
                    return (
                      <tr key={index} className="hover:bg-gray-100 border-b">
                        <td
                          className="font-black text-shade-blue hover:underline cursor-pointer pl-6 py-3"
                          onClick={() => viewLoan(item.no)}
                        >
                          {item.no}
                        </td>
                        <td>{`${item.borrowerFirstName} ${item.borrowerLastName}`}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="flex justify-end items-center mt-3 mb-3">
                <Pagination
                  totalCount={total}
                  itemCountPerPage={itemCountPerPage}
                  onNavigate={onPageNavigate}
                  pageNum={pageNum}
                />
                <a className="my-2 mr-5 px-2 py-1 rounded hover-shadow1" href={downloadLink} target="_blank">
                  <DownloadIcon className="h-5 w-5 text-blue-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
