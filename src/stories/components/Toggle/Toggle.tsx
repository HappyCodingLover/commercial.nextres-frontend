import { ClockIcon } from '@heroicons/react/outline'
import React, { forwardRef } from 'react'

interface ToggleProps {
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
   * Error
   */
  error?: string
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
   * Optional click handler
   */
  /**
   * Optional history handler
   */
  history?: boolean
  onChange?: (checked: any) => void
  onBlur?: () => void
  showHistory?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Toggle = forwardRef(
  (
    {
      disabled = false,
      id = '',
      title = '',
      name = '',
      error = '',
      value = false,
      history = false,
      className = '',
      onChange = () => {},
      onBlur = () => {},
      showHistory = () => {},
      ...props
    }: ToggleProps,
    ref?: React.LegacyRef<HTMLInputElement>,
  ) => {
    return (
      <div>
        <div className={`group flex flex-wrap items-center relative z-0 w-full group ${className}`}>
          <label htmlFor={id} className="inline-flex relative items-center cursor-pointer h-5">
            <input
              type="checkbox"
              id={id}
              name={name}
              className="sr-only peer"
              defaultChecked={value}
              disabled={disabled}
              ref={ref}
              onChange={(event) => onChange(event.target.checked)}
              onBlur={onBlur}
              {...props}
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</span>
          </label>
          {history && (
            <span className="ml-3 hidden group-hover:inline" onClick={() => showHistory()}>
              <ClockIcon className="h-[14px] w-[14px] text-gray-500 cursor-pointer" aria-hidden="true" />
            </span>
          )}
        </div>
        {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{error}</p>}
      </div>
    )
  },
)
