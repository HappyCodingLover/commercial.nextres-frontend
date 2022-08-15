import type { UserActivityType } from 'config'
import { useEffect, useState } from 'react'
import { confirmable, createConfirmation, ReactConfirmProps } from 'react-confirm'
import { Modal } from 'stories/components'
import { formatTime } from 'utils/convertor'

interface UserActivityProps extends ReactConfirmProps {
  options: {
    type: UserActivityType
    action: string
    createdAt: string
    detail: Record<string, any>
  }
}

const UserActivityDialog = ({ show, proceed, options }: UserActivityProps) => {
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())

  useEffect(() => {
    setLastUpdatedAt(Date.now())
  }, [show])

  const { detail } = options
  if (!detail) return null

  return (
    <Modal
      button={<span></span>}
      title={'User Activity Details'}
      titleOkay=""
      init={false}
      isOpen={show}
      lastUpdatedAt={lastUpdatedAt}
      onClose={() => proceed(false as any)}
      childLevel={1}
    >
      <div className="w-96">
        <div className="info-container text-sm ml-3">
          <div className="mb-3">
            <span>Action:</span>
            <span className="ml-3 font-bold">{options.action}</span>
          </div>
          <div className="mb-3">
            <span>Date:</span>
            <span className="ml-3 font-bold">{formatTime(options.createdAt)}</span>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Field
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {Object.keys(detail).map((key, index) => (
                <tr key={index}>
                  <td scope="row" className="px-6 py-2">
                    {index + 1}
                  </td>
                  <td className="px-6 py-2">{key}</td>
                  <td className="px-6 py-2">{String(detail[key])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}

const userActivityDlg = confirmable(UserActivityDialog)

const createActivityDlg = createConfirmation(userActivityDlg)

export const openUserActivityDlg = (options: Record<string, any> = {}) => createActivityDlg({ options })
