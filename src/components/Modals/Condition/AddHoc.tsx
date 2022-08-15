import cloneDeep from 'clone-deep'
import { conditionInputs } from 'pages/ConditionsAndTemplates/constant'
import { useState } from 'react'
import { Button, Modal } from 'stories/components'
import { InputConvert, InputValidate, renderInput } from 'utils'

export const AddHoc = ({ onAfterSubmit = () => {} }: any) => {
  const [inputStates, setInputStates] = useState<Record<string, any>>(conditionInputs())
  const [isOpen, setIsOpen] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())

  const onCloseUserModal = () => {
    let newState = conditionInputs()
    setInputStates(newState)
  }

  const onChange = async (key: string, value: string | boolean) => {
    let newState = cloneDeep(inputStates)
    newState[key].value = InputConvert(newState[key], value)
    newState[key].error = ''
    setInputStates(newState)
  }

  const onSubmit = async () => {
    let hasError = false
    const newStats = cloneDeep(inputStates)
    const data: Record<string, any> = {}
    for (const key in newStats) {
      const { value, disabled = false } = newStats[key]
      let error = InputValidate(newStats[key])
      newStats[key].error = error
      if (error.length > 0) hasError = true

      if (!disabled && value !== undefined) data[key] = value
    }
    if (hasError) {
      setInputStates(newStats)
      return
    }
    onAfterSubmit(data)
    setIsOpen(false)
    setLastUpdatedAt(Date.now())
  }

  return (
    <Modal
      button={<Button outline>Ad-Hoc</Button>}
      title={'Add Condition'}
      titleOkay="Add"
      isOpen={isOpen}
      lastUpdatedAt={lastUpdatedAt}
      onClose={onCloseUserModal}
      onOk={onSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {Object.keys(inputStates).map((key: any, index) => {
          const input = inputStates[key]
          return (
            <div className={`input ${key == 'description' ? 'md:col-span-2' : 'w-80'}`} key={index}>
              {renderInput(input, key, onChange)}
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
