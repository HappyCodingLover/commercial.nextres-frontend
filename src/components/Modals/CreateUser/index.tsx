import { AccountType, InputSelect, isNeedAccountTypeValidate } from 'config'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getChildUsers, requestUserProps, requestUserRoles, submitUser, updateChildUserTypes } from 'services/apis/user'
import { Button, Modal } from 'stories/components'
import { openAuditLog, renderInput } from 'utils'
import { InputConvert } from 'utils/convertor'
import { InputValidate } from 'utils/validator'

import { defaultInputs } from './config'
import { confirmChildUsers } from './ConfirmUser'
const cloneDeep = require('clone-deep')

export const CreateUser = ({ defaultData = null, onClose = () => {}, onAfterSubmit = () => {}, ...props }: any) => {
  const profile = useSelector((state: any) => state.auth.profile)
  const [inputStates, setInputStates] = useState(defaultInputs())
  const [accountType, setAccountType] = useState<AccountType>(AccountType.BROKER)
  const [isOpen, setIsOpen] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const [executives, setExecutives] = useState({})
  const [loading, setLoading] = useState(false)
  const [defaultValueStep, setDefaultValueStep] = useState<string | null>(null)
  const [initAccountTypeChange, setInitAccountTypeChange] = useState(false)

  const executiveOptionFeed = () => {
    if (isNeedAccountTypeValidate(profile.accountType)) return
    const newState = cloneDeep(inputStates)
    const accountExecutive = newState.accountExecutive as InputSelect
    accountExecutive.options = executives
    newState.accountExecutive = accountExecutive
    setInputStates(newState)
  }

  useEffect(() => {
    executiveOptionFeed()
  }, [executives])

  useEffect(() => {
    requestUserRoles(AccountType.ACCOUNT_EXECUTIVE, 0).then((roles) => {
      if (defaultData && defaultData.id) delete roles[defaultData.id]
      setExecutives(roles)
    })
  }, [])

  useEffect(() => {
    setIsOpen(props.isOpen)
    setLastUpdatedAt(props.lastUpdatedAt)
    setDefaultValueStep(null)
    if (!defaultData || !props.isOpen) return

    setAccountType(defaultData.accountType)
    requestUserRoles(AccountType.ACCOUNT_EXECUTIVE, 0).then((roles) => {
      if (defaultData && defaultData.id) delete roles[defaultData.id]
      setExecutives(roles)
    })
  }, [props.lastUpdatedAt, props.isOpen])

  useEffect(() => {
    if (!isOpen) return
    onUpdateAccountType()
  }, [accountType, isOpen])

  useEffect(() => {
    if (defaultData && defaultValueStep == null) setDefaultValueStep('accountExecutive')
  }, [inputStates])

  useEffect(() => {
    if (!defaultData || !defaultValueStep || defaultValueStep == 'DONE') return
    onChange(defaultValueStep as string, inputStates[defaultValueStep].value as string, false).then(() => {
      const nextSteps: Record<string, string> = {
        accountExecutive: AccountType.BROKER,
        [AccountType.BROKER]: AccountType.BRANCH,
        [AccountType.BRANCH]: 'DONE',
      }
      const nextStep = nextSteps[defaultValueStep]
      setDefaultValueStep(nextStep)
    })
  }, [defaultValueStep])

  const isCreate = useMemo(() => !defaultData || !defaultData.id, [defaultData])

  const clearErrors = () => {
    const newStates = cloneDeep(inputStates)
    for (const key in newStates) newStates[key].error = ''
    setInputStates(newStates)
  }

  const onCreateUser = () => {
    setIsOpen(true)
    executiveOptionFeed()
    if (!defaultData) {
      const defaultAccountTypes: Record<string, AccountType> = {
        [AccountType.BROKER]: AccountType.BRANCH,
        [AccountType.CORRESPONDENT]: AccountType.BRANCH,
        [AccountType.BRANCH]: AccountType.LOAN_OFFICER,
      }
      const defaultAccountType = defaultAccountTypes[profile.accountType] ?? AccountType.BROKER
      setAccountType(defaultAccountType)
    }
  }

  const onCloseUserModal = () => {
    let newState = defaultInputs()
    const accountExecutive = newState.accountExecutive as InputSelect
    accountExecutive.options = executives
    newState.accountExecutive = accountExecutive
    setInputStates(newState)
    onClose()
  }

  const onChange = async (key: string, value: string | boolean, fromModalChange: boolean = true) => {
    let newState = cloneDeep(inputStates)
    newState[key].value = InputConvert(newState[key], value)
    newState[key].error = ''
    setInputStates(newState)
    switch (key) {
      case 'accountType':
        setAccountType(value as AccountType)
        clearErrors()
        break
      case 'accountExecutive':
        if (!value || value == '0') break
        if (fromModalChange) {
          newState.broker.value = '0'
          newState.branch.value = '0'
        }
        await updateUserRoles(newState, AccountType.BROKER, parseInt(value as string), 'broker')
        break
      case 'broker':
        if (!value || value == '0') break
        if (fromModalChange) {
          newState.branch.value = '0'
        }
        newState = await updateUserRoles(newState, AccountType.BRANCH, parseInt(value as string), 'branch')
        if (!defaultValueStep || defaultValueStep == 'DONE')
          await updateDefaultProps(newState, parseInt(value as string))
        break
      case 'branch':
        if (!value || value == '0') {
          if (accountType == AccountType.LOAN_OFFICER || accountType == AccountType.LOAN_PROCESSOR)
            await updateDefaultProps(newState, parseInt(inputStates.broker.value as string))
          else break
        } else await updateDefaultProps(newState, parseInt(value as string))
        break
    }
  }

  const updateUserRoles = (State: any, accountType: AccountType, userId: number, key: string, isSetState = true) => {
    return new Promise((resolve) => {
      if (isSetState) setInitAccountTypeChange(true)
      requestUserRoles(accountType, userId)
        .then(async (roles) => {
          if (defaultData && defaultData.id) delete roles[defaultData.id]
          let newState = cloneDeep(State)
          newState[key].options = roles

          isSetState && setInputStates(newState)
          resolve(newState)
        })
        .finally(() => {
          if (isSetState) setInitAccountTypeChange(false)
        })
    })
  }

  const updateDefaultProps = (State: any, userId: number, isSetState = true) => {
    return new Promise((resolve) => {
      let newState = cloneDeep(State)
      requestUserProps(userId).then((props) => {
        Object.keys(props).forEach((key) => {
          if (!newState[key]) return
          if (!isCreate && newState[key].value && !newState[key].disabled) return
          newState[key].value = props[key]
          newState[key].error = ''
        })
        isSetState && setInputStates(newState)
        resolve(newState)
      })
    })
  }

  const onUpdateAccountType = async () => {
    if (!isOpen) return
    let newState = cloneDeep(inputStates)
    const primaryInputs = defaultInputs()
    Object.keys(newState).forEach((key) => {
      newState[key].visible = false
      newState[key].disabled = false
      if (key == 'accountType') return

      if (defaultData && defaultData[key] !== undefined) newState[key].value = defaultData[key]
      else newState[key].value = primaryInputs[key].value
    })
    newState.accountType.visible = true

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
    const disabledInputs = []

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
    setInitAccountTypeChange(true)
    if (isNeedAccountTypeValidate(profile.accountType)) {
      const invisibleInputs = []

      switch (profile.accountType) {
        case AccountType.ACCOUNT_EXECUTIVE:
          newState.accountType.options = {
            broker: 'Broker',
            correspondent: 'Correspondent',
            branch: 'Branch',
            loan_officer: 'Loan Officer',
            loan_processor: 'Loan Processor',
          }
          newState.accountExecutive.disabled = true
          invisibleInputs.push('accountExecutive')
          break
        case AccountType.BROKER:
        case AccountType.CORRESPONDENT:
          newState.accountType.options = {
            branch: 'Branch',
            loan_officer: 'Loan Officer',
            loan_processor: 'Loan Processor',
          }
          newState.accountExecutive.disabled = true
          newState.broker.disabled = true
          invisibleInputs.push(...['accountExecutive', 'broker'])
          break
        case AccountType.BRANCH:
          newState.accountType.options = {
            loan_officer: 'Loan Officer',
            loan_processor: 'Loan Processor',
          }
          invisibleInputs.push(...['accountExecutive', 'broker', 'branch'])
          break
      }

      invisibleInputs.forEach((key) => (newState[key].visible = false))

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
        newState = await updateDefaultProps(newState, parseInt(profile.id as string), false)
      }
    }
    setInitAccountTypeChange(false)
    newState.accountType.value = accountType
    setInputStates(newState)
    return newState
  }

  const onSubmit = async () => {
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

    if (!isCreate) {
      const askingTypes1 = [AccountType.BROKER, AccountType.CORRESPONDENT, AccountType.BRANCH]
      const askingTypes2 = [
        AccountType.ACCOUNT_EXECUTIVE,
        AccountType.BROKER,
        AccountType.CORRESPONDENT,
        AccountType.BRANCH,
      ]
      if (
        (defaultData.accountType == inputStates.accountType.value &&
          askingTypes1.indexOf(defaultData.accountType) != -1 &&
          (defaultData.accountExecutive != inputStates.accountExecutive.value ||
            defaultData.broker != inputStates.broker.value)) ||
        (defaultData.accountType != inputStates.accountType.value &&
          askingTypes2.indexOf(defaultData.accountType) != -1)
      ) {
        const isChangedAccountType = defaultData.accountType != inputStates.accountType.value
        const childUsers = await getChildUsers(defaultData.id)
        if (childUsers.length) {
          const confirmResult = (await confirmChildUsers({
            isChangedAccountType,
            defaultData,
            users: childUsers,
          })) as any
          if (confirmResult === false) {
            setLoading(false)
            return
          }
          if (confirmResult != true) {
            await updateChildUserTypes(defaultData.id, confirmResult)
          }
        }
      }
    }

    if (isNeedAccountTypeValidate(profile.accountType)) {
      data.accountExecutive = data.accountExecutive || profile.accountExecutive
      data.broker = data.broker || profile.broker
      data.branch = data.branch || profile.branch
      switch (profile.accountType) {
        case AccountType.ACCOUNT_EXECUTIVE:
          data.accountExecutive = profile.id
          break
        case AccountType.BROKER:
        case AccountType.CORRESPONDENT:
          data.broker = profile.id
          break
        case AccountType.BRANCH:
          data.branch = profile.id
          break
      }
    }

    const userId = isCreate ? 0 : defaultData.id
    submitUser(userId, data)
      .then(() => {
        toast('User data is submitted', { type: 'success' })
        setIsOpen(false)
        setLastUpdatedAt(Date.now())
        onAfterSubmit()
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
        userId: defaultData.id,
        field: key,
      },
    }
    openAuditLog(options)
  }

  return (
    <Modal
      button={<Button>Create User</Button>}
      title={isCreate ? 'Create New User' : 'Update User'}
      titleOkay="Save"
      loading={loading}
      isOpen={isOpen}
      lastUpdatedAt={lastUpdatedAt}
      onOpen={onCreateUser}
      onClose={onCloseUserModal}
      onOk={onSubmit}
      init={initAccountTypeChange}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {Object.keys(inputStates).map((key, index) => {
          const input = inputStates[key]
          if (!input.visible) return null
          return (
            <div className="input md:w-80" key={index}>
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
    </Modal>
  )
}
