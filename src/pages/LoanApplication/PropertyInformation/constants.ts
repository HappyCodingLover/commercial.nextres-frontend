import { InputType, loanOptionsConstants } from 'config'

export const defaultInputs = (): Record<string, InputType> => {
  return {
    subjectPropertyAddress: {
      inputType: 'map',
      title: 'Property Address',
      value: '',
      error: '',
      required: true,
    },
    propertyCounty: {
      inputType: 'text',
      title: 'Property County',
      value: '',
      error: '',
      required: true,
    },
    apartmentUnit: {
      inputType: 'text',
      type: 'number',
      title: 'Apartment/Unit #',
      value: '',
      error: '',
    },
    propertyType: {
      inputType: 'select',
      title: 'Property Type',
      options: loanOptionsConstants.propertyTypeBigList,
      hasDefaultOption: true,
      required: true,
    },
    numberOfUnits: {
      inputType: 'text',
      type: 'number',
      title: 'Number of Units',
      value: '',
      error: '',
      required: true,
    },
    proposedMonthlyTaxes: {
      title: 'Proposed Monthly Taxes',
      inputType: 'text',
      type: 'thousandSep',
      error: '',
      prefix: '$',
      required: true,
    },
    proposedMonthlyInsurance: {
      title: 'Proposed Monthly Insurance',
      inputType: 'text',
      type: 'thousandSep',
      error: '',
      prefix: '$',
      required: true,
    },
    proposedMonthlyRent: {
      title: 'Proposed Monthly Rent',
      inputType: 'text',
      type: 'thousandSep',
      error: '',
      prefix: '$',
      required: true,
    },
    proposedMonthlyHoaDues: {
      title: 'Proposed Monthly HOA Dues',
      inputType: 'text',
      type: 'thousandSep',
      error: '',
      prefix: '$',
      required: true,
    },
    yearAcquired: {
      inputType: 'text',
      type: 'number',
      title: 'Year Acquired',
    },
    amountExistingLiens: {
      inputType: 'text',
      type: 'thousandSep',
      title: 'Amount Existing Liens',
      prefix: '$',
    },
  }
}
