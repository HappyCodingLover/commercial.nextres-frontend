interface ButtonGroupProps {
  /**
   * Title of Input
   */
  title?: Array<string> | Record<string, string>
  /**
   * Value of Input
   */
  value?: string
  /**
   * Custom class name
   */
  className?: string
  onChange?: (checked: any) => void
}

/**
 * Primary UI component for user interaction
 */
export const ButtonGroup = ({
  title = [],
  value = '',
  className = '',
  onChange = () => {},
  ...props
}: ButtonGroupProps) => {
  return (
    <div className="inline-flex rounded-md shadow-sm pb-2 flex-wrap" {...props}>
      {Array.isArray(title) &&
        title.map((t, index) => {
          const classes = [
            'py-2 px-4 text-sm font-medium bg-white border-r border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white cursor-pointer',
          ]
          const isActive = value == t
          const isFirst = index == 0
          const isLast = index == title.length - 1

          if (isActive) classes.push('text-shade-blue ring-shade-blue ring-2 z-10')
          else classes.push('')

          if (isFirst) classes.push('rounded-l-lg border')
          if (isLast) classes.push('rounded-r-md border')
          if (!isFirst && !isLast) classes.push('border-t border-b')

          classes.push(className)

          return (
            <a aria-current="page" className={classes.join(' ')} onClick={() => onChange(t)} key={`${title}-${index}`}>
              {t}
            </a>
          )
        })}

      {!Array.isArray(title) &&
        Object.keys(title).map((key, index) => {
          const classes = [
            'py-2 px-4 text-sm font-medium bg-white border-r border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white cursor-pointer',
          ]
          const isActive = value == key
          const isFirst = index == 0
          const isLast = index == Object.keys(title).length - 1

          if (isActive) classes.push('text-blue-700 ring-blue-700 ring-2 z-10')
          else classes.push('')

          if (isFirst) classes.push('rounded-l-lg border')
          if (isLast) classes.push('rounded-r-md border')
          if (!isFirst && !isLast) classes.push('border-t border-b')

          classes.push(className)

          return (
            <a
              aria-current="page"
              className={classes.join(' ')}
              onClick={() => onChange(key)}
              key={`${title}-${index}`}
            >
              {title[key]}
            </a>
          )
        })}
    </div>
  )
}
