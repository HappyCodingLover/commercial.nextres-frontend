import { ArrowLeftIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { submitCondition } from 'services/apis/conditions'
import svgLoading from 'stories/assets/loading.svg'
import { Button, Toggle } from 'stories/components'
import { InputConvert, InputValidate, renderInput } from 'utils'

import { conditionInputs } from '../constant'

export function ConditionDetails(props: any) {
  const [isLoading, setLoading] = useState(false)
  const [inputs, setInputs] = useState<Record<string, any>>({})
  const [selectedTemplates, setSelectedTemplates] = useState<Array<number> | null>(null)
  const { templates = [], defaults = null, lastUpdatedAt } = props

  useEffect(() => {
    if (!defaults) {
      setInputs(conditionInputs())
      setSelectedTemplates([])
      return
    }
    const newStats = cloneDeep(conditionInputs()) as Record<string, any>
    for (const key in newStats) {
      newStats[key].value = defaults[key]
    }
    setInputs(newStats)

    const newTemplates: Array<number> = []
    templates.forEach((template: any) => {
      if (template.conditions.indexOf(defaults.no) != -1) newTemplates.push(template.no)
    })
    setSelectedTemplates(newTemplates)
  }, [defaults, lastUpdatedAt, templates])

  const onBack = () => {
    props.onBack()
  }

  const onChange = (key: string, value: string) => {
    let newInputs = cloneDeep(inputs)
    newInputs[key].value = InputConvert(newInputs[key], value)
    newInputs[key].error = ''
    setInputs(newInputs)
  }

  const changeTempConds = (no: number, value: boolean) => {
    if (!selectedTemplates) return
    const newValues = cloneDeep(selectedTemplates)
    const index = newValues.indexOf(no)
    if (value && index == -1) newValues.push(no)
    else if (!value && index != -1) newValues.splice(index, 1)
    setSelectedTemplates(newValues)
  }

  const onSubmit = () => {
    let hasError = false
    const newStats = cloneDeep(inputs)
    const data: Record<string, any> = {}
    for (const key in newStats) {
      const { value, disabled = false } = newStats[key]
      console.log(key, value)
      let error = InputValidate(newStats[key])
      newStats[key].error = error
      if (error.length > 0) hasError = true

      if (!disabled && value !== undefined) data[key] = value
    }
    if (hasError) {
      setInputs(newStats)
      return
    }
    setLoading(true)

    data.templates = selectedTemplates

    const id = defaults ? defaults.id : 0
    submitCondition(id, data)
      .then(() => {
        if (id == 0) toast('New condition is added.', { type: 'success' })
        else toast(`Condition No ${defaults.no} is updated.`, { type: 'success' })

        props.onComplete()
        onBack()
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="Conditions-container">
      <h2 className="text-2xl font-bold flex items-center mb-3">
        Conditions - {!defaults ? 'Add' : `Update No ${defaults.no}`}
        {isLoading && (
          <span className="ml-3">
            <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
          </span>
        )}
      </h2>
      <Button link onClick={onBack}>
        <div className="flex text-shade-blue items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-1" /> <p>Return to Conditions</p>
        </div>
      </Button>

      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mb-3">
        {Object.keys(inputs).map((key, index) => {
          const input = inputs[key]
          return (
            <div className={`input ${key == 'description' ? 'md:col-span-2' : ''}`} key={index}>
              {renderInput(input, key, onChange)}
            </div>
          )
        })}
      </div>

      <h2 className="text-md font-bold flex items-center mb-3 border-b">Templates</h2>
      <div className="grid md:grid-cols-2 mb-3">
        {selectedTemplates &&
          templates.map((item: any, index: number) => (
            <div className="col-12 col-md-6" key={`${lastUpdatedAt}-template-${index}`}>
              <Toggle
                id={item.no}
                title={`${item.no} - ${item.name}`}
                key={`${lastUpdatedAt}-template-check-${index}`}
                value={selectedTemplates.indexOf(item.no) !== -1}
                onChange={(value) => changeTempConds(item.no, value)}
              />
            </div>
          ))}
      </div>
      <div className="block text-center">
        <Button onClick={onSubmit} className="px-10" loading={isLoading}>
          <>{defaults ? 'Update' : 'Add'} Condition</>
        </Button>
      </div>
    </div>
  )
}
