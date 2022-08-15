import { InputType, YearOptions, YesNoOptions } from 'config'

export const defaultInputs = (): Record<string, InputType> => {
  return {
    businessAddress: {
      inputType: 'map',
      title: 'Business Address',
      required: true,
      span: 2,
    },
    nameOfBusiness: {
      inputType: 'text',
      title: 'Name Of Business',
      required: true,
    },
    yearsOnThisJob: {
      inputType: 'select',
      title: 'Years On This Job',
      options: YearOptions,
      required: true,
      hasDefaultOption: true,
    },
    yearsEmployedInThis: {
      inputType: 'select',
      title: 'Years Employed In This Line Of Profession',
      options: YearOptions,
      required: true,
      hasDefaultOption: true,
    },
    typeOfBusiness: {
      inputType: 'text',
      title: 'Position / Title / TypeOfBusiness',
      required: true,
    },
    businessPhone: {
      inputType: 'text',
      type: 'phone',
      title: 'Business Phone',
      required: true,
    },
    selfEmployed: {
      inputType: 'select',
      title: 'Self Employed',
      options: YesNoOptions,
      hasDefaultOption: true,
      required: true,
    },
  }
}
