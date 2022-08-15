import { setLoanData } from 'actions'
import cloneDeep from 'clone-deep'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoanFields } from 'services'
import { InputConvert, InputValidate, openAuditLog, renderInput } from 'utils'

import { defaultInputs } from './constants'
import { initFields, propertyDataConvert, propertyInfoValidate } from './logic'

export function PropertyInformation(props: any) {
  const [inputs, setInputs] = useState(initFields(defaultInputs()))
  const [fieldValueChanged, setFieldValueChanged] = useState(false)

  const dispatch = useDispatch()
  const { loan } = useSelector((state: any) => {
    return {
      loan: state.loan,
    }
  })

  useEffect(() => {
    const nInputs = propertyInfoValidate(cloneDeep(inputs))
    setInputs(nInputs)
    propertyDataConvert(inputs)
  }, [])

  const onChange = (key: string, value: string) => {
    let newInputs = cloneDeep(inputs)
    value = InputConvert(newInputs[key], value)
    newInputs[key].error = InputValidate({ ...newInputs[key], value })
    setInputs(newInputs)
    setFieldValueChanged(true)

    dispatch(setLoanData({ key: key, data: value }))
  }

  const onBlur = async (key: string) => {
    if (!fieldValueChanged) return
    setFieldValueChanged(false)
    if (inputs[key].error.length > 0) return
    props.setLoading(true)
    const reqBody = {
      [key]: loan[key],
    }
    await updateLoanFields(reqBody)
    props.setLoading(false)
  }

  const showHistory = (key: string) => {
    const options = {
      table: 'Loan',
      field: key,
      keys: {
        field: key,
      },
    }
    openAuditLog(options)
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mb-3">
        {Object.keys(inputs).map((key, index) => {
          let input = inputs[key]
          input.history = true
          input.value = loan[key]
          return (
            <div className={`input md:col-span-${input.span || 1}`} key={index}>
              {renderInput(input, key, onChange, showHistory, onBlur)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
