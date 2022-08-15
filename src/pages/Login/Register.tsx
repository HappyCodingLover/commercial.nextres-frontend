import { AccountType } from 'config'
import { states } from 'config/states.constants'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAccountExecutives, registerUser } from 'services/apis/user'
import { Agreement, Button, Modal, Toggle } from 'stories/components'
import { renderInput } from 'utils'
import { InputConvert } from 'utils/convertor'
import { useTitle } from 'utils/pageTitle'
import { InputValidate } from 'utils/validator'

const cloneDeep = require('clone-deep')

const registerFormInputs = [
  {
    title: '',
    inputs: {
      accountExecutive: {
        title: 'Account Executive Associated With',
        inputType: 'select',
        options: [],
        hasDefaultOption: true,
        value: '0',
        required: true,
        width: 'full',
      },
    },
  },
  {
    title: 'Company information',
    inputs: {
      street: {
        inputType: 'text',
        title: 'Street Address',
        required: true,
      },
      city: {
        inputType: 'text',
        title: 'City',
        required: true,
      },
      state: {
        inputType: 'select',
        title: 'State',
        options: states,
        hasDefaultOption: true,
        required: true,
      },
      zip: {
        inputType: 'text',
        type: 'number',
        title: 'Zip',
        required: true,
      },
      companyName: {
        inputType: 'text',
        title: 'Company Name',
        required: true,
      },
      companyNmls: {
        inputType: 'text',
        type: 'number',
        title: 'Company NMLS ID',
        required: false,
      },
      minCompensation: {
        inputType: 'text',
        type: 'number',
        title: 'Min Compensation',
        required: false,
        prefix: '%',
      },
      maxCompensation: {
        inputType: 'text',
        type: 'number',
        title: 'Max Compensation',
        required: false,
        prefix: '%',
      },
      brokerCompensation: {
        inputType: 'text',
        type: 'number',
        title: 'Broker/Branch Compensation',
        required: false,
        prefix: '%',
      },
    },
  },
  {
    title: 'Personal Information',
    inputs: {
      name: {
        inputType: 'text',
        title: 'Full Name',
        required: true,
      },
      email: {
        inputType: 'text',
        type: 'email',
        title: 'Email',
        required: true,
      },
      phone: {
        inputType: 'text',
        type: 'phone',
        title: 'Phone Number',
        required: true,
      },
      phoneExt: {
        inputType: 'text',
        type: 'phone',
        title: 'Phone Ext',
        required: false,
      },
    },
  },
]

const defaultInputs = () => {
  return cloneDeep(registerFormInputs)
}

export function Register() {
  useTitle(`Register - ${process.env.REACT_APP_COMPANY}`)
  const [isLoading, setLoading] = useState(false)
  const [inputStates, setInputStates] = useState(defaultInputs())
  const [isOpenModal, setOpenModal] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0)
  const [isAgree, setIsAgree] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getAccountExecutives().then((roles) => {
      const inputs = cloneDeep(inputStates)
      inputs[0].inputs.accountExecutive.options = roles
      setInputStates(inputs)
    })
  }, [])

  const onSubmit = async () => {
    let hasError = false
    const newStats = cloneDeep(inputStates)
    const data: Record<string, any> = {}

    newStats.forEach((stats: any) => {
      const newStats = stats.inputs
      for (const key in newStats) {
        const { value } = newStats[key]
        newStats[key].visible = true
        let error = InputValidate(newStats[key])
        newStats[key].error = error
        if (error.length > 0) hasError = true

        if (value !== undefined) data[key] = value
      }
    })
    if (hasError) {
      setInputStates(newStats)
      return
    }

    setLastUpdatedAt(Date.now())
    setOpenModal(true)
  }

  const onChange = (index: number, key: string, value: string) => {
    let newState = cloneDeep(inputStates)
    newState[index].inputs[key].value = InputConvert(newState[index].inputs[key], value)
    newState[index].inputs[key].error = ''
    setInputStates(newState)
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setLastUpdatedAt(Date.now())

    const newStats = cloneDeep(inputStates)
    const data: Record<string, any> = {}

    newStats.forEach((stats: any) => {
      const newStats = stats.inputs
      for (const key in newStats) {
        const { value } = newStats[key]
        if (value !== undefined) data[key] = value
      }
    })
    setLoading(true)
    data.accountType = AccountType.BROKER
    registerUser(data)
      .then(() => {
        toast('User data is submitted', { type: 'success' })
        navigate('/login')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderGroup = (group: any, index: number) => {
    const { title, inputs } = group

    return (
      <div key={title} className="block mb-5 rounded-md border border-solid border-stone-200 shadow-md p-5 pb-0">
        <p className="text-xl mb-3">{title}</p>
        {Object.keys(inputs).map((key, _index) => {
          const input = inputs[key]
          return (
            <div className="input w-full mb-4" key={_index}>
              {renderInput(
                {
                  ...input,
                  history: false,
                },
                key,
                (key: string, value: any) => onChange(index, key, value),
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="home-container sm:text-center lg:text-left w-full block mt-0 relative bg-stone-100">
      <div className="max-w-screen-2xl m-auto lg:pt-10 md:pt-5 sm:pt-2 pb-10">
        <div className="bg-white rounded lg:max-w-xl max-w-full pl-6 pr-6 pt-8 pb-6 relative mx-auto">
          <p className="text-base text-stone-800 text-4xl font-bold mb-3">Register</p>
          <div className="flex mb-5">
            <p className="text-base text-stone-800 text-md mr-5">Already have an account?</p>
            <Link to="/login">
              <p className="block text-md hover:text-gray-900 hover:underline text-gray-500">Login</p>
            </Link>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-4">
            <div className="h-1 bg-green-500 w-full" />
            <div className="h-1 bg-stone-200 w-full" />
            <div className="h-1 bg-stone-200 w-full" />
          </div>

          {inputStates.map((group: any, index: number) => renderGroup(group, index))}

          <div className="my-7"></div>

          <Button className="mt-1" color="sky" full bold onClick={onSubmit} loading={isLoading}>
            Register
          </Button>

          <Modal
            isOpen={isOpenModal}
            lastUpdatedAt={lastUpdatedAt}
            titleOkay="Agree"
            onOk={onCloseModal}
            title={'Broker Agreement'}
            disabled={!isAgree}
          >
            <div className="max-w-screen-lg">
              <Agreement />
              <div className="mt-4">
                <Toggle
                  title="I agree"
                  name="agree"
                  id="agree"
                  value={isAgree}
                  onChange={(value) => setIsAgree(value)}
                />
              </div>
            </div>
          </Modal>

          <Link to="/login">
            <p className="block mt-3 hover:text-gray-900 hover:underline text-gray-500">Back to Login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
