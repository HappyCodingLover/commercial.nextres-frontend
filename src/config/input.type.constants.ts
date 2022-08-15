export interface BaseInput {
  title: string
  required?: boolean // default: true
  value?: any
  fontSize?: number
  error?: string
  visible?: boolean // default true
  disabled?: boolean
  history?: boolean
  prefix?: string
  span?: number // col-span
  readOnly?: boolean
  tooltip?: string
}

export interface InputText extends BaseInput {
  inputType: 'text' | 'Text' | 'Map' | 'map' | 'read' | 'toggle' | 'Toggle'
  type?: 'thousandSep' | 'date' | 'email' | 'phone' | 'number' | 'text' // Default is 'text'
}

export interface InputSelect extends BaseInput {
  inputType: 'select' | 'Select'
  options: Array<string> | Record<string, string>
  hasDefaultOption: boolean
  defaultOptionText?: string
  allowDefaultOption?: boolean // default: false
}

export interface InputCheck extends BaseInput {
  inputType: 'check' | 'Check' // default: 'text'
}

export interface TextArea extends BaseInput {
  inputType: 'textarea' | 'TextArea'
}

export interface InputButtonGroupSelector extends BaseInput {
  inputType: 'buttongroup' | 'ButtonGroup'
  options: Array<string> | Record<string, string>
}

export type InputType = InputText | InputSelect | InputCheck | TextArea | InputButtonGroupSelector
