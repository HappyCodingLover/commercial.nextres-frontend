import { setLoanData, setLoanDetail } from 'actions'
import cloneDeep from 'clone-deep'
import { LayoutLoading } from 'components/LayoutLoading'
import {
  groupedFields,
  initialLoanFields,
  priceLimitRelatedFields,
  priceLoanRelatedFields,
} from 'config/loan.constants'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getLatestLoanRatesheet,
  getLoanProcess,
  getPriceLimit,
  priceLoan,
  saveLoanProcess,
  saveLoanRatesheet,
  saveToPipeLine,
  updateLoanFields,
} from 'services'
import svgLoading from 'stories/assets/loading.svg'
import { Button } from 'stories/components'
import { InputConvert, InputValidate, openAuditLog, renderInput } from 'utils'

import Api from '../../services/api'
import { CalculatedDialog } from './CalculatedDialog'
import { InEligibleDialog } from './InEligibleDialog'
import type {
  IInElibileProduct,
  ILoanProcess,
  IPrice,
  IPrice_Program,
  IPrice_Program_Price,
  IPriceLimit,
  IProduct,
  IProgram,
} from './interfaces'
import { LoanResult } from './LoanResult'
import { loanDataConvert, loanFieldsInternalLogic, visibleLoansLogic } from './Logic'

