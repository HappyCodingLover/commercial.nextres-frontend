import './index.scss'

import { LocationMarkerIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'
import contactImg from 'assets/contact-us.png'
import cloneDeep from 'clone-deep'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { submitContactUs } from 'services'
import { Button, Input2, TextArea } from 'stories/components'
import { InputConvert } from 'utils/convertor'
import { useTitle } from 'utils/pageTitle'
import { InputValidate } from 'utils/validator'

const defaultInputs: Record<string, any> = {
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
}

export function ContactUs() {
  useTitle(`Contact Us - ${process.env.REACT_APP_COMPANY}`)
  const [inputs, setInputs] = useState(defaultInputs)
  const [action, setAction] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = () => {
    let hasError = false
    const newState: any = cloneDeep(inputs)
    const data: Record<string, any> = {}
    for (const key in newState) {
      const { value } = newState[key]
      let error = InputValidate(newState[key])
      newState[key].error = error
      if (error.length > 0) hasError = true

      data[key] = value
    }
    if (hasError) {
      setInputs(newState)
      return
    }
    setAction('onSubmit')

    data.message = message
    submitContactUs(data)
      .then(() => toast('Submitted successfully', { type: 'info' }))
      .finally(() => setAction(''))
  }

  const onChange = (key: string, value: string) => {
    let newState: any = cloneDeep(inputs)
    newState[key].value = InputConvert(newState[key], value)
    newState[key].error = ''
    setInputs(newState)
  }

  return (
    <div className="ContactUs-container">
      <div className="px-5 pb-16 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">Contact Us</div>
        <div className="mt-3 grid md:grid-cols-2 md:gap-10">
          <div className="mb-4">
            <div className="link font-black text-[20px] mt-3 hover:underline">
              <a href="tel:+18582995570" className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <span className="ml-3 font-black text-blue-900">858-299-5570</span>
              </a>
            </div>
            <div className="link font-black text-[20px] mt-3 hover:underline">
              <a href="tel:+18336394140" className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <span className="ml-3 font-black text-blue-900">833-639-4140</span>
                <span className="text-slate-700 text-[16px] ml-3 font-normal">(Toll free)</span>
              </a>
            </div>
            <div className="link font-black text-[20px] mt-3 hover:underline">
              <a href="mailto:info@nextres.com" className="flex items-center">
                <MailIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <span className="ml-3 font-black text-blue-900">info@nextres.com</span>
              </a>
            </div>
            <div className="link font-black text-[20px] mt-3">
              <div className="flex items-center flex-wrap">
                <LocationMarkerIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <span className="ml-3 font-black text-blue-900">12 Penns Trail, Suite 138, Newtown, PA 18940</span>
              </div>
            </div>
          </div>
          <div className="about-image relative">
            <img src={contactImg} alt="about-us-img" />
          </div>
        </div>
        <div className="mt-4 md:mt-40">
          <div className="rounded-lg bg-slate-50 shadow p-5 p-10">
            <div className="grid md:grid-cols-2 md:gap-10">
              <div className="">
                {Object.keys(inputs).map((key: string, index: number) => {
                  const item = inputs[key]
                  return (
                    <div className="mb-4" key={index}>
                      <Input2
                        title={item.title}
                        key={key}
                        type={item.type}
                        error={item.error}
                        value={item.value as string}
                        disabled={item.disabled}
                        required={item.required}
                        onChange={(value) => onChange(key, value)}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="">
                <TextArea title={'Your Message'} value={message} onChange={(value) => setMessage(value)} />
                <div>
                  <Button className="mt-5" color="sky" full bold onClick={onSubmit} loading={action === 'onSubmit'}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
