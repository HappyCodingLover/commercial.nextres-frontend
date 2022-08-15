import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updatePassword } from 'services/apis/user'
import { Button, Input2 } from 'stories/components'

export const ResetPassword = () => {
  const profile = useSelector((state: any) => state.auth.profile)
  const [loading, setLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    new: '',
    confirm: '',
  })
  const [inputErrors, setInputErrors] = useState({
    new: '',
    confirm: '',
  })

  const reset = () => {
    setPasswords({
      new: '',
      confirm: '',
    })
    setInputErrors({
      new: '',
      confirm: '',
    })
  }

  const onChange = (key: string, value: string) => {
    const newPwds = Object.assign({}, passwords) as any
    newPwds[key] = value
    setPasswords(newPwds)

    const newInputErrors = Object.assign({}, inputErrors) as any
    newInputErrors[key] = ''
    setInputErrors(newInputErrors)
  }

  const onSubmit = async () => {
    const errors = {
      new: '',
      confirm: '',
    }
    if (!passwords.new) errors.new = 'Required'
    else if (passwords.new.length < 6) errors.new = 'Should be longer than 6 letters'
    else if (!passwords.confirm) errors.confirm = 'Required'
    else if (passwords.new && passwords.new != passwords.confirm) errors.confirm = 'Not same as new password'
    if (errors.new || errors.confirm) {
      setInputErrors(errors)
      return
    }

    setLoading(true)
    await updatePassword(profile.id, passwords.new)
    setLoading(false)
    toast('Password is updated', { type: 'info' })
    reset()
  }

  return (
    <div className="flex-auto mb-5 bg-white p-5 rounded h-fit shadow1">
      <h1 className="text-2xl font-bold flex items-center pb-5">
        <span>Reset Password</span>
      </h1>

      <div className="relative">
        <div className="mb-4">
          <Input2
            title="New Password"
            type="password"
            error={inputErrors.new}
            value={passwords.new}
            required
            onChange={(value) => onChange('new', value)}
          />
        </div>
        <div className="mb-4">
          <Input2
            title="Confirm Password"
            type="password"
            error={inputErrors.confirm}
            value={passwords.confirm}
            required
            onChange={(value) => onChange('confirm', value)}
          />
        </div>
        <Button full loading={loading} onClick={onSubmit}>
          Reset
        </Button>
      </div>
    </div>
  )
}
