import { CalculatorIcon, CheckIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { saveLoanProcess, saveLoanRatesheet } from 'services'
import svgLoading from 'stories/assets/loading.svg'
import { Tooltip } from 'stories/components/Tooltip/Tooltip'
import { formatDate } from 'utils'

import { ToggleButton } from '../../stories/components'
import type { ILoanProcess, IPriceLimit } from './interfaces'

interface Prop {
  programs: any[]
  products: any[]
  prices: any[]
  lockDays: any[]
  selectedProgramId: number | undefined
  selectedProductId: number | undefined
  selectedProgram: any[]
  selectedPrice: any
  setSelectedPrice: (arg1: any) => void
  priceIndex: { index1: number; index: number }
  setPriceIndex: (arg1: { index1: number; index: number }) => void
  limit?: IPriceLimit
  loanNumber: string
  ratesheetID: number | undefined
  loanProcessData: ILoanProcess
  setLoanProcessData: (arg1: ILoanProcess) => void
  handleSelectProgram: (arg1: number, arg2: number) => void
  showCalculated: (arg1: any, arg2: number) => void
  saveSelectedPrice: (arg1: any) => void
}

const tipsMap: Record<string, string> = {
  'AIV-LTV': `(Proposed Loan Amount - Construction Reserve) / As Is Value`,
  'ARV-LTV': `Proposed Loan Amount / After Repair Value`,
  LTC: `Proposed Loan Amount / (As Is Value + Rehab Budget)`,
  LTP: `(Proposed Loan Amount - Construction Reserve) / Property PurchasePrice`,
}

const LimitShow = (label: string, limit: any, value: any) => {
  if (limit === undefined) return null
  return (
    <div className="flex-initial w-24 mx-2">
      <div className="text-center font-bold flex justify-center gap-1 items-center">
        {label}
        <span className="">
          <Tooltip message={tipsMap[label]}></Tooltip>
        </span>
      </div>
      <div className="text-center my-1">{value}%</div>
      <div
        className={`${Number(limit) >= Number(value) ? 'bg-lime-600' : 'bg-rose-600'} rounded-t text-white text-center`}
      >
        {limit}%
      </div>
    </div>
  )
}

export function LoanResult(props: Prop) {
  const {
    programs,
    products,
    prices,
    lockDays,
    selectedProductId,
    selectedProgramId,
    selectedProgram,
    priceIndex,
    limit,
    loanNumber,
    ratesheetID,
    loanProcessData,
    setLoanProcessData,
    handleSelectProgram,
    showCalculated,
    setPriceIndex,
  } = props

  const [loaing, setLoading] = useState('')

  const selectPrice = async (arg1: any, arg2: any, index1: number, index: number) => {
    if (loanNumber === 'New') {
      return toast(`Please click 'Save to Pipeline' button before you select the pricing!`, { type: 'error' })
    }
    if (loanProcessData.rateLocked) {
      return toast('Rate Locked!', { type: 'error' })
    }
    setPriceIndex({ index1, index })
    const selctedProduct = products.find((item) => item.Id === selectedProductId)
    const _selectedProgram = programs.find((item) => item.ID === selectedProgramId)

    setLoading('SavingLoan')
    try {
      await saveLoanRatesheet({
        ratesheetID: ratesheetID,
        data: {
          prices,
          programs,
          products,
          selectedProgram,
          lockDays,
          limit,
          selectedProductId,
          selectedProgramId,
          priceIndex: { index1, index },
        },
      })
      const rateData = {
        type: selctedProduct.Description,
        program: _selectedProgram.Name,
        rate: arg2.Rate,
        price: arg1.Price,
        sheetDate: formatDate('now'),
        lockDays: arg1.LockDay.replace(/\D/g, '').trim(),
        lockedDate: '',
        rateLocked: false,
      }
      await saveLoanProcess(rateData)
    } catch (error) {
      console.log(error, 'error from selectPrice')
    }
    setLoading('')

    setLoanProcessData({
      type: selctedProduct.Description,
      program: _selectedProgram.Name,
      rate: arg2.Rate,
      price: arg1.Price,
      sheetDate: formatDate('now'),
      lockDays: arg1.LockDay.replace(/\D/g, '').trim(),
      lockedDate: '',
      rateLocked: false,
    })
  }

  const returnPricingItems = () => {
    if (products.length === 0 || programs.length === 0) return <></>
    let elements = new Array(programs.length)
    for (let i = 0; i < elements.length; i++) {
      elements[i] = new Array(products.length).fill({
        exist: false,
        programID: 0,
        productID: 0,
        programName: '',
      })
    }

    let programsMapping: any = {}
    let productsMapping: any = {}
    for (let i = 0; i < programs.length; i++) {
      programsMapping[programs[i].ID] = i
    }

    for (let i = 0; i < products.length; i++) {
      productsMapping[products[i].Id] = i
    }

    for (let i = 0; i < prices.length; i++) {
      for (let j = 0; j < prices[i].Programs.length; j++) {
        elements[programsMapping[prices[i].Programs[j].ProgramID]][productsMapping[prices[i].ProductID]] = {
          exist: true,
          programID: prices[i].Programs[j].ProgramID,
          productID: prices[i].ProductID,
          programName: prices[i].Programs[j].ProgramName,
        }
      }
    }
    let emptyFlag = true
    const programJSXElements = []
    for (let i = 0; i < programs.length; i++) {
      if (elements[i].find((item: any) => item.exist === true)) {
        emptyFlag = false
        programJSXElements.push(
          <tr key={i} className="bg-white border text-gray-900">
            {elements[i].map((item1: any, index: number) => {
              return (
                <td
                  key={`${i}-${index}`}
                  onClick={() => {
                    if (item1.exist) {
                      handleSelectProgram(item1.programID, item1.productID)
                    }
                  }}
                  className={
                    selectedProductId == item1.productID && selectedProgramId == item1.programID
                      ? 'bg-shade-blue text-white text-center border p-1'
                      : 'text-center border hover:bg-shade-blue/75 hover:text-white p-1'
                  }
                >
                  {item1.programName}
                </td>
              )
            })}
          </tr>,
        )
      }
    }
    if (!emptyFlag) {
      return programJSXElements
    } else {
      return (
        <tr className="border text-gray-900">
          <td className="border p-2 text-center" colSpan={products.length}>
            The entered criteria does not meet product guidelines...
          </td>
        </tr>
      )
    }
  }

  const onRateLock = async (val: boolean) => {
    const tmp = cloneDeep(loanProcessData)
    tmp.lockedDate = formatDate('now')
    tmp.rateLocked = val
    setLoading('IsRateLocking')
    try {
      await saveLoanProcess(tmp)
      setLoanProcessData(tmp)
    } catch (error) {
      console.log(error)
    }
    setLoading('')
  }

  useEffect(() => {}, [prices])

  return (
    <div>
      {limit && (
        <div className="block mt-4 mb-2 rounded-t shadow1 p-5 flex flex-wrap justify-around">
          {LimitShow('LTC', limit.max_ltc, limit.ltc)}
          {LimitShow('LTP', limit.max_ltp, limit.ltp)}
          {LimitShow('ARV-LTV', limit.max_arv_ltv, limit.arv_ltv)}
          {LimitShow('AIV-LTV', limit.max_aiv_ltv, limit.aiv_ltv)}
        </div>
      )}
      {prices.length != 0 && (
        <div className="overflow-auto">
          {loanProcessData.rate == -1 ? (
            <div className="mt-4 border-b pb-1">
              <span className="flex text-md text-shade-blue font-variation-settings-600">
                <ExclamationCircleIcon className="w-6 h-6" />
                Your Loan Details has been changed. You need to re-select Interest Rate from RateSheet table.
              </span>
            </div>
          ) : (
            loanProcessData.type !== '' && (
              <div className="mt-4 border-b pb-1">
                <span className="flex text-md text-shade-blue font-variation-settings-600">
                  <CheckIcon className="w-6 h-6" />
                  The interest rate you have chosen is
                </span>
                <table className="w-full table-auto cursor-pointer mb-4 shadow">
                  <thead className="text-md text-gray-700 bg-gray-50">
                    <tr>
                      <th scope="col" className="border text-[14px] p-1">
                        Type
                      </th>
                      <th scope="col" className="border text-[14px] p-1">
                        Program
                      </th>
                      <th scope="col" className="border text-[14px] p-1">
                        Rate
                      </th>
                      <th scope="col" className="border text-[14px] p-1">
                        Price(Net/No Escrow)
                      </th>
                      <th scope="col" className="border text-[14px] p-1">
                        Rate Sheet Date
                      </th>
                      <th scope="col" className="border text-[14px] p-1">
                        Lock Days
                      </th>
                      <th scope="col" className="border text-[14px] p-1">
                        Locked Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] text-gray-900">
                    <tr className="bg-white border">
                      <td className="p-1 text-center border hover:bg-shade-blue/75 hover:text-white">
                        {loanProcessData.type}
                      </td>
                      <td className="p-1 text-center border hover:bg-shade-blue/75 hover:text-white">
                        {loanProcessData.program}
                      </td>
                      <td className="p-1 text-center border hover:bg-shade-blue/75 hover:text-white">
                        {loanProcessData.rate}
                      </td>
                      <td className="p-1 text-center border hover:bg-shade-blue/75 hover:text-white">
                        {loanProcessData.price}
                      </td>
                      <td className="p-1 text-center border hover:bg-shade-blue/75 hover:text-white">
                        {loanProcessData.sheetDate}
                      </td>
                      <td className="p-1 text-center border hover:bg-shade-blue/75 hover:text-white">
                        {loanProcessData.lockDays} Day
                      </td>
                      <td className="p-1 text-center border hover:bg-shade-blue/75 hover:text-white">
                        {loanProcessData.lockedDate ? 'Yes' : 'No'}
                      </td>
                    </tr>
                    {loanNumber !== 'New' && (
                      <tr className="bg-white border">
                        <td colSpan={3} className="text-center border">
                          Rate Lock?
                          {loaing === 'IsRateLocking' && (
                            <img src={svgLoading} className="ml-2 inline w-4 h-4 text-white animate-spin" />
                          )}
                        </td>
                        <td colSpan={4} className="text-center border p-2">
                          <div className="flex justify-center">
                            <ToggleButton
                              onChange={onRateLock}
                              value={loanProcessData.rateLocked}
                              id="rate-lock-btn"
                              label={['Yes', 'No']}
                            ></ToggleButton>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )
          )}
          <table className="w-full table-auto cursor-pointer mt-4">
            <thead className="text-md text-gray-700 bg-gray-50">
              <tr className="border">
                <th colSpan={products.length} scope="colgroup" className="border py-2">
                  Products<span className="font-normal ml-1 text-[15px]">({formatDate('now')})</span>
                </th>
              </tr>
              <tr>
                {products.map((item, index) => (
                  <th scope="col" key={index} className="border text-[14px] p-1">
                    {item.Description}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">{returnPricingItems()}</tbody>
          </table>
        </div>
      )}
      {selectedProgram.length > 0 && (
        <table className="text-sm w-full table-auto mt-4 cursor-pointer">
          <thead className="text-gray-700 bg-gray-50">
            <tr className="border">
              <th className="cursor-pointer border py-2">Rate</th>
              {lockDays.map((item, index) => {
                return (
                  <th className="cursor-pointer border" key={index}>
                    {item.description} Days Lock
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {selectedProgram.map((item, index) => (
              <tr key={index} className="bg-white border cursor-pointer text-gray-900">
                <td className="text-center border">{item.Rate.toFixed(3)}</td>
                {item.LockTermPrices.map((item1: any, index1: number) => (
                  <td key={selectedProgram.length + index1} className="text-center border cursor-pointer">
                    <span className="flex flex-wrap items-center w-full">
                      <span
                        className={
                          priceIndex.index === index && priceIndex.index1 === index1
                            ? 'flex-1 py-1 bg-shade-blue text-white'
                            : 'flex-1 py-1 hover:bg-shade-blue/75 hover:text-white'
                        }
                        onClick={() => selectPrice(item1, item, index1, index)}
                      >
                        {loaing === 'SavingLoan' && priceIndex.index === index && priceIndex.index1 === index1 && (
                          // <span className="mr-2 flex items-center">
                          <img src={svgLoading} className="mr-2 inline w-3 h-3 text-white animate-spin" />
                          // </span>
                        )}
                        {item1.Price}
                      </span>
                      <span
                        className="text-slate-400 hover:text-gray-900 hover-shadow1"
                        onClick={() => showCalculated(item1, item.Rate)}
                      >
                        <CalculatorIcon className="w-4 h-4"></CalculatorIcon>
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
