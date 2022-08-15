import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'

import { ChildUsers } from './ChildUsers'

type Function = () => void

interface ChildConfirmModalProps {
  /**
   * Okay button handler
   */
  onOk?: (arg0: any) => void
  /**
   * Cancel button handler
   */
  onCancel?: Function
  /**
   * Is Open
   */
  isOpen?: boolean
  lastUpdatedAt: number
  options?: Record<string, any>
}

/**
 * Primary UI component for user interaction
 */
export const ChildConfirmModal = ({
  onOk = () => {},
  onCancel = () => {},
  isOpen: parentIsOpen = false,
  lastUpdatedAt,
  options = {},
}: ChildConfirmModalProps) => {
  const { isChangedAccountType } = options
  const [enabled, setEnabled] = useState(!isChangedAccountType)
  const [showModal, setShowModal] = useState(false)
  const [values, setValues] = useState<any>(isChangedAccountType ? null : true)

  useEffect(() => {
    setShowModal(parentIsOpen)
  }, [lastUpdatedAt])

  if (!showModal) return null

  const onUpdateValue = (values: Record<string, any>, isValid: boolean) => {
    setEnabled(isValid)
    setValues(values)
  }

  const onPressOk = () => {
    onOk(values)
  }

  return (
    <>
      <div
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 md:inset-0 h-modal md:h-full justify-center items-center flex"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="overflow-auto max-h-[calc(100vh-2rem)] relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={onCancel}
            >
              <XIcon className="w-5 h-5" />
            </button>
            <div className="p-6 text-center">
              <InformationCircleIcon className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" />
              <ChildUsers
                isChangedAccountType={options.isChangedAccountType}
                defaultData={options.defaultData}
                users={options.users}
                onUpdateValue={onUpdateValue}
              />
              <button
                type="button"
                onClick={onPressOk}
                disabled={!enabled}
                className={`text-white ${
                  !enabled ? 'bg-red-300' : 'bg-red-600 hover:bg-red-800'
                } focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
    </>
  )
}
