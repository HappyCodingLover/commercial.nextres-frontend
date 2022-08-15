import { ClockIcon } from '@heroicons/react/outline'
import React, { forwardRef } from 'react'
import { Tooltip } from 'stories/components/Tooltip/Tooltip'
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
   * Is readOnly
   */
  readOnly?: boolean
  /**
   * Tooltip of Input
   */
  tooltip?: string
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
  value?: string | undefined
  /**
   * Error of Input
   */
  error?: string
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
  /**
   * Prefix
   */
  prefix?: string
  /**
   * Show History
   */
  history?: boolean
  /**
   * Optional click handler
   */
  onChange?: (value: any) => void
  onBlur?: () => void
  showHistory?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Select2 = forwardRef(
  (
    {
      color = 'sky',
      disabled = false,
      readOnly = false,
      tooltip = '',
      id = '',
      title = '',
      name = '',
      value = '',
      error = '',
      options = [],
      className = '',
      prefix = '',
      required = false,
      hasDefaultOption = false,
      defaultOptionText = '- Select -',
      history = false,
      onChange = () => {},
      onBlur = () => {},
      showHistory = () => {},
      ...props
    }: SelectProps,
    ref?: React.LegacyRef<HTMLSelectElement>,
  ) => {
    const classNames = [
      'block',
      'rounded-t',
      'px-2.5',
      'pb-[2px]',
      'pt-[27px]',
      'w-full',
      'text-[15px]',
      'text-gray-900',
      'disabled:opacity-100',
      disabled ? 'bg-gray-100' : 'bg-white',
      readOnly ? 'cursor-not-allowed' : '',
      'border',
      'border-gray-300',
      'focus:outline-none',
      'focus:ring-0',
      `focus:border-${color}-600`,
      'peer',
      prefix.length > 0 && 'pl-7',
      error && 'border-rose-700',
    ]
    if (value === null) value = ''
    return (
      <div className="input-container">
        <div className={`group relative z-0 w-full group ${className}`}>
          <label
            htmlFor={name}
            className="absolute text-[12px] text-gray-700 top-1.5 border-b z-10 origin-[0] left-2.5 flex gap-2 items-center"
          >
            {title}
            {required && '*'}
            {tooltip.length > 0 ? <Tooltip message={tooltip}></Tooltip> : null}
            {history && (
              <span className="ml-1 hidden group-hover:inline" onClick={() => showHistory()}>
                <ClockIcon className="h-[14px] w-[14px] text-gray-500 cursor-pointer" aria-hidden="true" />
              </span>
            )}
          </label>
          <select
            id={id}
            className={classNames.join(' ')}
            name={name}
            value={value}
            disabled={disabled || readOnly}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
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
        </div>
        {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{error}</p>}
      </div>
    )
  },
)
