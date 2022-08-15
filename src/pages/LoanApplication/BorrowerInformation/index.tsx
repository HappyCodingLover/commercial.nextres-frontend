import { setBorrowerGroupData } from 'actions'
import cloneDeep from 'clone-deep'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { borrowerInfoUpdate } from 'services'
import { InputConvert, openAuditLog, renderInput } from 'utils'

import { defaultInputs } from './constants'
import { borrowerInfoValidate, visibleBorrowerFieldsLogic } from './logic'

export function BorrowerInformation(props: any) {
  const { borrowerSeperator } = props
  const [inputs, setInputs] = useState(defaultInputs())
  const [fieldValueChanged, setFieldValueChanged] = useState(false)
  const [visibelFields, setVisibleFields] = useState(visibleBorrowerFieldsLogic(borrowerSeperator))

  const dispatch = useDispatch()
  const { borrower } = useSelector((state: any) => {
    return {
      borrower: state.borrower,
    }
  })

  useEffect(() => {
    let _visibelFields = visibleBorrowerFieldsLogic(borrowerSeperator)
    setVisibleFields(_visibelFields)
    setInputs(borrowerInfoValidate(borrowerSeperator, _visibelFields, inputs))
  }, [borrowerSeperator])

  const onChange = async (key: string, value: string) => {
    let newInputs = cloneDeep(inputs)
    setFieldValueChanged(true)
    value = InputConvert(newInputs[key], value)
    await dispatch(setBorrowerGroupData(borrowerSeperator, { [key]: value }))
    let _visibelFields = visibelFields
    if (['hasEntityTitle', 'ownedRentedYears'].indexOf(key) !== -1) {
      _visibelFields = visibleBorrowerFieldsLogic(borrowerSeperator)
      setVisibleFields(_visibelFields)
    }
    setInputs(borrowerInfoValidate(borrowerSeperator, _visibelFields, inputs))
  }

  const onBlur = async (key: string) => {
    console.log(key)
    if (!fieldValueChanged) return
    setFieldValueChanged(false)
    const input: any = inputs[key]
    if (input.error && input.error.length > 0) return
    props.setLoading(true)
    const reqBody = {
      [key]: borrower[borrowerSeperator][key],
      borrowerSeperator,
    }
    await borrowerInfoUpdate(reqBody)
    props.setLoading(false)
  }

  const showHistory = async (key: string) => {
    const options = {
      table: 'Borrower',
      field: `${borrowerSeperator}-${key}`,
      keys: {
        field: key,
        borrowerSeperator,
      },
    }
    openAuditLog(options)
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mb-3">
        {Object.keys(inputs).map((key, index) => {
          if (visibelFields.indexOf(key) === -1) return null
          let input = inputs[key]
          if (borrower[borrowerSeperator][key] !== undefined) {
            input.value = borrower[borrowerSeperator][key]
          } else {
            input.value = ''
          }
          input.history = true
          let cn = `input md:col-span-1`
          if (['hasEntityTitle', 'entityTitle'].indexOf(key) !== -1) {
            cn = `input md:col-span-2`
          }
          return (
            <div className={cn} key={index}>
              {renderInput(input, key, onChange, showHistory, onBlur)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
