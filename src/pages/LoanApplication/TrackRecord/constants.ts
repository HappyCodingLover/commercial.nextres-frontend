import type { InputType } from 'config'

export const PropertyTypeOptions = [
  'SRF',
  'Condo',
  '2-4 Units',
  'PUD',
  '(5-9 units)',
  '(10+ units)',
  'Mixed-Use',
  'Land',
  'Other',
]

export const defaultInputs = (): Record<string, InputType> => {
  return {
    propertyAddress: {
      inputType: 'map',
      title: 'Property Address',
      required: true,
    },
    propertyType: {
      inputType: 'select',
      title: 'Property Type',
      options: PropertyTypeOptions,
      hasDefaultOption: true,
      required: true,
    },
    purchasePrice: {
      inputType: 'text',
      type: 'number',
      title: 'Purchase Price',
      required: true,
      prefix: '$',
    },
    purchaseDate: {
      inputType: 'text',
      type: 'date',
      title: 'Purchase Date',
      required: true,
    },
    renovationBudget: {
      inputType: 'text',
      type: 'number',
      title: 'Renovation Budget',
      required: true,
      prefix: '$',
    },
    salesPrice: {
      inputType: 'text',
      type: 'number',
      title: 'Sales Price',
      required: true,
      prefix: '$',
    },
    salesDate: {
      inputType: 'text',
      type: 'date',
      title: 'Sales Date',
      required: true,
    },
    additionalNotes: {
      inputType: 'text',
      title: 'Additional Notes',
      required: false,
    },
  }
}
