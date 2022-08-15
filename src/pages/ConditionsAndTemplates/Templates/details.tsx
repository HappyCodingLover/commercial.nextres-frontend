import { ArrowLeftIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { submitTemplate, updateIntExt } from 'services/apis/conditions'
import svgLoading from 'stories/assets/loading.svg'
import { Button, ButtonGroup, Checkbox, Input2 } from 'stories/components'

import { categories } from '../constant'

export function TemplateDetails(props: any) {
  const [isLoading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [conditions, setConditions] = useState<Array<any> | null>(null)
  const [selectedConditions, setSelectedConditions] = useState<Array<number> | null>(null)
  const { conditions: _conditions = [], defaults = null, lastUpdatedAt } = props

  useEffect(() => {
    setSelectedCategory('All')
    setLoading(false)

    if (!_conditions) return
    setConditions(
      _conditions.sort((a: any, b: any) => {
        const valueA = categories.indexOf(a.category)
        const valueB = categories.indexOf(b.category)
        if (valueA < valueB) return -1
        if (valueA > valueB) return 1

        return 0
      }),
    )

    if (!defaults) {
      setName('')
      setSelectedConditions([])
      return
    }
    setName(defaults.name)
    setSelectedConditions(defaults.conditions)
  }, [defaults, lastUpdatedAt, _conditions])

  const getConditionFromNo = (conditionNo: number) => {
    return conditions?.find((condition) => condition.no === conditionNo)
  }

  const onBack = () => {
    props.onBack()
  }

  const onChangeName = (value: string) => {
    setName(value)
  }

  const onConditionCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const onChangeConditionOrder = (condition: any, value: number) => {
    if (!selectedConditions) return
    const orgPos = selectedConditions.indexOf(condition.no)
    selectedConditions.splice(orgPos, 1)

    const newConditions: Array<number> = []
    selectedConditions.forEach((conditionNo) => {
      const c = getConditionFromNo(conditionNo)
      if (c.category == condition.category) {
        if (value == 0) newConditions.push(condition.no)
        value -= 1
      }
      newConditions.push(conditionNo)
    })
    setSelectedConditions(newConditions)
  }

  const onUpdateSelectedConnection = (condition: any, value: boolean) => {
    if (!selectedConditions) return
    const { no: conditionNo } = condition
    const isSelected = selectedConditions.indexOf(conditionNo) !== -1
    if (value == isSelected) return
    if (value) selectedConditions.push(conditionNo)
    else {
      const pos = selectedConditions.indexOf(conditionNo)
      selectedConditions.splice(pos, 1)
    }
    setSelectedConditions(cloneDeep(selectedConditions))
  }

  const onUpdateIntExt = (condition: any, value: boolean) => {
    updateIntExt(condition.id, value)
  }

  const onSubmit = () => {
    if (!name) {
      setNameError('Required field')
      return
    }

    setLoading(true)
    const id = !defaults ? 0 : defaults.id
    submitTemplate(id, {
      ...defaults,
      name,
      conditions: selectedConditions,
    })
      .then(() => {
        if (id == 0) toast('New template is added.', { type: 'success' })
        else toast(`Template No ${defaults.no} is updated.`, { type: 'success' })

        props.onComplete()
        onBack()
      })
      .catch(() => setLoading(false))
  }

  const renderSelectedConditions = (category: string) => {
    if (!conditions || !selectedConditions) return null
    const visibleConds = conditions
      .filter((condition) => condition.category === category)
      .filter((condition) => selectedConditions.indexOf(condition.no) !== -1)
      .sort((a, b) => selectedConditions.indexOf(a.no) - selectedConditions.indexOf(b.no))

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
              className="text-sm py-1 border-gray-200 py-1"
              onChange={(e) => onChangeConditionOrder(condition, parseInt(e.target.value))}
            >
              {[...sortKeys].map((value) => (
                <option value={value} key={value}>
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
    <div className="Conditions-container">
      <h2 className="text-2xl font-bold flex items-center mb-3">
        Condition Templates - {!defaults ? 'Add' : `Update No ${defaults.no}`}
        {isLoading && (
          <span className="ml-3">
            <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
          </span>
        )}
      </h2>
      <Button link onClick={onBack}>
        <div className="flex items-center text-shade-blue">
          <ArrowLeftIcon className="w-4 h-4 mr-1" /> <p>Return to Templates</p>
        </div>
      </Button>

      <div className="w-full mb-3">
        <div className="input">
          <Input2 title="Name" onChange={onChangeName} value={name} required error={nameError} />
        </div>
      </div>

      <div className="flex flex-wrap justify-between mb-5">
        <div className="lg:w-[65%] w-full">
          <h2 className="text-md font-bold flex items-center mb-3 border-b">
            Choose Conditions - {conditions && conditions.length}
          </h2>
          <ButtonGroup title={['All', ...categories]} onChange={onConditionCategoryChange} value={selectedCategory} />

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-5 max-h-[80vh]">
            <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-3"></th>
                  <th scope="col" className="py-3">
                    No
                  </th>
                  <th scope="col" className="py-3">
                    Name
                  </th>
                  <th scope="col" className="">
                    Category
                  </th>
                  <th scope="col" className="">
                    Int/Ext
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {conditions &&
                  selectedConditions &&
                  conditions.map((condition: any, index: number) => {
                    if (selectedCategory !== 'All' && condition.category != selectedCategory) return null
                    return (
                      <tr
                        className="bg-white hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                        key={`${index}`}
                      >
                        <td scope="row" className="pl-3">
                          <Checkbox
                            id={`condition-no-${condition.no}`}
                            value={selectedConditions.indexOf(condition.no) !== -1}
                            onChange={(value) => onUpdateSelectedConnection(condition, value)}
                          />
                        </td>
                        <th className="py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {condition.no}
                        </th>
                        <td>{condition.name}</td>
                        <td>{condition.category}</td>
                        <td>
                          <Checkbox
                            id={`condition-ext-${condition.no}`}
                            key={`condition-ext-${condition.no}`}
                            value={condition.intext}
                            onChange={(value) => onUpdateIntExt(condition, value)}
                          />
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:w-[34%] w-full mb-5">
          <h2 className="text-md font-bold flex items-center mb-3 border-b">
            Selected Conditions - {selectedConditions && selectedConditions.length}
          </h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[80vh]">
            <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 text-center">
                    Order
                  </th>
                  <th scope="col" className="py-3 text-center">
                    No
                  </th>
                  <th scope="col" className="py-3 text-center">
                    Name
                  </th>
                  <th scope="col" className="text-center">
                    Change Order
                  </th>
                </tr>
              </thead>
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
        </div>
      </div>

      <div className="block text-center">
        <Button onClick={onSubmit} className="px-10" loading={isLoading}>
          <>{defaults ? 'Update' : 'Add'} Template</>
        </Button>
      </div>
    </div>
  )
}
