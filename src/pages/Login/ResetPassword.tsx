import imgHome from 'assets/home.jpg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkPassport, resetPassword } from 'services/apis/user'
import { Button, Input2 } from 'stories/components'
import { useTitle } from 'utils/pageTitle'
const cloneDeep = require('clone-deep')

const defaultInputs = {
  password: '',
  confirm: '',
}

export function ResetPassword() {
  useTitle(`Reset Password - ${process.env.REACT_APP_COMPANY}`)
  const [isLoading, setLoading] = useState(false)
  const [inputStates, setInputStates] = useState(defaultInputs)
  const { selector, token } = useParams()
  const [errors, setErrors] = useState({
    password: '',
    confirm: '',
  })

  const auth = useSelector((state: any) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isAuthenticated || !selector || !token) {
      navigate('/login')
      return
    }
    setLoading(true)
    checkPassport(selector, token)
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        toast('Invalid token', { type: 'warning' })
      })
  }, [])

  const onSubmit = async () => {
    if (!selector || !token) return

    const errors = {
      password: '',
      confirm: '',
    }
    if (!inputStates.password) errors.password = 'Required'
    else if (inputStates.password.length < 6) errors.password = 'Should be longer than 6 letters'
    else if (!inputStates.confirm) errors.confirm = 'Required'
    else if (inputStates.password && inputStates.password != inputStates.confirm)
      errors.confirm = 'Not same as new password'
    if (errors.password || errors.confirm) {
      setErrors(errors)
      return
    }

    setLoading(true)
    resetPassword(selector, token, inputStates.password)
      .then(() => {
        toast('Password is reset.', { type: 'info' })
        navigate('/login')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onChange = (key: string, value: string) => {
    let newState: any = cloneDeep(inputStates)
    let newErrors: any = cloneDeep(errors)
    newErrors[key] = ''
    newState[key] = value
    setInputStates(newState)
    setErrors(newErrors)
  }

  return (
    <div className="home-container sm:text-center lg:text-left w-full block mt-0 relative">
      <div className="absolute top-0 w-full">
        <img className="w-full h-full object-cover inset-y-0" src={imgHome} alt="" />
      </div>
      <div className="max-w-screen-2xl m-auto lg:pt-20 md:pt-5 lg:pl-5 md:pl-3 sm:pt-2 sm-pl-2 mb-10">
        <div className="bg-white rounded lg:max-w-md md:max-w-md sm:max-w-sm pl-6 pr-6 pt-8 pb-6 relative">
          <p className="text-base text-stone-800 text-xl font-bold mb-4">Reset Password</p>
          <form>
            <Input2
              type="password"
              title="New Password"
              value={inputStates.password}
              required
              error={errors.password}
              onChange={(value) => onChange('password', value)}
            />
            <div className="my-4"></div>
            <Input2
              type="password"
              title="Confirm Password"
              value={inputStates.confirm}
              required
              error={errors.confirm}
              onChange={(value) => onChange('confirm', value)}
            />
            <div className="my-7"></div>

            <Button className="mt-1" color="sky" full bold onClick={onSubmit} loading={isLoading}>
              Reset
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
