import { AccountType, InputSelect } from 'config'
import { useEffect, useState } from 'react'
import { requestUserRoles } from 'services/apis/user'
import { Select } from 'stories/components'
const cloneDeep = require('clone-deep')
import { accountTypes, defaultInputs } from './config'

export const ChildUsers = ({
  isChangedAccountType = false,
  defaultData = {},
  users: childUsers,
  onUpdateValue = () => {},
}: {
  isChangedAccountType?: boolean
  defaultData: Record<string, any>
  users: Array<any>
  onUpdateValue?: (arg0: Record<string, any>, arg1: boolean) => void
}) => {
  const [values, setValues] = useState<Record<string, InputSelect>>({
    accountExecutive: defaultInputs().accountExecutive as InputSelect,
    broker: defaultInputs().broker as InputSelect,
    branch: defaultInputs().branch as InputSelect,
  })

  useEffect(() => {
    const newValues = cloneDeep(values)
    const { accountType } = defaultData
    newValues.accountExecutive.visible = false
    newValues.broker.visible = false
    newValues.branch.visible = false

    switch (accountType) {
      case AccountType.ACCOUNT_EXECUTIVE:
        newValues.accountExecutive.visible = true
        break
      case AccountType.BROKER:
      case AccountType.CORRESPONDENT:
        newValues.accountExecutive.visible = true
        newValues.broker.visible = true
        break
      case AccountType.BRANCH:
        newValues.accountExecutive.visible = true
        newValues.broker.visible = true
        newValues.branch.visible = true
        break
    }
    updateUserRoles(newValues, AccountType.ACCOUNT_EXECUTIVE, 0, 'accountExecutive')
  }, [])

  const onChange = async (key: string, value: any) => {
    let newState = cloneDeep(values)
    newState[key].value = value
    newState[key].error = ''
    setValues(newState)
    switch (key) {
      case 'accountExecutive':
        if (!value || value == '0') break
        newState.broker.value = '0'
        newState.branch.value = '0'
        newState = await updateUserRoles(newState, AccountType.BROKER, parseInt(value as string), 'broker')
        break
      case 'broker':
        if (!value || value == '0') break
        newState.branch.value = '0'
        newState = await updateUserRoles(newState, AccountType.BRANCH, parseInt(value as string), 'branch')
        break
    }

    let isValid = true
    const onlyValues: Record<string, any> = {}
    Object.keys(values).forEach((key) => {
      const input = newState[key]
      const { visible = false, value } = input
      if (!visible) return
      const isBranch = key == 'branch'
      isValid = isValid && (parseInt(value as string) != 0 || isBranch)
      onlyValues[key] = value
    })
    onUpdateValue(onlyValues, isValid)
  }

  const updateUserRoles = (State: any, accountType: AccountType, userId: number, key: string) => {
    return new Promise((resolve) => {
      requestUserRoles(accountType, userId).then(async (roles) => {
        delete roles[defaultData.id]
        let newState = cloneDeep(State)
        newState[key].options = roles

        setValues(newState)
        resolve(newState)
      })
    })
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 mt-3">
        {isChangedAccountType
          ? "You've changed account type. Here are the child users so select the alternative new account here."
          : 'If you update this, these items will be updated. Are you sure to update these also?'}
      </h3>
      {isChangedAccountType && (
        <div className="flex flex-col px-2">
          {Object.keys(values).map((key) => {
            const input = values[key]
            const { title, options, error, visible, hasDefaultOption } = input
            if (!visible) return null
            return (
              <Select
                id={key}
                title={title}
                options={options}
                key={key}
                error={error}
                value={input.value as string}
                hasDefaultOption={hasDefaultOption}
                defaultOptionText={input.defaultOptionText}
                required
                onChange={(value) => onChange(key, value)}
              />
            )
          })}
        </div>
      )}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              User Type
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {childUsers.map((user, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {index + 1}
              </th>
              <td className="px-6 py-4">{accountTypes[user.accountType as AccountType]}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
