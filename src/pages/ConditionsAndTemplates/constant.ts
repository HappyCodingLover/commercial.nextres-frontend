import { accountTypes } from 'components/Modals/CreateUser/config'

export const condConstant = {
  classes: ['UW', 'PROCESSOR', 'FUNDING', 'CLOSING', 'POST', 'TRAIL', 'QA'].sort(),
  types: [
    'APPLICATION',
    'DISC',
    'CONDO',
    'CRED',
    'INC',
    'ASSET',
    'PROP',
    'MISC',
    'PTD',
    'PTF',
    'FHA',
    'PTD-Internal',
    'INVESTOR SUSPEND',
    'TRAILING DOCS',
    'QA',
    'PTU',
    'PPC',
    'VA',
    'NON QM REFI DEFAULT',
  ].sort(),
  respon: [
    'Closer',
    'COC',
    'Escrow Company',
    'Funder',
    'Loan Officer',
    'Loan Processor',
    'Post Closer',
    'Quality Control',
    'Settlement Company',
    'Title Company',
    'Underwriter',
    'Loan Setup',
  ].sort(),
  ines: ['Yes', 'No'],
}

export const taskPriority: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export const categories = [
  'Post Closing Suspense Conditions',
  'Prior To Purchase',
  'PTD',
  'PTD - Internal',
  'PTF',
  'Trailing Docs',
].sort()

export const taskSecurity: Record<string, string> = {
  high: 'High - Only Task Creator can Modify',
  medium: 'Medium - Assignee can Modify due Date',
  low: 'Low - Anyone can Modify',
}

export const conditionInputs = () => {
  return {
    name: {
      inputType: 'text',
      title: 'Name',
      value: '',
      error: '',
      required: true,
      key: 'name',
    },
    category: {
      title: 'Category',
      inputType: 'Select',
      options: categories,
      value: '',
      error: '',
      key: 'category',
      required: true,
      hasDefaultOption: true,
    },
    class: {
      title: 'Class',
      inputType: 'Select',
      options: condConstant.classes,
      value: '',
      error: '',
      key: 'class',
      required: true,
      hasDefaultOption: true,
    },
    type: {
      title: 'Type',
      inputType: 'Select',
      options: condConstant.types,
      value: '',
      error: '',
      key: 'type',
      required: true,
      hasDefaultOption: true,
    },
    responsibility: {
      title: 'Responsibility',
      inputType: 'Select',
      options: condConstant.respon,
      value: '',
      error: '',
      key: 'responsibility',
      required: true,
      hasDefaultOption: true,
    },
    intext: {
      title: 'Int/Ext',
      inputType: 'Check',
      value: false,
      error: '',
      key: 'intext',
      required: true,
    },
    description: {
      title: 'Description',
      inputType: 'TextArea',
      value: '',
      error: '',
      key: 'description',
      required: true,
      rows: 9,
      length: 1,
    },
  }
}

export const taskInputs = () => {
  return {
    description: {
      title: 'Description',
      value: '',
      error: '',
      required: true,
      key: 'description',
    },
    assignedTo: {
      title: 'Assigned to',
      inputType: 'Select',
      options: accountTypes,
      hasDefaultOption: true,
      error: '',
      required: true,
      key: 'assignedTo',
    },
    dueDays: {
      title: 'Due days',
      value: '',
      error: '',
      required: true,
      key: 'dueDays',
      type: 'number',
    },
    security: {
      title: 'Security',
      inputType: 'Select',
      options: taskSecurity,
      hasDefaultOption: true,
      error: '',
      required: true,
      key: 'security',
    },
    priority: {
      title: 'Taks priority',
      inputType: 'Select',
      options: taskPriority,
      hasDefaultOption: true,
      value: '',
      error: '',
      required: true,
      key: 'priority',
    },
    notes: {
      title: 'Notes',
      value: '',
      error: '',
      key: 'notes',
    },
  }
}
