import { SortAscendingIcon } from '@heroicons/react/outline'
import { categories } from 'pages/ConditionsAndTemplates/constant'
import React, { useEffect, useState } from 'react'
import { Modal } from 'stories/components'

export const ConditionOrderChange = ({
  conditions = [],
  conditionOrder: _conditionOrder = [],
  onAfterSubmit = () => {},
}: {
  conditions: Array<any>
  conditionOrder: Array<number>
  onAfterSubmit: Function
}) => {
  const [conditionOrder, setConditionOrder] = useState<Array<number> | null>(null)

  useEffect(() => {
    setConditionOrder(_conditionOrder)
  }, [_conditionOrder])

  const getConditionFromNo = (conditionNo: number) => {
    return conditions?.find((condition) => condition.no === conditionNo)
  }

  const onChangeConditionOrder = (condition: any, value: number, orgPos: number) => {
    console.log('track1 0', condition, value, orgPos)
    if (!conditions || !conditionOrder) return
    if (conditionOrder.includes(condition.no)) conditionOrder.splice(orgPos, 1)

    const newConditions: Array<number> = []
    conditionOrder.forEach((conditionNo) => {
      const c = getConditionFromNo(conditionNo)
      if (condition.category == c.category) {
        if (value == 0) newConditions.push(condition.no)
        value -= 1
      }
      newConditions.push(conditionNo)
    })
    setConditionOrder(newConditions)
    console.log('track1', newConditions)
  }

  const onSubmit = async () => {
    onAfterSubmit(conditionOrder)
    return true
  }

  const renderSelectedConditions = (category: string) => {
    if (!conditions || !conditionOrder) return null
    const visibleConds = conditions
      .filter((condition) => condition.category === category)
      .sort((a, b) => {
        let orderA = conditionOrder.indexOf(a.no)
        let orderB = conditionOrder.indexOf(b.no)
        if (orderA == -1) orderA = 0
        if (orderB == -1) orderB = 0
        return orderA - orderB
      })

    return visibleConds.map((condition, index) => {
      const sortKeys = Object.keys(Array(index + 1).fill(1))
      return (
        <tr className="text-center border-b" key={`selected-condition-${category}-${condition.no}`}>
          <td className="py-1">{index + 1}</td>
          <td>{condition.no}</td>
          <td>{condition.name}</td>
          <td className="px-1 text-right">
            <select
              value={index}
              className="text-sm py-1 border-gray-200 pr-2 w-16"
              onChange={(e) => onChangeConditionOrder(condition, parseInt(e.target.value), index)}
            >
              {[...sortKeys].map((value) => (
                <option value={value} key={`option-${value}`}>
                  {parseInt(value) + 1}
                </option>
              ))}
            </select>
          </td>
        </tr>
      )
    })
  }

  return (
    <Modal
      button={
        <span className="cursor-pointer">
          <SortAscendingIcon className="w-6 h-6"></SortAscendingIcon>
        </span>
      }
      title="Condition Order Change"
      titleOkay="Confirm"
      onOk={onSubmit}
    >
      <div className="w-144">
        <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
          <tbody className="">
            {categories.map((category) => (
              <React.Fragment key={`selected-conditions-${category}`}>
                <tr className="border-b">
                  <td className="bg-gray-100 p-2 font-bold" colSpan={4}>
                    {category}
                  </td>
                </tr>
                {renderSelectedConditions(category)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
