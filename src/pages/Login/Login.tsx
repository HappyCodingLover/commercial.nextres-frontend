import { logout, signInRequest } from 'actions'
import imgHome from 'assets/home.jpg'
import jwt from 'jwt-decode'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Input2 } from 'stories/components'
import { delay } from 'utils'
import { useTitle } from 'utils/pageTitle'
const cloneDeep = require('clone-deep')

const defaultInputs = {
  email: '',
  password: '',
}

function _Login(props: any) {
  useTitle(`Login - ${process.env.REACT_APP_COMPANY}`)

  const [inputStates, setInputStates] = useState(defaultInputs)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const { auth } = props
  const navigate = useNavigate()

  const onSubmit = async () => {
    const newErrors = cloneDeep(defaultInputs)
    if (!inputStates.email) newErrors.email = 'Required'
    if (!inputStates.password) newErrors.password = 'Required'
    setErrors(newErrors)

    if (!inputStates.email || !inputStates.password) return

    await props.signInRequest(inputStates)
    await delay(0.5)
    navigate('/pipeline')
  }

  const onChange = (key: string, value: string) => {
    let newState: any = Object.assign({}, inputStates)
    newState[key] = value
    setInputStates(newState)
  }

  const keyPress = (e: any) => {
    if (e.charCode === 13) {
      onSubmit()
    }
  }

  useEffect(() => {
    let success = false

    try {
      const payload: any = jwt(auth.token)
      if (payload.exp * 1000 > Date.now()) {
        success = true
      } else {
        toast(`Your token is expired!`, { type: 'error' })
      }
    } catch {}
    if (!success) {
      props.logout()
    }
  }, [])

  return (
    <div className="login-container sm:text-center lg:text-left w-full block mt-0 relative">
      <div className="absolute top-0 w-full">
        <img className="w-full h-full object-cover inset-y-0" src={imgHome} alt="" />
      </div>
      {!auth.isAuthenticated && (
        <div className="max-w-screen-2xl m-auto lg:pt-20 md:pt-5 lg:pl-5 md:pl-3 sm:pt-2 sm-pl-2 mb-10">
          <div className="bg-white rounded lg:max-w-md md:max-w-md sm:max-w-sm pl-6 pr-6 pt-8 pb-6 relative">
            <div className="text-base text-shade-blue text-3xl font-black mb-6">Welcome to Nextres</div>

            <form>
              <Input2
                type="email"
                title="Email"
                value={inputStates.email}
                required
                error={errors.email ? 'Please provide a valid email address.' : ''}
                onChange={(value) => onChange('email', value)}
              />
              <div className="mb-5"></div>
              <Input2
                type="password"
                title="Password"
                value={inputStates.password}
                required
                error={errors.password ? 'Please provide a valid password.' : ''}
                onChange={(value) => onChange('password', value)}
                onKeyPress={(e) => keyPress(e)}
              />
              <div className="mb-5"></div>
              <Button className="mt-1" color="sky" full bold onClick={onSubmit} loading={auth.fetchingToken}>
                Sign In
              </Button>

              <Link to="/forgetPassword">
                <p className="block mt-3 hover:text-gray-900 hover:underline text-gray-500">
                  Forgot/Reset your password?
                </p>
              </Link>

              <Link to="/register">
                <p className="block mt-3 hover:text-gray-900 hover:underline text-gray-500">Create a new account</p>
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function mapStateToProps(state: any) {
  return {
    auth: state.auth,
  }
}

export const Login = connect(mapStateToProps, { logout, signInRequest })(_Login)