export function PricingPlayground(props: { loan_number: string }) {
  const { loan_number } = props
  const [visibleFields, setVisibleFields] = useState(['productType', 'transactionType'])
  const [loanFields, setLoanFields] = useState(initialLoanFields)
  const [inEligibleProducts, setInEligibleProducts] = useState<IInElibileProduct>({})
  const [programs, setPrograms] = useState<IProgram[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [selectedProductId, setSelectedProductId] = useState<number>()
  const [selectedProgramId, setSelectedProgramId] = useState<number>()
  const [selectedProgram, setSelectedProgram] = useState<IPrice_Program_Price[]>([])
  const [selectedPrice, setSelectedPrice] = useState<any>(null)
  const [priceIndex, setPriceIndex] = useState<{ index1: number; index: number }>({ index1: -1, index: -1 })
  const [lockDays, setLockDays] = useState([])
  const [prices, setPrices] = useState<IPrice[]>([])
  const [ratesheetID, setRatesheetID] = useState<number>()
  const [limit, setLimit] = useState<IPriceLimit | undefined>()
  const [dialog, setDialog] = useState<string>('')
  const [lockTermPrice, setLockTermPrice] = useState<number>(0)
  const [LLPA, setLLPA] = useState({})
  const [LTV, setLTV] = useState<{ from: number; to: number }>({ from: 0, to: 0 })
  const [margin, setMargin] = useState<number>()
  const [calcHistory, setCalcHistory] = useState<string[]>([])
  const [selectedRate, setSelectedRate] = useState<number>(0)
  const [showingFields, setShowingFields] = useState(groupedFields)
  const [loading, setLoading] = useState('')
  const [loanDetailSync, setLoanDetailSync] = useState(false)
  const [ratesheetSync, setRatesheetSync] = useState(false)
  const [fieldValueChanged, setFieldValueChanged] = useState(false)
  const [loanProcessData, setLoanProcessData] = useState<ILoanProcess>({
    type: '',
    program: '',
    rate: 0,
    price: 0,
    sheetDate: '',
    lockDays: 0,
    lockedDate: '',
    rateLocked: false,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { loan } = useSelector((state: any) => {
    return {
      loan: state.loan,
    }
  })

  const onShowHistory = async (key: string) => {
    const options = {
      table: 'Loan',
      field: key,
      keys: {
        field: key,
      },
    }
    openAuditLog(options)
  }

  const onBlur = async (key: string) => {
    if (!fieldValueChanged) return
    setLoanDetailSync(true)
    setRatesheetSync(true)
    try {
      if (loan_number !== 'New') {
        await _updateLoanFields(key)
      }
      if (priceLimitRelatedFields.indexOf(key) > -1) {
        await onGetPriceLimit()
      }
      if (priceLoanRelatedFields.indexOf(key) > -1) {
        await onPriceLoan()
      }
      if (loan_number !== 'New') {
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
            priceIndex: { index1: priceIndex.index1, index: priceIndex.index },
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
    setRatesheetSync(false)
    setLoanDetailSync(false)
    setFieldValueChanged(false)
  }

  const onChangeLoanInputFields = async (key: string, e: any) => {
    setFieldValueChanged(true)
    const tempLoanFields = cloneDeep(loanFields)
    tempLoanFields[key].error = ''

    let value = InputConvert(tempLoanFields[key], e)
    const _setLoanData = (data: { key: string; data: any }) =>
      new Promise((resolve) => {
        dispatch(setLoanData(data))
        resolve(true)
      })
    await _setLoanData({ key: key, data: value })
    // dispatch(setLoanData({ key: key, data: value }))
    setVisibleFields(visibleLoansLogic())
    setLoanFields(loanFieldsInternalLogic(tempLoanFields))
  }

  /**
   *
   * @param isPriceLoan isPriceLoan = true then check Only the fields related to pricing, else check all visible fields
   * @returns
   */
  const checkValidation = (isPriceLoan: boolean = true) => {
    let flag = true
    let tempLoanField = cloneDeep(loanFields)
    for (let i = 0; i < visibleFields.length; i++) {
      const visibleField = visibleFields[i]
      if (isPriceLoan) {
        if (priceLoanRelatedFields.indexOf(visibleField) === -1) continue
      }
      const error = InputValidate({ ...loanFields[visibleField], value: loan[visibleField] })
      if (error.length > 0) {
        tempLoanField[visibleField].error = error
        flag = false
      }
    }
    if (!flag) setLoanFields(tempLoanField)
    return flag
  }

  const _saveToPipeline = async () => {
    if (checkValidation(false)) {
      const reqBody: { [key: string]: any } = {}
      visibleFields.map((field) => {
        reqBody[field] = loan[field]
      })
      setLoading('SaveToPipeline')
      try {
        const result = await saveToPipeLine(reqBody)
        Api.setLoanNumber(result.loan_number)
        if (ratesheetID) {
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
              priceIndex: { index1: priceIndex.index1, index: priceIndex.index },
            },
          })
        }
        navigate(location.pathname.replace('new', result.loan_number))
      } catch (error: any) {
        console.log(error)
        toast(error, { type: 'error' })
      }
      setLoading('')
    } else {
      toast('Input All Required Fields!', { type: 'error' })
    }
  }

  const _updateLoanFields = async (key: string) => {
    return new Promise((resolve) => {
      const reqBody: { [key: string]: any } = {}
      reqBody[key] = loan[key]
      updateLoanFields(reqBody)
        .then((result) => {
          console.log(result)
          resolve(true)
        })
        .catch((error) => {
          console.log(error)
          resolve(false)
        })
    })
  }

  const onGetPriceLimit = async () => {
    return new Promise(async (resolve, reject) => {
      if (
        loan['productType'] &&
        loan['transactionType'] &&
        loan['productType'] !== 'Commercial DSCR' &&
        loan['productType'] !== 'Residential DSCR'
      ) {
        const reqBody: { [key: string]: any } = {}
        visibleFields.map((field) => {
          reqBody[field] = loan[field]
        })

        getPriceLimit(reqBody)
          .then((result) => {
            if (result.status === 'Success') {
              const res: IPriceLimit = result.data
              setLimit(res)
            } else {
              console.log(result)
            }
            resolve(true)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      } else {
        resolve(true)
      }
    })
  }

  const onPriceLoan = (isSync: boolean = true, customVisibleFields: Array<string> = []) => {
    return new Promise((resolve) => {
      if (loanProcessData.rateLocked) {
        toast('Rate Locked!', { type: 'error' })
        return resolve(false)
      }
      if (checkValidation(true)) {
        //price loan
        const reqBody: { [key: string]: any } = {}
        if (customVisibleFields.length === 0) {
          visibleFields.map((field) => {
            reqBody[field] = loan[field]
          })
        } else {
          customVisibleFields.map((field) => {
            reqBody[field] = loan[field]
          })
        }
        setSelectedProgram([])
        setPrices([])
        setLoading('PriceLoan')
        const tmpLoanProcessData = cloneDeep(loanProcessData)
        if (tmpLoanProcessData.type !== '') {
          tmpLoanProcessData.rate = -1
          saveLoanProcess(tmpLoanProcessData)
            .then((result) => {
              console.log(result)
              setLoanProcessData(tmpLoanProcessData)
              setPriceIndex({ index1: -1, index: -1 })
            })
            .catch((error) => {
              console.log(error)
            })
        }
        priceLoan(reqBody)
          .then((result) => {
            console.log(result)
            setLoading('')
            if (result.status === 'Success') {
              const res = result.data
              setRatesheetID(res.RatesheetID)
              setPrograms(res.Programs)
              setProducts(res.MortgageProducts)
              setInEligibleProducts(res.InEligibleProducts)
              setLockDays(res.LockDays)
              setPrices(res.Prices)
              setPriceIndex({ index1: -1, index: -1 })
              if (res.Prices.length > 0) {
                let prodId = Infinity
                let progId = Infinity
                for (let i = 0; i < res.Prices.length; i++) {
                  if (res.Prices[i].Programs.length > 0) {
                    prodId = res.Prices[i].ProductID
                    progId = res.Prices[i].Programs[0].ProgramID
                    break
                  }
                }
                if (prodId !== Infinity && progId !== Infinity) {
                  setSelectedProductId(prodId)
                  setSelectedProgramId(progId)
                  const arr = res.Prices.find((item: any) => item.ProductID === prodId).Programs.find(
                    (item: any) => item.ProgramID === progId,
                  ).Prices
                  setSelectedProgram(arr)
                }
              }
              if (loan['productType'] === 'Commercial DSCR' || loan['productType'] === 'Residential DSCR') {
                setLimit(undefined)
              }
              resolve(true)
            } else {
              toast(result.message, { type: 'error' })
              resolve(false)
            }
          })
          .catch((error) => {
            setLoading('')
            console.log(error)
            resolve(false)
          })
      } else {
        if (!isSync) {
          toast('Input All Required Fields!', { type: 'error' })
        }
        resolve(false)
      }
    })
  }

  const handleSelectProgram = (programId: number, productId: number) => {
    if (loanProcessData.rateLocked) {
      toast('Rate Locked!', { type: 'error' })
      return
    }
    const arr = prices
      .find((item: IPrice) => item.ProductID === productId)
      ?.Programs.find((item1: IPrice_Program) => item1.ProgramID === programId)?.Prices

    if (arr) {
      setSelectedProgram(arr)
      setSelectedProductId(productId)
      setSelectedProgramId(programId)
      setPriceIndex({ index1: -1, index: -1 })
    }
  }

  const showCalculated = (lockTermPrice: number, rate: number) => {
    const program = prices
      .find((item: IPrice) => item.ProductID === selectedProductId)
      ?.Programs.find((item: any) => item.ProgramID === selectedProgramId)
    if (program) {
      const LLPA = program.LLPA
      const LTV = program.LTV
      const calcHistory = program.CalcHistory
      const margin = program.Margin
      setLockTermPrice(lockTermPrice)
      setLLPA(LLPA)
      setLTV(LTV)
      setMargin(margin)
      setCalcHistory(calcHistory)
      setSelectedRate(rate)
      if (Object.keys(LLPA).length || calcHistory.length) {
        setDialog('CalculatedDialog')
      }
    }
  }

  useEffect(() => {
    const flag: { [key: string]: boolean } = {}
    visibleFields.map((key) => (flag[key] = true))
    const nShowedFields: string[][] = []
    groupedFields.map((fields) => {
      const newFields = fields.filter((key) => flag[key] === true)
      if (newFields.length > 0) {
        nShowedFields.push(newFields)
      }
    })
    setShowingFields(nShowedFields)
  }, [visibleFields])

  useEffect(() => {
    setVisibleFields(visibleLoansLogic())
    setLoanFields(loanFieldsInternalLogic(loanFields))
    loanDataConvert(loanFields)
    const syncPricing = async () => {
      if (loan_number !== 'New') {
        try {
          setRatesheetSync(true)
          const loanRatesheetData = await getLatestLoanRatesheet()
          if (loanRatesheetData.success) {
            const ratesheetData = loanRatesheetData.data.data
            setPrices(ratesheetData.prices)
            setSelectedProductId(ratesheetData.selectedProductId)
            setSelectedProgramId(ratesheetData.selectedProgramId)
            setSelectedProgram(ratesheetData.selectedProgram)
            setProducts(ratesheetData.products)
            setPrograms(ratesheetData.programs)
            setLockDays(ratesheetData.lockDays)
            setPriceIndex(ratesheetData.priceIndex)
            setRatesheetID(loanRatesheetData.data.ratesheetID)
            if (ratesheetData.limit) {
              setLimit(ratesheetData.limit)
            }
          }
          // else {
          //   onPriceLoan(true, visibleLoansLogic())
          //   onGetPriceLimit()
          // }
          const loanProcessData = await getLoanProcess()
          if (loanProcessData.success) {
            const processData: ILoanProcess = loanProcessData.data
            setLoanProcessData(processData)
          }
          setRatesheetSync(false)
        } catch (error) {
          console.log(error)
        }
      }
    }
    syncPricing()
  }, [])

  return (
    <div className="PricingPlayground-container px-2">
      <div className="max-w-screen-2xl m-auto grid grid-cols-12 md:gap-6">
        <div className="relative shadow1 md:col-span-6 col-span-12 bg-white rounded p-4 md:p-6 mb-4">
          {/* <LayoutLoading show={loanDetailSync} /> */}
          <div className="text-2xl font-bold mb-4 flex items-center">
            <span>Loan Details</span>
            {loanDetailSync && (
              <span className="ml-4 flex items-center">
                <img src={svgLoading} className="inline w-5 h-5 text-white animate-spin" />
              </span>
            )}
          </div>

          {showingFields.map((fields, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 block mt-4 mb-5 rounded-t border border-solid border-gray-200 shadow p-2 flex justify-around"
              >
                {fields.map((key, index1) => {
                  return (
                    <div
                      key={`${index}-${index1}`}
                      className={key !== 'subjectPropertyAddress' ? 'md:col-span-1' : 'md:col-span-2'}
                    >
                      {renderInput(
                        {
                          ...loanFields[key],
                          value: loan[key],
                          history: loan_number !== 'New',
                        },
                        key,
                        onChangeLoanInputFields,
                        onShowHistory,
                        onBlur,
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="relative shadow1 md:col-span-6 col-span-12 bg-white rounded p-4 md:p-6 mb-4">
          <LayoutLoading show={ratesheetSync} />
          <div className="text-2xl font-bold mb-4 flex items-center">
            <span>Request Rate Sheet</span>
            {ratesheetSync && (
              <span className="ml-4 flex items-center">
                <img src={svgLoading} className="inline w-5 h-5 text-white animate-spin" />
              </span>
            )}
          </div>

          <div className="text-base text-gray-800">Instructions:</div>
          <div className="text-sm text-gray-800">
            1. Click on the “Price Loan” button to get your interest rates and base prices.
          </div>
          <div className="text-sm text-gray-800 mb-4">
            2. If you make changes to the loan details, click the button again to update rates.
          </div>
          <Button className="w-full" onClick={() => onPriceLoan(false)} loading={loading === 'PriceLoan'}>
            Price Loan
          </Button>
          <LoanResult
            programs={programs}
            products={products}
            prices={prices}
            selectedProgramId={selectedProgramId}
            selectedProductId={selectedProductId}
            selectedProgram={selectedProgram}
            lockDays={lockDays}
            handleSelectProgram={handleSelectProgram}
            showCalculated={showCalculated}
            loanNumber={loan_number}
            limit={limit}
            selectedPrice={selectedPrice}
            priceIndex={priceIndex}
            setSelectedPrice={setSelectedPrice}
            setPriceIndex={setPriceIndex}
            ratesheetID={ratesheetID}
            loanProcessData={loanProcessData}
            setLoanProcessData={setLoanProcessData}
            saveSelectedPrice={(data: any) => {
              dispatch(setLoanDetail(data))
            }}
          />
          <div className="text-center">
            {Object.keys(inEligibleProducts).length > 0 && (
              <Button
                color="red"
                className="mt-4"
                onClick={() => {
                  console.log(dialog, 'dialog')
                  setDialog('InEligibleDialog')
                }}
              >
                View Ineligible Products
              </Button>
            )}
          </div>
          <InEligibleDialog
            isOpen={dialog === 'InEligibleDialog'}
            onClose={() => {
              setDialog('')
            }}
            inEligibleProducts={inEligibleProducts}
          />
          {selectedProgram.length > 0 && (
            <CalculatedDialog
              isOpen={dialog === 'CalculatedDialog'}
              onClose={() => setDialog('')}
              LLPA={LLPA}
              CalcHistory={calcHistory}
              Price={lockTermPrice}
              LTV={LTV}
              Rate={selectedRate}
              Margin={margin}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        {loan_number === 'New' && (
          <Button loading={loading === 'SaveToPipeline'} onClick={_saveToPipeline}>
            Save To Pipeline
          </Button>
        )}
      </div>
    </div>
  )
}
