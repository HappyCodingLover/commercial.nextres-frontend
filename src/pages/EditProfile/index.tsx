const cloneDeep = require('clone-deep')
import { authUpdateProfile } from 'actions'
import { defaultInputs } from 'components/Modals/CreateUser/config'
import { AccountType, isNeedAccountTypeValidate } from 'config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { requestUserRoles, updateProfile } from 'services/apis/user'
import svgLoading from 'stories/assets/loading.svg'
import { Button } from 'stories/components'
import { openAuditLog, renderInput } from 'utils'
import { InputConvert } from 'utils/convertor'
import { useTitle } from 'utils/pageTitle'
import { InputValidate } from 'utils/validator'

import { ResetPassword } from './ResetPassword'

export function EditProfile() {
  useTitle(`Edit my Profile - ${process.env.REACT_APP_COMPANY}`)
  const dispatch = useDispatch()
  const profile = useSelector((state: any) => state.auth.profile)
  const [inputStates, setInputStates] = useState(defaultInputs())
  const [loading, setLoading] = useState(false)
  const [executives, setExecutives] = useState({})
  const [initAccountTypeChange, setInitAccountTypeChange] = useState(false)
  useEffect(() => {
    onUpdateAccountType()
  }, [profile])

  const onUpdateAccountType = async () => {
    let newState = cloneDeep(inputStates)
    const primaryInputs = defaultInputs()
    Object.keys(newState).forEach((key) => {
      newState[key].visible = false
      newState[key].disabled = false
      if (key == 'accountType') return

      if (profile && profile[key] !== undefined) newState[key].value = profile[key]
      else newState[key].value = primaryInputs[key].value
    })
    newState.accountType.visible = true
    const { accountType } = profile

    const visibleInputs = [
      'name',
      'email',
      'phone',
      'phoneExt',
      'street',
      'city',
      'state',
      'zip',
      'companyName',
      'companyNmls',
      'showGenerateDocuments',
    ]
    const disabledInputs = ['accountType', 'accountExecutive', 'broker', 'branch']

    switch (accountType) {
      case AccountType.ADMIN:
        visibleInputs.push('businessPurpose')
        break
      case AccountType.UW_MANAGER:
      case AccountType.UNDERWRITER:
        visibleInputs.push('condoReview')
        break
      case AccountType.BROKER:
      case AccountType.CORRESPONDENT:
        visibleInputs.push(
          ...['accountExecutive', 'maxCompensation', 'minCompensation', 'brokerCompensation', 'businessPurpose'],
        )
        break
      case AccountType.BRANCH:
        visibleInputs.push(...['accountExecutive', 'broker', 'branchNmls', 'businessPurpose'])
        break
      case AccountType.LOAN_OFFICER:
        visibleInputs.push(
          ...[
            'accountExecutive',
            'broker',
            'branch',
            'companyLicense',
            'loanOfficer',
            'loanOfficerStateLicense',
            'businessPurpose',
          ],
        )
        disabledInputs.push(...['street', 'city', 'state', 'zip', 'companyName', 'companyNmls'])
        break
      case AccountType.LOAN_PROCESSOR:
        visibleInputs.push(...['accountExecutive', 'broker', 'branch', 'businessPurpose'])
        disabledInputs.push(...['street', 'city', 'state', 'zip', 'companyName', 'companyNmls'])
        break
    }
    visibleInputs.forEach((key) => (newState[key].visible = true))
    disabledInputs.forEach((key) => (newState[key].disabled = true))

    newState.accountExecutive.options = executives
    setInitAccountTypeChange(true)
    if (
      isNeedAccountTypeValidate(profile.accountType) ||
      profile.accountType == AccountType.LOAN_OFFICER ||
      profile.accountType == AccountType.LOAN_PROCESSOR
    ) {
      const executiveRoles = await requestUserRoles(AccountType.ACCOUNT_EXECUTIVE, 0)
      setExecutives(executiveRoles)
      newState.accountExecutive.options = executiveRoles

      newState = await updateUserRoles(
        newState,
        AccountType.BROKER,
        parseInt((profile.accountExecutive || profile.id) as string),
        'broker',
        false,
      )
      newState.accountExecutive.value = profile.accountExecutive || profile.id

      if (profile.accountType != AccountType.ACCOUNT_EXECUTIVE) {
        newState.broker.value = profile.broker || profile.id
        newState = await updateUserRoles(
          newState,
          AccountType.BRANCH,
          parseInt((profile.broker || profile.id) as string),
          'branch',
          false,
        )
      }
      if (profile.accountType == AccountType.BRANCH) {
        newState.branch.value = profile.branch || profile.id
      }
    }
    setInitAccountTypeChange(false)
    newState.accountType.value = accountType
    setInputStates(newState)
    return newState
  }

  const updateUserRoles = (State: any, accountType: AccountType, userId: number, key: string, isSetState = true) => {
    return new Promise((resolve) => {
      requestUserRoles(accountType, userId).then(async (roles) => {
        if (profile.id) delete roles[profile.id]
        let newState = cloneDeep(State)
        newState[key].options = roles

        isSetState && setInputStates(newState)
        resolve(newState)
      })
    })
  }

  const onChange = async (key: string, value: string | boolean) => {
    let newState = cloneDeep(inputStates)
    newState[key].value = InputConvert(newState[key], value)
    newState[key].error = ''
    setInputStates(newState)
  }

  const onUpdate = () => {
    let hasError = false
    const newStats = cloneDeep(inputStates)
    const data: Record<string, any> = {}
    for (const key in newStats) {
      const { value, visible, disabled = false } = newStats[key]
      let error = InputValidate(newStats[key])
      newStats[key].error = error
      if (error.length > 0) hasError = true

      if (visible && !disabled && value !== undefined) data[key] = value
    }
    if (hasError) {
      setInputStates(newStats)
      return
    }
    setLoading(true)
    ;['accountType', 'accountExecutive', 'broker', 'branch'].forEach((key) => {
      data[key] = profile[key]
    })

    updateProfile(data)
      .then(() => {
        toast('User data is submitted', { type: 'success' })
        dispatch(authUpdateProfile(data))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const showHistory = (key: string) => {
    const options = {
      table: 'User',
      field: inputStates[key].title,
      keys: {
        userId: profile.id,
        field: key,
      },
    }
    openAuditLog(options)
  }

  return (
    <div className="registration-container p-3 md:p-6">
      <div className="max-w-screen-2xl m-auto rounded sm:text-center lg:text-left w-full flex flex-wrap">
        <div className="xl:w-[60%] w-full mb-5 bg-white p-5 xl:mr-8 rounded shadow1">
          <h1 className="text-2xl font-bold flex items-center">
            <span>My Profile</span>{' '}
            <span className="text-base ml-3">
              {initAccountTypeChange && <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />}
            </span>
          </h1>
          {!initAccountTypeChange && (
            <>
              <div className="relative">
                <div className="grid gap-x-4 md:grid-cols-2 pt-5">
                  {Object.keys(inputStates).map((key, index) => {
                    const input = inputStates[key]
                    if (!input.visible) return null
                    return (
                      <div className="input mb-4" key={index}>
                        {renderInput(
                          {
                            ...input,
                            disabled: initAccountTypeChange ? true : input.disabled,
                            history: true,
                          },
                          key,
                          onChange,
                          showHistory,
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mt-3">
                <Button full loading={loading} onClick={onUpdate}>
                  Update
                </Button>
              </div>
            </>
          )}
        </div>

        <ResetPassword />
      </div>
    </div>
  )
}
