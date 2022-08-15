import { ClockIcon } from '@heroicons/react/outline'
import React, { forwardRef } from 'react'
import { Tooltip } from 'stories/components/Tooltip/Tooltip'
import type { Color } from 'stories/types'

interface InputProps {
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
   * Is autofocus
   */
  autoFocus?: boolean
  /**
   * Type of Input
   */
  type?: 'thousandSep' | 'email' | 'password' | 'text' | 'phone' | 'number' | 'search' | 'date' | 'time'
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
  value?: string
  /**
   * Font Size of Input
   */
  fontSize?: number
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
   * Is has icon
   */
  required?: boolean
  /**
   * Icon component
   */
  icon?: string | JSX.Element | null
  /**
   * Prefix
   */
  prefix?: string
  /**
   * onChange
   */
  history?: boolean
  onChange: (e: any) => void // string | React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  showHistory?: () => void
  onKeyPress?: (e: any) => void
}

/**
 * Primary UI component for user interaction
 */
export const Input2 = forwardRef(
  (
    {
      color = 'sky',
      disabled = false,
      readOnly = false,
      tooltip = '',
      autoFocus = false,
      type = 'text',
      title = '',
      placeholder = ' ',
      name = '',
      value = '',
      fontSize = 15,
      error = '',
      className = '',
      hasIcon = false,
      icon = null,
      prefix = '',
      history = false,
      required = false,
      onChange = () => {},
      onBlur = () => {},
      showHistory = () => {},
      ...props
    }: InputProps,
    ref?: React.LegacyRef<HTMLInputElement>,
  ) => {
    const classNames = [
      'block',
      'rounded-t',
      'px-2.5',
      'pb-[2px]',
      'pt-[27px]',
      'w-full',
      `text-[${fontSize}px]`,
      'text-gray-900',
      disabled ? 'bg-gray-100' : 'bg-white',
      readOnly ? 'cursor-not-allowed' : '',
      'border',
      'border-gray-300',
      'focus:outline-none',
      'focus:ring-0',
      `focus:border-${color}-600`,
      'peer',
      prefix.length > 0 && 'pl-7',
      hasIcon && 'pl-9',
      error && 'border-rose-700',
    ]
    if (value === null) value = ''
    return (
      <div className="input-container">
        <div className={`group relative z-0 w-full ${className}`}>
          {hasIcon && icon && typeof icon === 'string' && (
            <div className="flex absolute bottom-2 left-0 items-center pl-3 pointer-events-none">
              <img src={icon} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          )}
          {hasIcon && icon && typeof icon !== 'string' && (
            <div className="flex absolute bottom-2 left-0 items-center pl-3 pointer-events-none">{icon}</div>
          )}

          {prefix.length > 0 && (
            <div className="text-gray-600 text-[14px] flex absolute top-[29px] left-0 items-center pl-3 pointer-events-none">
              {prefix}
            </div>
          )}
          <input
            type={type}
            name={name}
            className={classNames.join(' ')}
            placeholder={placeholder}
            disabled={disabled || readOnly}
            autoFocus={autoFocus}
            value={value}
            ref={ref}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            {...props}
          />
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
        </div>
        {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{error}</p>}
      </div>
    )
  },
)
