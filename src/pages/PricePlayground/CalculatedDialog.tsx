import { useEffect, useState } from 'react'
import { Modal } from 'stories/components'

interface Prop {
  isOpen: boolean
  onClose: () => void
  LLPA: { [key: string]: any }
  CalcHistory: any
  Price: any
  LTV: any
  Rate: any
  Margin: any
}

export function CalculatedDialog(props: Prop) {
  const { isOpen, onClose, LLPA, Price, LTV, CalcHistory, Rate, Margin } = props
  const [llpaSum, setLLPASum] = useState(0)

  useEffect(() => {
    let sum = Number(Price.LockTermLLPA)
    Object.keys(LLPA).forEach((key) => {
      sum += Number(LLPA[key].value)
    })
    setLLPASum(sum)
  }, [LLPA, Price])

  return (
    <>
      <Modal
        button={<span></span>}
        title={'Calculation Details'}
        titleOkay=""
        titleCancel="Close"
        init={false}
        isOpen={isOpen}
        lastUpdatedAt={Date.now()}
        onClose={onClose}
        childLevel={1}
      >
        {isOpen ? (
          <div>
            <table className="w-full table-auto text-center text-[15px]">
              <tbody className="">
                <tr className="border">
                  <td className="border p-1">Rate: {Rate}</td>
                  <td className="border">Price/Pts: {Price.Price}</td>
                </tr>
                <tr className="border">
                  <td className="border p-1">Original Rate: {Rate}</td>
                  <td className="border">Original: {Price.BasePrice}</td>
                </tr>
                <tr className="border">
                  <td className="border p-1">Margin</td>
                  <td className="border">{Margin}</td>
                </tr>
              </tbody>
            </table>
            {Object.keys(LLPA).length > 0 && (
              <>
                <div className="mt-3 font-bold">Adjustment</div>
                <table className="w-full table-auto text-center text-[15px]">
                  <thead>
                    <tr className="border">
                      <th className="border text-gray-700 bg-gray-50 p-1">Name</th>
                      <th className="border text-gray-700 bg-gray-50">Description</th>
                      <th className="border text-gray-700 bg-gray-50">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(LLPA).map((key) => {
                      if (LLPA[key].isEnabled) {
                        return (
                          <tr key={key} className="border">
                            <td className="border p-1">
                              {LLPA[key].name}
                              {LLPA[key].label ? ': ' + LLPA[key].label : ''}
                              (LLPA)
                            </td>
                            <td className="border p-1">
                              {LLPA[key].from !== undefined
                                ? `${LLPA[key].name}:  ${key === 'LoanAmount' ? '$' : ''}${
                                    LLPA[key].from ? LLPA[key].from : '0'
                                  } - ${key === 'LoanAmount' ? '$' : ''}${LLPA[key].to ? LLPA[key].to : ''}, `
                                : ''}
                              LTV: {LTV.from} - {LTV.to}
                            </td>
                            <td>{LLPA[key].value}</td>
                          </tr>
                        )
                      }
                    })}
                    {Price.LockTermLLPA !== 0 && (
                      <tr className="border">
                        <td className="border p-1">Lock Term - {Price.LockDay}(LLPA)</td>
                        <td className="border">
                          LTV: {LTV.from} - {LTV.to}
                        </td>
                        <td className="border">{Price.LockTermLLPA}</td>
                      </tr>
                    )}
                    <tr className="border">
                      <th colSpan={2} scope="colgroup" className="border text-gray-700 bg-gray-50 p-1">
                        Total
                      </th>
                      <th className="border text-gray-700 bg-gray-50">{llpaSum}</th>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {CalcHistory.length > 0 && (
              <>
                <div className="mt-4 font-bold">Calculation History</div>
                <table className="w-full table-auto text-center text-[15px]">
                  <tbody>
                    {CalcHistory.map((item: any, index: number) => {
                      return (
                        <tr key={index} className="border">
                          <td className="text-left p-1">{item}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        ) : (
          <span></span>
        )}
      </Modal>
    </>
  )
}
