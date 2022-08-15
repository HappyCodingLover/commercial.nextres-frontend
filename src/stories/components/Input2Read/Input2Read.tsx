interface InputProps {
  /**
   * Is Full
   */
  full?: boolean
  /**
   * Title of Input
   */
  title?: string
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
   * Prefix
   */
  prefix?: string
}

/**
 * Primary UI component for user interaction
 */
export const Input2Read = ({
  title = '',
  value = '',
  error = '',
  className = '',
  prefix = '',
  ...props
}: InputProps) => {
  const classNames = [
    'block',
    'rounded-t',
    'px-2.5',
    'pb-[2px]',
    'pt-[27px]',
    'w-full',
    'text-[15px]',
    'text-gray-900',
    'focus:outline-none',
    'focus:ring-0',
    'peer',
    prefix.length > 0 && 'pl-7',
    error && 'border-rose-700',
  ]
  return (
    <div className="input-container">
      <div className={`group relative z-0 w-full ${className}`}>
        {prefix.length > 0 && (
          <div className="text-gray-600 text-[14px] flex absolute top-[29px] left-0 items-center pl-3 pointer-events-none">
            {prefix}
          </div>
        )}
        <div className={classNames.join(' ')} {...props}>
          {' '}
          {value}
          <label className="absolute input2read-label text-[12px] text-gray-700 top-1.5 border-b z-10 origin-[0] left-2.5 flex gap-2 items-center">
            {title}
          </label>
        </div>
      </div>
      {error && <p className="peer-invalid:visible text-rose-700 text-[13px] pt-[1px]">{error}</p>}
    </div>
  )
}
