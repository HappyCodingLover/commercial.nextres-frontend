import cloneDeep from 'clone-deep'
import { useState } from 'react'
import { InputConvert, renderInput } from 'utils'

import { defaultInputs } from './constants'

export function Employment() {
  const [inputs, setInputs] = useState(defaultInputs())

  const onChange = (key: string, value: string) => {
    let newInputs = cloneDeep(inputs)
    newInputs[key].value = InputConvert(newInputs[key], value)
    newInputs[key].error = ''
    setInputs(newInputs)
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mb-3">
        {Object.keys(inputs).map((key, index) => {
          const input = inputs[key]
          return (
            <div className={`input md:col-span-${input.span || 1}`} key={index}>
              {renderInput(input, key, onChange)}
            </div>
          )
        })}
      </div>
    </div>
  )
}