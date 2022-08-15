import svgLoading from 'stories/assets/loading.svg'
import type { Color } from 'stories/types'

interface ButtonProps {
  type?: 'button' | 'submit'
  /**
   * What background color to use
   */
  color?: Color
  /**
   * How large should the button be?
   */
  size?: string
  /**
   * Is full rounded button
   */
  pills?: boolean
  /**
   * Is outlined button
   */
  outline?: boolean
  /**
   * Is link button
   */
  link?: boolean
  /**
   * Is bold text
   */
  bold?: boolean
  /**
   * Is Full
   */
  full?: boolean
  /**
   * Is disabled
   */
  disabled?: boolean
  /**
   * Is loading
   */
  loading?: boolean
  /**
   * Custom class name
   */
  className?: string
  /**
   * Button contents
   */
  children: JSX.Element | string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  type = 'button',
  size = '[15px]',
  color = 'sky',
  pills = false,
  outline = false,
  link = false,
  bold = false,
  disabled = false,
  loading = false,
  full = false,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  if (loading) disabled = true
  const colorLevel = disabled ? 300 : 500
  const classes = [
    link ? '' : `border border-${color}-${colorLevel}`,
    link ? '' : outline ? `text-${color}-800` : color === 'white' ? 'text-gray-900' : 'text-white',
    link ? '' : outline ? `hover:text-white focus:outline-none` : `bg-${color}-${colorLevel}`,
    link ? `block mt-3 hover:text-gray-900 hover:underline text-gray-${colorLevel}` : '',
    // disabled ? '' : `hover:bg-${color}-600`,
    disabled || link
      ? ''
      : !outline
      ? `hover:bg-white hover:text-${color}-${colorLevel}`
      : `hover:bg-${color}-${colorLevel}`,
    link ? '' : 'focus:ring-4',
    link ? '' : `focus:ring-${color}-300`,
    `font-${size}`,
    `rounded-${pills ? 'full' : 'md'}`,
    `text-${size}`,
    bold ? 'font-bold' : '',
    full ? 'w-full' : '',
    link ? '' : 'px-5',
    'py-2.5',
    'mr-2',
    'mb-2',
    `dark:bg-${color}-600`,
    `dark:hover:bg-${color}-${colorLevel}`,
    'focus:outline-none',
    `dark:focus:ring-${color}-800`,
    loading ? 'inline-flex' : '',
    'items-center justify-center',
    ...className.split(' '),
  ]

  return (
    <button type={type} className={classes.join(' ')} disabled={disabled} {...props}>
      {loading && <img src={svgLoading} className="inline w-4 h-4 mr-3 text-white animate-spin" />}
      <span>{children}</span>
    </button>
  )
}
