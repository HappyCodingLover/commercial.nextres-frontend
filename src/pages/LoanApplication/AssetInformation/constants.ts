import type { InputType } from 'config'

export const defaultInputs = (): Record<string, InputType> => {
  return {
    bankName: {
      inputType: 'text',
      title: 'Full Name',
      required: true,
    },
    accountBalance: {
      inputType: 'text',
      type: 'number',
      title: 'Account Balance',
      required: true,
      prefix: '$',
    },
  }
}
