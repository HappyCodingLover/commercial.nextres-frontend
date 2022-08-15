import { ArrowLeftIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { submitTask } from 'services/apis/conditions'
import svgLoading from 'stories/assets/loading.svg'
import { AutoComplete, Button } from 'stories/components'
import { InputConvert, InputValidate, renderInput } from 'utils'

import { taskInputs } from '../constant'

export function TaskDetails(props: any) {
  const [isLoading, setLoading] = useState(false)
  const [inputs, setInputs] = useState<Record<string, any>>({})
  const { defaults = null, lastUpdatedAt } = props
  const [completeEmail, setCompleteEmail] = useState<Array<string>>([])
  const [createEmail, setCreateEmail] = useState<Array<string>>([])
  const [completeEmailError, setCompleteEmailError] = useState('')
  const [createEmailError, setCreateEmailError] = useState('')

  useEffect(() => {
    if (!defaults) {
      setInputs(taskInputs())
      return
    }
    const newStats = cloneDeep(taskInputs()) as Record<string, any>
    for (const key in newStats) {
      newStats[key].value = defaults[key]
    }
    setInputs(newStats)
    setCompleteEmail(defaults.completeEmail || [])
    setCreateEmail(defaults.createEmail || [])
  }, [defaults, lastUpdatedAt])

  const onBack = () => {
    props.onBack()
  }

  const onChange = (key: string, value: string) => {
    let newInputs = cloneDeep(inputs)
    newInputs[key].value = InputConvert(newInputs[key], value)
    newInputs[key].error = ''
    setInputs(newInputs)
  }

  const onUpdateCompleteEmail = (values: Array<string>) => {
    setCompleteEmail(values)
    setCompleteEmailError('')
  }

  const onUpdateCreateEmail = (values: Array<string>) => {
    setCreateEmail(values)
    setCreateEmailError('')
  }

  const onSubmit = () => {
    let hasError = false
    const newStats = cloneDeep(inputs)
    const data: Record<string, any> = {}
    for (const key in newStats) {
      const { value, disabled = false } = newStats[key]
      let error = InputValidate(newStats[key])
      newStats[key].error = error
      if (error.length > 0) hasError = true
      if (!disabled && value !== undefined) data[key] = value
    }

    // if (!completeEmail.length) {
    //   setCompleteEmailError('Required field')
    //   hasError = true
    // }

    // if (!createEmail.length) {
    //   setCreateEmailError('Required field')
    //   hasError = true
    // }

    data.completeEmail = completeEmail
    data.createEmail = createEmail

    if (hasError) {
      setInputs(newStats)
      return
    }
    setLoading(true)
    const id = defaults ? defaults.id : 0
    submitTask(id, data)
      .then(() => {
        if (id == 0) toast('New task is added.', { type: 'success' })
        else toast(`Task No ${defaults.no} is updated.`, { type: 'success' })
        props.onComplete()
        onBack()
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="task-container">
      <h2 className="text-2xl font-bold flex items-center mb-3">
        Tasks - {!defaults ? 'Add' : `Update No ${defaults.no}`}
        {isLoading && (
          <span className="ml-3">
            <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
          </span>
        )}
      </h2>
      <Button link onClick={onBack}>
        <div className="flex text-shade-blue items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-1" /> <p>Return to Tasks</p>
        </div>
      </Button>

      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mb-3">
        {Object.keys(inputs).map((key, index) => {
          const input = inputs[key]

          return (
            <div className="input" key={index}>
              {renderInput(input, key, onChange)}
            </div>
          )
        })}
      </div>

      <AutoComplete
        type="email"
        title="Send Notifications when Complete"
        placeholder="Your additional contact email here"
        value={completeEmail}
        error={completeEmailError}
        onChange={onUpdateCompleteEmail}
      />

      <AutoComplete
        type="email"
        title="Send Notifications when Create"
        placeholder="Your additional contact email here"
        value={createEmail}
        error={createEmailError}
        onChange={onUpdateCreateEmail}
      />

      <div className="block text-center">
        <Button onClick={onSubmit} className="px-10" loading={isLoading}>
          <>{defaults ? 'Update' : 'Add'} Task</>
        </Button>
      </div>
    </div>
  )
}
