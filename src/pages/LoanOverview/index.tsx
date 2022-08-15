import { BanIcon, CheckIcon, ChevronLeftIcon, PencilAltIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { LayoutLoading } from 'components/LayoutLoading'
import { LoanDetail } from 'components/LoanDetail'
import { LoanStatus } from 'components/LoanStatus'
import { LoanApplication } from 'pages/LoanApplication'
import { LoanSubmission } from 'pages/LoanSubmission'
import { MyPortal } from 'pages/MyPortal'
import { PricingPlayground } from 'pages/PricePlayground'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { partiesMap } from 'reducers/loanDetail.reducer'
import { mapStepDetailDescription } from 'reducers/step.reducer'
import svgLoading from 'stories/assets/loading.svg'
import { Toggle } from 'stories/components'
import { useTitle } from 'utils'

import { History } from './history'
import { loanOverviewAndStepLogic } from './loanOverviewAndStepLogic'

export function LoanOverview() {
  const { loanDetail, step } = useSelector((state: any) => {
    return {
      loanDetail: state.loanDetail,
      step: state.step,
    }
  })

  const [loanLoaded, setLoanLoaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState('overview')
  const [header, setHeader] = useState({
    goBack: 'Return to Pipeline',
    title: 'Loan Overview',
  })

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = location.pathname.split('/')
    setLoading(true)
    const newMenu = params[2]
    setMenu(newMenu)
    menuChanged(newMenu, params[3])
  }, [location.pathname])

  useEffect(() => {
    const params = location.pathname.split('/')
    useTitle(`${params[3]} - ${header.title} - ${process.env.REACT_APP_COMPANY}`)
  }, [header])

  const menuChanged = async (newMenu: string, loanNumber: string) => {
    if (!loanLoaded || loanNumber === 'new') {
      setLoading(true)
      const params = location.pathname.split('/')
      const res: any = await loanOverviewAndStepLogic(params[3], newMenu)
      setLoanLoaded(true)
      setLoading(false)
      if (res.success === false) {
        if (res.message === 'Redirect Pipeline') return navigate('/pipeline')
        if (res.message === 'Redirect Overview') return navigate(location.pathname.replace(newMenu, 'overview'))
      }
    }
    setLoading(false)
    let newHeader = cloneDeep(header)
    switch (newMenu) {
      case 'overview':
        newHeader.goBack = 'Return to Pipeline'
        newHeader.title = 'Loan Overview'
        break
      case 'structure':
        newHeader.goBack = 'Return to Loan Overview'
        newHeader.title = 'Loan Structure'
        setLoanLoaded(false)
        break
      case 'application':
        newHeader.goBack = 'Return to Loan Overview'
        newHeader.title = 'Loan Application'
        setLoanLoaded(false)
        break
      case 'submit':
        newHeader.goBack = 'Return to Loan Overview'
        newHeader.title = 'Loan Submission'
        setLoanLoaded(false)
        break
    }
    setHeader(newHeader)
  }

  const changeUrl = (key: string) => {
    navigate(location.pathname.replace(menu, key))
  }

  const onEdit = (key: string) => {
    changeUrl(key)
  }

  const renderHeader = () => {
    let goBackPath = '/pipeline'
    let headerTitle = header.title
    if (header.goBack === 'Return to Loan Overview') {
      const params = location.pathname.split('/')
      goBackPath = location.pathname.replace(params[2], 'overview')
    }
    return (
      <div className="relative">
        <LayoutLoading show={loading} />
        <div className="text-shade-blue flex items-center mb-2 font-bold">
          <ChevronLeftIcon className="w-4 h-4"></ChevronLeftIcon>
          <span className="ml-1 cursor-pointer hover:underline" onClick={() => navigate(goBackPath)}>
            {header.goBack}
          </span>
        </div>
        <div className="flex flex-wrap justify-between">
          <h1 className="text-2xl font-bold flex items-center mb-2">
            <span>{headerTitle}</span>{' '}
            <span className="text-base ml-3">
              {loading && <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />}
            </span>
          </h1>
        </div>
        <div className="mt-1 flex flex-wrap">
          <div className="">
            <LoanDetail
              loan_number={loading ? '' : loanDetail.loanNumber}
              borrower_name={loading ? '' : loanDetail.borrowerName}
              property_address={loading ? '' : loanDetail.propertyAddress}
            />
          </div>
          <div className="md:mx-10 flex flex-wrap">
            <div className="mr-2 text-[14px]">Loan Status:</div>
            <div className="md:-mt-2">
              <LoanStatus />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSteps = () => {
    switch (menu) {
      case 'overview':
        return renderOverview()
      case 'structure':
        return <PricingPlayground loan_number={loanDetail.loanNumber} />
      case 'application':
        return <LoanApplication />
      case 'submit':
        return <LoanSubmission />
      case 'portal':
        return <MyPortal />
    }
  }

  const renderOverview = () => {
    let rlt: any[] = []
    Object.keys(step.overview).map((key, index) => {
      const item: any = step.overview[key]
      const { status, detail, label } = item
      let bg_cn = '',
        font_cn = '',
        cursor_cn = '',
        btn_cn = 'border-shade-blue hover:bg-shade-blue hover:text-white',
        btn_disabled = false
      if (status === -1) {
        font_cn = 'text-gray-400'
        cursor_cn = 'cursor-not-allowed'
        btn_cn = 'border-gray-400 cursor-not-allowed'
        btn_disabled = true
      }
      if (status === 1) {
        bg_cn = 'bg-slate-50'
      }
      rlt.push(
        <div className={`flex flex-col p-2 md:p-4 shadow rounded-md ${bg_cn} ${font_cn} ${cursor_cn}`} key={index}>
          <div className="font-black text-[20px] flex justify-between">
            <span>
              {index + 1}. {label}
            </span>
            {status === -1 ? (
              <BanIcon className="w-4 h-4 text-gray-400"></BanIcon>
            ) : (
              <PencilAltIcon className="w-4 h-4"></PencilAltIcon>
            )}
          </div>
          <div className="mt-4">Status: {status === 1 && <span className="ml-1 text-shade-blue">Completed</span>}</div>
          <div className="text-[14px] mt-2 flex-1">
            {Object.keys(detail).map((key, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <span>- {mapStepDetailDescription[key]}</span>
                  {detail[key] === 1 && (
                    <span className="ml-1 mb-0.5 text-shade-blue">
                      <CheckIcon className="w-5 h-5"></CheckIcon>
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          {detail.length > 0 && (
            <div className="text-[14px] mt-2">
              <span dangerouslySetInnerHTML={{ __html: detail }} />
            </div>
          )}
          <div className="mt-6">
            <button
              disabled={btn_disabled}
              className={`${btn_cn} border px-5 py-2.5 w-full rounded`}
              onClick={() => onEdit(key)}
            >
              Edit
            </button>
          </div>
        </div>,
      )
    })
    const { parties } = loanDetail
    rlt.push(
      <div className={`flex flex-col p-2 md:p-4 shadow rounded-md text-[15px]`} key={'parties'}>
        <div className="border-b font-bold mb-1">Parties</div>
        <div className="overflow-auto">
          <table className="w-full">
            <tbody>
              {Object.keys(parties).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{partiesMap[key]}:</td>
                    <td>{parties[key].email}</td>
                  </tr>
                )
              })}
              <tr className="border-b">
                <td className="pt-1"></td>
              </tr>
              <tr>
                <td className="pt-2">Closing Date:</td>
                <td>06/30/2022</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>,
    )
    return (
      <div className="grid md:grid-cols-6 md:gap-10 max-w-screen-2xl m-auto">
        <div className="md:col-span-4 p-2 md:p-4 shadow1 rounded mb-4">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">{rlt}</div>
        </div>
        <div className="md:col-span-2 p-2 md:p-4 shadow1 rounded mb-4">
          <div className="text-[18px] font-bold flex items-center">
            <span>Quick Links</span>
          </div>
          <div className="block rounded h-px bg-gray-300 mb-3 mt-1"></div>
          <ol className="ml-2 list-decimal pl-4">
            {Object.keys(step.overview).map((key, index) => {
              const item = step.overview[key]
              let cn = 'cursor-pointer hover:underline'
              if (item.status === -1) {
                cn = 'cursor-not-allowed text-gray-400'
              }
              return (
                <li className={`my-2 ${cn}`} key={index}>
                  {item.label}
                </li>
              )
            })}
          </ol>
          <div className="text-[18px] font-bold flex items-center mt-4">
            <span>Loan Progress Restrictions</span>
          </div>
          <div className="block rounded h-px bg-gray-300 mb-3 mt-1"></div>
          <div className="ml-2">
            <div className="mt-4">
              <Toggle
                className=""
                id={'restructureApplication'}
                title={'Restructure Application Release?'}
                key={'restructureApplication'}
                value={true}
                onChange={(value) => onPermissionChange('restructureApplication', value)}
              />
            </div>
            <div className="mt-4">
              <Toggle
                className=""
                id={'setupOnHold'}
                title={'Loan Setup on Hold?'}
                key={'setupOnHold'}
                value={true}
                onChange={(value) => onPermissionChange('setupOnHold', value)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onPermissionChange = (key: string, value: boolean) => {
    console.log(key, value)
  }

  return (
    <div className="Loanoverview-container py-6 px-2">
      <div className="shadow1 mb-6 max-w-screen-2xl m-auto bg-white rounded p-3 md:p-7 text-left w-full">
        {renderHeader()}
      </div>
      {!loading && renderSteps()}
      <History loanNumber={loanDetail.loanNumber} />
    </div>
  )
}
