import type { Color } from 'stories/types'

import { ButtonGroup } from '../ButtonGroup/ButtonGroup'

interface ButtonGroupSelectorProps {
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
   * Options of select
   */
  options: Array<string> | Record<string, string> // (Title => key)
  /**
   * Custom class name
   */
  className?: string
  /**
   * Required
   */
  required?: boolean
  /**
   * Optional click handler
   */
  onChange?: (value: any) => void
}

/**
 * Primary UI component for user interaction
 */
export const ButtonGroupSelector = ({
  color = 'sky',
  disabled = false,
  title = '',
  name = '',
  value = '',
  error = '',
  options = [],
  className = '',
  required = false,
  onChange = () => {},
}: ButtonGroupSelectorProps) => {
  const classNames = [
    'block',
    'rounded-t',
    'px-2.5',
    'pb-[2px]',
    'pt-[27px]',
    'w-full',
    'text-[15px]',
    'text-gray-900',
    disabled ? 'bg-gray-100' : 'bg-white',
    'border',
    'border-gray-300',
    'focus:outline-none',
    'focus:ring-0',
    `focus:border-${color}-600`,
    'peer',
    error && 'border-rose-700',
  ]
  console.log(options)

  return (
    <div className="input-container">
      <div className={`group relative z-0 w-full group ${className}`}>
        <label
          htmlFor={name}
          className="absolute text-[12px] text-gray-700 top-1.5 border-b z-10 origin-[0] left-2.5 flex gap-2 items-center"
        >
          {title}
          {required && '*'}
        </label>
        <div className={classNames.join(' ')}>
          <ButtonGroup title={options} value={value} onChange={onChange} />
        </div>
      </div>
      {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{error}</p>}
    </div>
  )
}
