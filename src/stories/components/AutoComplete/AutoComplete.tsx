import { PlusIcon, TrashIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { useEffect, useState } from 'react'
import type { Color } from 'stories/types'

function validateEmail(email: string) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

interface AutoCompleteProps {
  /**
   * What background color to use
   */
  color?: Color
  /**
   * Is Full
   */
  full?: boolean
  /**
   * Is disabled
   */
  disabled?: boolean
  /**
   * Is autofocus
   */
  autoFocus?: boolean
  /**
   * Type of Input
   */
  type?: 'email' | 'text' | 'number'
  /**
   * Title of Input
   */
  title?: string
  /**
   * Placeholder of Input
   */
  placeholder?: string
  /**
   * Name of Input
   */
  name?: string
  /**
   * Value of Input
   */
  value?: Array<string | number>
  /**
   * Error of Input
   */
  error?: string
  /**
   * Custom class name
   */
  className?: string
  /**
   * Is has icon
   */
  hasIcon?: boolean
  /**
   * Required
   */
  required?: boolean
  onChange: (e: any) => void // Array<string> => void
}

/**
 * Primary UI component for user interaction
 */
export const AutoComplete = ({
  color = 'sky',
  type = 'text',
  title = '',
  placeholder = ' ',
  name = '',
  value: _value = [],
  error = '',
  className = '',
  required = false,
  onChange = () => {},
  ...props
}: AutoCompleteProps) => {
  const [values, setValues] = useState<Array<string | number>>(_value)
  const [isEditing, setEditing] = useState(false)
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('')

  useEffect(() => {
    if (JSON.stringify(_value) == JSON.stringify(values)) return

    setValues(_value)
  }, [_value])

  const onRemove = (v: string | number) => {
    const index = values.indexOf(v)
    values.splice(index, 1)
    onChange(values)
    setValues(cloneDeep(values))
  }

  const onAdd = () => {
    setEditing(true)
  }

  const onTextUpdate = (t: string) => {
    setText(t)
    setTextError('')
  }

  const onConfirm = () => {
    let v: string | number = text.trim()
    if (!v) return
    if (type == 'number') v = parseInt(v)
    if (values.includes(v)) {
      setTextError('Already exists.')
      return
    }
    if (type == 'email' && !validateEmail(v as string)) {
      setTextError('Email address is not in a valid format.')
      return
    }
    if (type == 'number' && isNaN(v as number)) {
      setTextError('Value is not in a valid number format.')
      return
    }
    values.push(v)
    setText('')
    setEditing(false)
    onChange(values)
    setValues(cloneDeep(values))
  }

  const onCancel = () => {
    setText('')
    setTextError('')
    setEditing(false)
  }

  const classNames = [
    'block',
    'rounded',
    'py-1.5',
    'px-2',
    'w-full',
    'text-sm',
    'text-gray-900',
    'bg-transparent',
    'border',
    'border-gray-300',
    'appearance-none',
    'dark:text-white',
    'dark:border-gray-600',
    `dark:focus:border-${color}-500`,
    'focus:outline-none',
    'focus:ring-0',
    `focus:border-${color}-600`,
    'peer',
    error && 'border-rose-700',
    className,
  ].join(' ')
  return (
    <div className="input-container mb-3" {...props}>
      <div className={`group relative z-0 w-full ${classNames}`}>
        <label
          htmlFor={name}
          className="text-[12px] text-gray-700 top-1.5 border-b z-10 origin-[0] left-2.5 gap-2 items-center"
        >
          {title}
          {required && '*'}
        </label>

        <div className="flex flex-wrap my-2">
          {values.map((v) => (
            <div className="flex border border-gray-300 p-2 mr-3 rounded" key={v}>
              <TrashIcon
                className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-500 mr-1"
                onClick={() => onRemove(v)}
              />
              <label>{v}</label>
            </div>
          ))}
          <div
            className="flex border border-gray-300 p-2 mr-3 hover:bg-blue-500 hover:border-white cursor-pointer rounded text-gray-500 hover:text-white"
            onClick={onAdd}
          >
            <PlusIcon className="w-5 h-5" />
          </div>
        </div>

        {isEditing && (
          <div className="flex w-full">
            <input
              type={type}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder={placeholder}
              required
              autoFocus
              value={text}
              onChange={(e) => onTextUpdate(e.target.value)}
            />
            <button
              type="button"
              className="p-2.5 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:z-5"
              onClick={onConfirm}
              disabled={!text.trim()}
            >
              <label>Confirm</label>
            </button>
            <button
              type="button"
              className="p-2.5 text-sm font-medium text-white bg-gray-400 rounded-r-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 focus:z-5"
              onClick={onCancel}
            >
              <label>Cancel</label>
            </button>
          </div>
        )}
        {textError && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{textError}</p>}
      </div>
      {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{error}</p>}
    </div>
  )
}
