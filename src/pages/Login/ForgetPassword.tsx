import imgHome from 'assets/home.jpg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendForgetPasswordEmail } from 'services/apis/user'
import { Button, Input2 } from 'stories/components'
import { useTitle } from 'utils/pageTitle'
const cloneDeep = require('clone-deep')

const defaultInputs = {
  email: '',
}

export function ForgetPassword() {
  useTitle(`Forgot Password - ${process.env.REACT_APP_COMPANY}`)

  const [isLoading, setLoading] = useState(false)
  const [inputStates, setInputStates] = useState(defaultInputs)
  const [errors, setErrors] = useState({
    email: '',
  })

  const auth = useSelector((state: any) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/login')
  }, [])

  const onSubmit = async () => {
    const newErrors = cloneDeep(defaultInputs)
    if (!inputStates.email) newErrors.email = 'Required'
    setErrors(newErrors)

    if (!inputStates.email) return

    setLoading(true)
    sendForgetPasswordEmail(inputStates.email)
      .then(() => {
        toast('Email is sent.', { type: 'info' })
        navigate('/login')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onChange = (key: string, value: string) => {
    let newState: any = Object.assign({}, inputStates)
    newState[key] = value
    setInputStates(newState)
  }

  return (
    <div className="home-container sm:text-center lg:text-left w-full block mt-0 relative">
      <div className="absolute top-0 w-full">
        <img className="w-full h-full object-cover inset-y-0" src={imgHome} alt="" />
      </div>
      <div className="max-w-screen-2xl m-auto lg:pt-20 md:pt-5 lg:pl-5 md:pl-3 sm:pt-2 sm-pl-2 mb-10">
        <div className="bg-white rounded lg:max-w-md md:max-w-md sm:max-w-sm pl-6 pr-6 pt-8 pb-6 relative">
          <p className="text-base text-stone-800 text-xl font-bold mb-3">Problems with your password?</p>
          <p className="text-base text-stone-800 text-xs mb-6">
            Enter the email you used when creating your account and we’ll send you instructions to reset your password
          </p>

          <form>
            <Input2
              type="email"
              title="Email"
              value={inputStates.email}
              required
              error={errors.email ? 'Please provide a valid email address.' : ''}
              onChange={(value) => onChange('email', value)}
            />
            <div className="my-7"></div>

            <Button className="mt-1" color="sky" full bold onClick={onSubmit} loading={isLoading}>
              Send
            </Button>

            <Link to="/login">
              <p className="block mt-3 hover:text-gray-900 hover:underline text-gray-500">Back to Login</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
