import type { InputType } from 'config'
import { Input2, Select2, TextArea, Toggle, ToggleButton } from 'stories/components'
import { GoogleAutoComplete } from 'stories/components/GoogleAutoComplete/GoogleAutoComplete'

export const renderInput = (
  input: InputType,
  key: string,
  onChange: Function,
  showHistory: Function = () => {},
  onBlur: Function = () => {},
) => {
  let required = input.required
  let { fontSize, history, prefix, title, error = '', disabled, value = '', readOnly = false, tooltip = '' } = input
  required = required && !disabled
  if (!(input.inputType as any)) input.inputType = 'Text' as any

  switch (input.inputType) {
    case 'Text':
    case 'text':
      return (
        <Input2
          title={title}
          prefix={prefix}
          key={key}
          type={input.type}
          error={error}
          value={value as string}
          fontSize={fontSize}
          disabled={disabled}
          readOnly={readOnly}
          tooltip={tooltip}
          required={required}
          history={history}
          onChange={(value) => onChange(key, value)}
          onBlur={() => onBlur(key)}
          showHistory={() => showHistory(key)}
        />
      )
    case 'Select':
    case 'select':
      return (
        <Select2
          id={key}
          title={title}
          options={input.options}
          key={key}
          error={error}
          disabled={disabled}
          readOnly={readOnly}
          tooltip={tooltip}
          value={input.value as string}
          hasDefaultOption={input.hasDefaultOption}
          defaultOptionText={input.defaultOptionText}
          required={required}
          history={history}
          onChange={(value) => onChange(key, value)}
          onBlur={() => onBlur(key)}
          showHistory={() => showHistory(key)}
        />
      )
    case 'Check':
    case 'check':
      return (
        <ToggleButton
          className="pt-1"
          id={key}
          title={title}
          key={key}
          disabled={disabled}
          error={error}
          value={input.value as boolean}
          history={history}
          onChange={(value) => onChange(key, value)}
          onBlur={() => onBlur(key)}
          showHistory={() => showHistory(key)}
          label={['Yes', 'No']}
        />
      )
    case 'TextArea':
    case 'textarea':
      return (
        <TextArea
          className="pt-1"
          title={title}
          key={key}
          error={error}
          disabled={disabled}
          value={input.value as string}
          history={history}
          required={required}
          onChange={(value) => onChange(key, value)}
        />
      )
    case 'Map':
    case 'map':
      return (
        <GoogleAutoComplete
          title={title}
          key={key}
          error={error}
          value={value as string}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          tooltip={tooltip}
          onChange={(value) => onChange(key, value)}
          onBlur={() => onBlur(key)}
          history={history}
          showHistory={() => showHistory(key)}
        />
      )
    case 'Toggle':
    case 'toggle':
      return (
        <Toggle
          className="pt-1"
          id={key}
          title={title}
          key={key}
          disabled={disabled}
          error={error}
          value={input.value as boolean}
          history={history}
          onChange={(value) => onChange(key, value)}
          onBlur={() => onBlur(key)}
          showHistory={() => showHistory(key)}
        />
      )
  }
}
