import { InputType, loanOptionsConstants, MaritalStatusTypes, OwnershipTypes, YearOptions } from 'config'

export const defaultInputs = (): Record<string, InputType> => {
  return {
    hasEntityTitle: {
      inputType: 'toggle',
      title: 'Has Entity Title',
    },
    entityTitle: {
      inputType: 'text',
      title: 'Entity Title',
      fontSize: 32,
      required: true,
    },
    borrowerType: {
      title: 'Borrower Type',
      inputType: 'Select',
      options: loanOptionsConstants.borrowerType,
      error: '',
      required: true,
      hasDefaultOption: true,
    },
    firstName: {
      inputType: 'text',
      title: 'First Name',
      required: true,
    },
    middleName: {
      inputType: 'text',
      title: 'Middle Name',
    },
    lastName: {
      inputType: 'text',
      title: 'Last Name',
      required: true,
    },
    email: {
      inputType: 'text',
      type: 'email',
      title: 'Email',
      required: true,
    },
    ssn: {
      inputType: 'text',
      title: 'Social Security Number',
      required: true,
    },
    phone: {
      inputType: 'text',
      type: 'phone',
      title: 'Phone',
      required: true,
    },
    dob: {
      inputType: 'text',
      type: 'date',
      title: 'DOB(MM/DD/YYYY)',
      required: true,
    },
    presentAddress: {
      inputType: 'map',
      title: 'Present Address',
      required: true,
    },
    mailingAddress: {
      inputType: 'map',
      title: 'Mailing Address',
      required: true,
    },
    ownership: {
      inputType: 'select',
      title: 'Ownership',
      required: true,
      options: OwnershipTypes,
      hasDefaultOption: true,
    },
    ownedRentedYears: {
      inputType: 'select',
      title: 'Owned/Rented Years',
      required: true,
      options: YearOptions,
      hasDefaultOption: true,
    },
    formerAddress: {
      inputType: 'map',
      title: 'Former Address',
      required: true,
    },
    formerOwnership: {
      inputType: 'select',
      title: 'Former Ownership',
      required: true,
      options: OwnershipTypes,
      hasDefaultOption: true,
    },
    formerOwnedRentedYears: {
      inputType: 'select',
      title: 'Former Address Owned For In Years',
      required: true,
      options: YearOptions,
      hasDefaultOption: true,
    },
    maritalStatus: {
      inputType: 'select',
      title: 'Marital Status',
      required: true,
      options: MaritalStatusTypes,
      hasDefaultOption: true,
    },
  }
}
