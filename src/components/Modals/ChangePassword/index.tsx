import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updatePassword } from 'services/apis/user'
import { Input, Modal } from 'stories/components'

export const ChangePassword = ({
  userId,
  ...props
}: {
  userId: number
  title: string
  isOpen: boolean
  lastUpdatedAt: number
  onClose: any
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const [loading, setLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    new: '',
    confirm: '',
  })
  const [inputErrors, setInputErrors] = useState({
    new: '',
    confirm: '',
  })

  useEffect(() => {
    setIsOpen(props.isOpen)
    setLastUpdatedAt(props.lastUpdatedAt)
  }, [props.lastUpdatedAt])

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
    if (!passwords.confirm) errors.confirm = 'Required'
    if (passwords.new && passwords.new != passwords.confirm) errors.confirm = 'Not same as new password'
    if (errors.new || errors.confirm) {
      setInputErrors(errors)
      return
    }

    setLoading(true)
    await updatePassword(userId, passwords.new)
    setLoading(false)
    toast('Password is updated', { type: 'info' })
    reset()
    setLastUpdatedAt(Date.now())
    setIsOpen(false)
  }

  const onClose = () => {
    reset()
    setIsOpen(false)
    props.onClose()
  }

  if (!isOpen) return null

  return (
    <form>
      <Modal
        title="Change Password"
        titleOkay="Save"
        loading={loading}
        isOpen={isOpen}
        lastUpdatedAt={lastUpdatedAt}
        onClose={onClose}
        onOk={onSubmit}
      >
        <div className="grid gap-x-3 grid-cols-1 w-96">
          <Input
            title="New Password"
            type="password"
            error={inputErrors.new}
            value={passwords.new}
            required
            onChange={(value) => onChange('new', value)}
          />
          <Input
            title="Confirm Password"
            type="password"
            error={inputErrors.confirm}
            value={passwords.confirm}
            required
            onChange={(value) => onChange('confirm', value)}
          />
        </div>
      </Modal>
    </form>
  )
}
