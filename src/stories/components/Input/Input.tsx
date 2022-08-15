import { ClockIcon } from '@heroicons/react/outline'
import React, { forwardRef } from 'react'
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
   * Is autofocus
   */
  autoFocus?: boolean
  /**
   * Type of Input
   */
  type?: 'email' | 'password' | 'text' | 'phone' | 'number' | 'search' | 'date' | 'time'
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
  /**
   * Icon component
   */
  icon?: string | JSX.Element | null
  /**
   * onChange
   */
  history?: boolean
  /**
   * Icon component
   */
  onChange: (e: any) => void // string | React.ChangeEvent<HTMLInputElement>) => void
  showHistory?: () => void
  onKeyPress?: (e: any) => void
}

/**
 * Primary UI component for user interaction
 */
export const Input = forwardRef(
  (
    {
      color = 'sky',
      disabled = false,
      autoFocus = false,
      type = 'text',
      title = '',
      placeholder = ' ',
      name = '',
      value = '',
      error = '',
      className = '',
      hasIcon = false,
      icon = null,
      history = false,
      required = false,
      onChange = () => {},
      showHistory = () => {},
      ...props
    }: InputProps,
    ref?: React.LegacyRef<HTMLInputElement>,
  ) => {
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
      hasIcon && icon ? 'pl-10' : '',
    ]
    return (
      <div className="input-container mb-4">
        <div className={`group relative z-0 w-full ${className} ${disabled ? 'bg-gray-100' : ''}`}>
          {hasIcon && icon && typeof icon === 'string' && (
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <img src={icon} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          )}
          {hasIcon && icon && typeof icon !== 'string' && (
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">{icon}</div>
          )}
          <input
            type={type}
            name={name}
            className={classNames.join(' ')}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            value={value}
            ref={ref}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            {...props}
          />
          {history && (
            <span className="ml-1 hidden group-hover:inline absolute right-2 -top-4" onClick={() => showHistory()}>
              <ClockIcon className="h-[14px] w-[14px] text-gray-500 cursor-pointer" aria-hidden="true" />
            </span>
          )}
          <label
            htmlFor={name}
            className={`absolute text-xs text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:left-0 peer-focus:text-${color}-700 peer-focus:dark:text-${color}-700 peer-placeholder-shown:text-sm peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-xs peer-focus:-translate-y-6 peer-placeholder-shown:leading-3 ml-2 px-1 rounded ${
              disabled && value.length === 0 ? '' : 'bg-white'
            } peer-placeholder-shown:-z-10 peer-focus:z-10 ${hasIcon && icon ? 'pl-8' : ''} peer-focus:pl-1 left-0`}
          >
            {title}
            {required && '*'}
          </label>
        </div>
        {error && <p className="peer-invalid:visible text-rose-700 text-xs">{error}</p>}
      </div>
    )
  },
)
