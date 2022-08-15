import { ClockIcon } from '@heroicons/react/outline'
import { forwardRef, useRef } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { Tooltip } from 'stories/components/Tooltip/Tooltip'

interface GoogleAutoCompleteProps {
  /**
   * Is disabled
   */
  disabled?: boolean
  /**
   * Is readOnly
   */
  readOnly?: boolean
  /**
   * Title of Input
   */
  title?: string
  /**
   * Placeholder of Input
   */
  placeholder?: string
  /**
   * Tooltip of Input
   */
  tooltip?: string
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
   * Show History
   */
  history?: boolean
  /**
   * Required
   */
  required?: boolean
  onChange: (e: any) => void // string | React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  showHistory?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const GoogleAutoComplete = forwardRef(
  (
    {
      disabled = false,
      readOnly = false,
      title = '',
      placeholder = ' ',
      tooltip = '',
      value = '',
      error = '',
      required = false,
      className = '',
      history = false,
      onChange = () => {},
      onBlur = () => {},
      showHistory = () => {},
    }: GoogleAutoCompleteProps,
    ref?: React.LegacyRef<HTMLInputElement>,
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
      disabled ? 'bg-gray-100' : 'bg-white',
      readOnly ? 'cursor-not-allowed' : '',
      'border',
      'border-gray-300',
      'focus:outline-none',
      'focus:ring-0',
      `focus:border-sky-600`,
      'peer',
      error && 'border-rose-700',
      className,
    ]
    const inputRef = useRef(null)
    const change = (e: any) => {
      onChange(e.target.value)
      // @ts-ignore
      inputRef.current.focus()
    }

    return (
      <div className="input-container">
        <div className={`group relative z-0 w-full`}>
          {readOnly ? (
            <input className={classNames.join(' ')} disabled={true} value={value} ref={ref} />
          ) : (
            <Autocomplete
              ref={inputRef}
              apiKey={'AIzaSyA2TV23UkRc7jDyLklenO902VTvnECVBOU'}
              onPlaceSelected={(place) => {
                if (place.address_components) {
                  let county = ''
                  let locality = ''
                  for (let i = 0; i < place.address_components.length; i += 1) {
                    const item = place.address_components[i]
                    if (item.types.indexOf('administrative_area_level_2') !== -1) county = item.long_name
                    if (item.types.indexOf('locality') !== -1) locality = item.long_name
                  }
                  if (county.length === 0 && locality.length) {
                    county = locality + ' city'
                  }
                  const e = {
                    target: {
                      value: place.formatted_address,
                      county: county,
                      state: place.address_components[5]?.short_name || '',
                    },
                  }
                  change(e)
                }
              }}
              onBlur={onBlur}
              className={classNames.join(' ')}
              inputAutocompleteValue={value}
              defaultValue={value}
              placeholder={placeholder}
              options={{ types: ['address'], componentRestrictions: { country: 'cn' } }}
            />
          )}

          <label className="absolute text-[12px] text-gray-700 top-1.5 border-b z-10 origin-[0] left-2.5 flex gap-2 items-center">
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
