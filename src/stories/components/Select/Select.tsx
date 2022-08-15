import { ClockIcon } from '@heroicons/react/outline'
import React, { forwardRef } from 'react'
import type { Color } from 'stories/types'

interface SelectProps {
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
   * Id of Input
   */
  id: string
  /**
   * Title of Input
   */
  title?: string
  /**
   * Name of Input
   */
  name?: string
  /**
   * Value of Input
   */
  value?: string
  /**
   * Error of Input
   */
  error?: string
  /**
   * Size of Input
   */
  size?: number
  /**
   * Options of select
   */
  options?: Array<string> | Record<string, string> // (Title => key)
  /**
   * Custom class name
   */
  className?: string
  /**
   * Required
   */
  required?: boolean
  /**
   * Has default option - 'SELECT'
   */
  hasDefaultOption?: boolean
  /**
   * Default option text
   */
  defaultOptionText?: string
  /**
   * Optional history handler
   */
  history?: boolean
  /**
   * Optional click handler
   */
  onChange?: (value: any) => void
  showHistory?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Select = forwardRef(
  (
    {
      color = 'sky',
      disabled = false,
      id = '',
      title = '',
      name = '',
      value = '',
      error = '',
      options = [],
      className = '',
      size = 4,
      required = false,
      hasDefaultOption = false,
      defaultOptionText = '- Select -',
      history = false,
      onChange = () => {},
      showHistory = () => {},
      ...props
    }: SelectProps,
    ref?: React.LegacyRef<HTMLSelectElement>,
  ) => {
    let classNames = `block rounded py-1.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer`
    if (size === 3) {
      classNames = `block focus:ring-0 text-[13px] text-black bg-white py-0 pl-1 pr-4 bg-[center_right_0rem] w-full border-gray-300`
    }
    return (
      <div className="input-container mb-4">
        <div className={`relative z-0 w-full group ${className} ${disabled ? 'bg-gray-100' : ''}`}>
          {title.length > 0 && (
            <label
              htmlFor={id}
              className={`absolute text-xs text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:left-0 peer-focus:text-${color}-700 peer-focus:dark:text-${color}-700 peer-placeholder-shown:text-sm peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-xs peer-focus:-translate-y-6 peer-placeholder-shown:leading-3 ml-2 px-1 rounded bg-white z-10 peer-placeholder-shown:-z-10 peer-focus:z-10 left-0`}
            >
              {title}
              {required && '*'}
            </label>
          )}
          <select
            id={id}
            className={classNames}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(event) => onChange(event.target.value)}
            ref={ref}
            required={required}
            {...props}
          >
            {hasDefaultOption && <option value="0">{defaultOptionText}</option>}
            {Array.isArray(options) &&
              options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

            {!Array.isArray(options) &&
              Object.keys(options).map((key) => (
                <option key={key} value={key}>
                  {options[key]}
                </option>
              ))}
          </select>
          {history && (
            <span className="ml-1 hidden group-hover:inline absolute right-2 -top-4" onClick={() => showHistory()}>
              <ClockIcon className="h-[14px] w-[14px] text-gray-500 cursor-pointer" aria-hidden="true" />
            </span>
          )}
        </div>
        {error && <p className="peer-invalid:visible text-rose-700 text-xs">{error}</p>}
      </div>
    )
  },
)
