import { ClockIcon } from '@heroicons/react/outline'
import type { Color } from 'stories/types'

interface ToggleButtonProps {
  /**
   * Id of Input
   */
  id: string
  /**
   * Which one is selected
   */
  value?: boolean
  /**
   * button label
   */
  label: string[]
  /**
   * optional title
   */
  title?: string
  /**
   * What background color to use
   */
  color?: Color
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Is disabled
   */
  disabled?: boolean
  /**
   * Error of Input
   */
  error?: string
  /**
   * Optional history handler
   */
  history?: boolean
  /**
   * Custom class name
   */
  className?: string
  /**
   * Optional click handler
   */
  onChange?: (checked: any) => void
  onBlur?: () => void
  showHistory?: () => void
}

export const ToggleButton = ({
  id = '',
  label = ['Yes', 'No'],
  title,
  size = 'sm',
  disabled = false,
  error = '',
  history = false,
  value,
  className = '',
  onChange = () => {},
  onBlur = () => {},
  showHistory = () => {},
}: ToggleButtonProps) => {
  const classes1 = [
    `border border-shade-blue`,
    value === true ? `bg-shade-blue text-white` : `bg-white text-gray-900`,
    `font-${size}`,
    `text-${size}`,
    'px-2',
    'py-1.5',
    'items-center justify-center',
    'w-11',
    'h-9',
  ]
  const classes2 = [
    `border border-shade-blue`,
    `border-l-0`,
    value === false ? `bg-shade-blue text-white` : `bg-white text-gray-900`,
    `font-${size}`,
    `text-${size}`,
    'px-2',
    'py-1.5',
    'items-center justify-center',
    'w-11',
    'h-9',
  ]

  return (
    <div className={`${className}`} id={id}>
      <div className="flex items-center group relative">
        <button
          type={'button'}
          className={classes1.join(' ')}
          disabled={disabled}
          onClick={() => onChange(true)}
          onBlur={onBlur}
        >
          <span>{label[0]}</span>
        </button>
        <button
          type={'button'}
          className={classes2.join(' ')}
          disabled={disabled}
          onClick={() => onChange(false)}
          onBlur={onBlur}
        >
          <span>{label[1]}</span>
        </button>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</span>
        {history && (
          <span className="ml-1 hidden group-hover:inline" onClick={() => showHistory()}>
            <ClockIcon className="h-[14px] w-[14px] text-gray-500 cursor-pointer" aria-hidden="true" />
          </span>
        )}
      </div>
      {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{error}</p>}
    </div>
  )
}
