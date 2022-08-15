import { ClockIcon } from '@heroicons/react/outline'
import React, { forwardRef } from 'react'

interface CheckboxProps {
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
  value?: boolean
  /**
   * Custom class name
   */
  className?: string
  /**
   * Custom color
   */
  color?: string
  /**
   * Custom size
   */
  size?: number

  checked?: boolean
  onClick?: () => void

  /**
   * Optional click handler
   */
  /**
   * Optional history handler
   */
  history?: boolean
  onChange?: (checked: any) => void
  showHistory?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Checkbox = forwardRef(
  (
    {
      disabled = false,
      id = '',
      title = '',
      name = '',
      color = 'blue',
      size = 4,
      value = true,
      history = false,
      className = '',
      onChange = () => {},
      showHistory = () => {},
      ...props
    }: CheckboxProps,
    ref?: React.LegacyRef<HTMLInputElement>,
  ) => {
    const now = Date.now()
    return (
      <div className={`group relative z-0 w-full group ${className}`}>
        <label htmlFor={`${id}-${now}`} className="inline-flex relative items-center cursor-pointer h-5">
          <input
            type="checkbox"
            id={`${id}-${now}`}
            name={name}
            className={`w-${size} h-${size} ${disabled ? `text-${color}-300` : `text-${color}-600`} ${
              size >= 4 ? 'rounded' : ''
            } border-gray-300 focus:ring-${color}-500 dark:focus:ring-${color}-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
            defaultChecked={value}
            disabled={disabled}
            ref={ref}
            onChange={(event) => onChange(event.target.checked)}
            {...props}
          />
          <span
            className={`ml-2 ${size >= 4 ? 'text-sm' : 'text-[13px]'} font-medium text-gray-900 dark:text-gray-300`}
          >
            {title}
          </span>
        </label>
        {history && (
          <span className="ml-3 hidden group-hover:inline float-right" onClick={() => showHistory()}>
            <ClockIcon className="h-[14px] w-[14px] text-gray-500 cursor-pointer" aria-hidden="true" />
          </span>
        )}
      </div>
    )
  },
)
