import { useEffect, useState } from 'react'
import { ButtonGroup, Modal } from 'stories/components'

import type { IInElibileProduct } from './interfaces'

interface Prop {
  isOpen: boolean
  onClose: () => void
  inEligibleProducts: IInElibileProduct
}

export function InEligibleDialog(props: Prop) {
  const { isOpen, onClose, inEligibleProducts } = props
  const [inEligibleProductKey, setInEligibleProductKey] = useState<string>('')
  useEffect(() => {
    const key = Object.keys(inEligibleProducts)[0]
    setInEligibleProductKey(key)
  }, [inEligibleProducts])
  return (
    <>
      <Modal
        button={<span></span>}
        title={'InEligible Products'}
        titleOkay=""
        titleCancel="Close"
        init={false}
        isOpen={isOpen}
        lastUpdatedAt={Date.now()}
        onClose={onClose}
        childLevel={1}
      >
        {isOpen ? (
          <div className="">
            <div className="">
              <ButtonGroup
                title={[...Object.keys(inEligibleProducts)]}
                onChange={(e: any) => setInEligibleProductKey(e)}
                value={inEligibleProductKey}
              />
            </div>
            <table className="w-full table-auto mt-4 text-center text-[14px]">
              <thead className="text-md text-gray-700 bg-gray-50">
                <tr className="border">
                  <th className="border p-1">Field</th>
                  <th className="border">Value</th>
                  <th className="border">Description</th>
                </tr>
              </thead>
              <tbody>
                {inEligibleProducts[inEligibleProductKey].map(
                  (
                    item: {
                      name: string
                      value: string
                      description: string
                      ltvMaxCalcHistory?: string[]
                    },
                    index: number,
                  ) => {
                    return (
                      <tr key={index} className="border">
                        <td className="border p-1">{item.name}</td>
                        <td className="border">{item.value}</td>
                        <td className="border">
                          {item.description}
                          {item.ltvMaxCalcHistory && (
                            <ul className="text-left font-weight-400">
                              {item.ltvMaxCalcHistory.map((item: string, index1: number) => {
                                return <li key={index1}>{item}</li>
                              })}
                            </ul>
                          )}
                        </td>
                      </tr>
                    )
                  },
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <span></span>
        )}
      </Modal>
    </>
  )
}
