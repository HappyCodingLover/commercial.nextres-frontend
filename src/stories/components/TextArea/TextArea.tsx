import { ClockIcon } from '@heroicons/react/outline'
import { forwardRef } from 'react'
import type { Color } from 'stories/types'

interface InputProps {
  /**
   * What background color to use
   */
  color?: Color
  /**
   * rows
   */
  rows?: number
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
  required?: boolean
  /**
   * Icon component
   */
  prefix?: string
  /**
   * onChange
   */
  history?: boolean
  /**
   * Icon component
   */
  onChange: (e: any) => void // string | React.ChangeEvent<HTMLInputElement>) => void
  // showHistory?: () => void
  onKeyPress?: (e: any) => void
}

/**
 * Primary UI component for user interaction
 */
export const TextArea = forwardRef(
  (
    {
      rows = 4,
      color = 'sky',
      disabled = false,
      autoFocus = false,
      title = '',
      placeholder = ' ',
      name = '',
      value = '',
      error = '',
      className = '',
      prefix = '',
      history = false,
      required = false,
      onChange = () => {},
      ...props
    }: InputProps,
    ref?: React.LegacyRef<HTMLTextAreaElement>,
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
      'bg-white',
      'border',
      'border-gray-300',
      'focus:outline-none',
      'focus:ring-0',
      `focus:border-${color}-600`,
      'peer',
      prefix.length > 0 && 'pl-7',
      error && 'border-rose-700',
    ]
    return (
      <div className="input-container">
        <div className={`group relative z-0 w-full ${className} ${disabled ? 'bg-gray-100' : ''}`}>
          {prefix.length > 0 && (
            <div className="text-gray-600 text-[15px] flex absolute top-[28px] left-0 items-center pl-3 pointer-events-none">
              {prefix}
            </div>
          )}
          <textarea
            rows={rows}
            name={name}
            className={classNames.join(' ')}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            value={value}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            ref={ref}
            {...props}
          />
          <label
            htmlFor={name}
            className="absolute text-[12px] text-gray-700 top-1.5 border-b z-10 origin-[0] left-2.5 flex gap-2 items-center"
          >
            {title}
            {required && '*'}
            {history && (
              <span className="ml-1 hidden group-hover:inline">
                <ClockIcon className="h-[14px] w-[14px] text-gray-500 cursor-pointer" aria-hidden="true" />
              </span>
            )}
          </label>
        </div>
        {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pl-2 pt-[1px]">{error}</p>}
      </div>
    )
  },
)
