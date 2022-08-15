import { TrashIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { categories } from 'pages/ConditionsAndTemplates/constant'
import React, { useState } from 'react'
import { Checkbox, Modal } from 'stories/components'

export const DeleteConditions = ({
  conditions = [],
  conditionOrder = [],
  onAfterSubmit = () => {},
}: {
  conditions: Array<any>
  conditionOrder: Array<number>
  onAfterSubmit: Function
}) => {
  const [selectedConditions, setSelectedConditions] = useState<Record<number, boolean>>({})

  const onSelectCondition = (value: boolean, conditionNo: number) => {
    const newData = cloneDeep(selectedConditions)
    if (newData[conditionNo] == value) return
    if (value) newData[conditionNo] = true
    else delete newData[conditionNo]

    setSelectedConditions(newData)
  }

  const onSubmit = async () => {
    const conditionNums = Object.keys(selectedConditions)
    onAfterSubmit(conditionNums)
    return true
  }

  const renderConditions = (category: string) => {
    if (!conditions || !conditionOrder) return null
    const visibleConds = conditions
      .filter((condition) => condition.category === category)
      .sort((a, b) => conditionOrder.indexOf(a.no) - conditionOrder.indexOf(b.no))

    return visibleConds.map((condition, index) => {
      return (
        <tr className="border-b" key={`selected-condition-${category}-${condition.no}`}>
          <td className="py-1 px-2">
            <Checkbox
              id={`delete-check-${index}`}
              value={false}
              onChange={(value) => onSelectCondition(value, condition.no)}
            />
          </td>
          <td className="px-2">{condition.no}</td>
          <td className="px-2">{condition.name}</td>
        </tr>
      )
    })
  }

  return (
    <Modal
      button={
        <span className="cursor-pointer">
          <TrashIcon className="w-5 h-5"></TrashIcon>
        </span>
      }
      title="Delete Conditions"
      titleOkay="Confirm"
      onOk={onSubmit}
    >
      <div className="w-144 overflow-auto">
        <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
          <tbody className="">
            {categories.map((category) => (
              <React.Fragment key={`selected-conditions-${category}`}>
                <tr className="border-b">
                  <td className="bg-gray-100 p-2 font-bold" colSpan={4}>
                    {category}
                  </td>
                </tr>
                {renderConditions(category)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
