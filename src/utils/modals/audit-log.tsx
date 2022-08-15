import { useEffect, useState } from 'react'
import { confirmable, createConfirmation, ReactConfirmProps } from 'react-confirm'
import { getBorrowerLogs, getLoanLogs } from 'services'
import { getUserLogs } from 'services/apis/user'
import { Modal } from 'stories/components'
import { formatTime } from 'utils/convertor'

interface UserAuditLogProps extends ReactConfirmProps {
  options: {
    table: string
    field: string
    keys: any
  }
}

const AuditLogDialog = ({ show, proceed, options }: UserAuditLogProps) => {
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const [auditLog, setAuditLog] = useState<Array<any>>([])
  const [fetchingData, setFetchingData] = useState(true)

  useEffect(() => {
    setLastUpdatedAt(Date.now())
  }, [show])

  useEffect(() => {
    const { table, keys } = options
    if (table === 'User') {
      getUserLogs(keys.userId, keys.field).then((data) => {
        setAuditLog(data)
        setFetchingData(false)
      })
    }
    if (table === 'Loan') {
      getLoanLogs(keys.field).then((data) => {
        setAuditLog(data)
        setFetchingData(false)
      })
    }
    if (table === 'Borrower') {
      getBorrowerLogs(keys.borrowerSeperator, keys.field).then((data) => {
        setAuditLog(data)
        setFetchingData(false)
      })
    }
  }, [options])

  return (
    <Modal
      button={<span></span>}
      title={'Audit Log Data Details'}
      titleOkay=""
      init={fetchingData}
      isOpen={show}
      lastUpdatedAt={lastUpdatedAt}
      onClose={() => proceed(false as any)}
      childLevel={1}
    >
      <>
        <div className="info-container text-sm ml-3">
          <div className="mb-3">
            <span>Table:</span>
            <span className="ml-3 font-bold">{options.table}</span>
          </div>
          <div className="mb-4">
            <span>Field:</span>
            <span className="ml-3 font-bold">{options.field}</span>
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
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  New Value
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {auditLog.map((log, index) => (
                <tr key={index}>
                  <td scope="row" className="px-6 py-2">
                    {index + 1}
                  </td>
                  <td className="px-6 py-2">{formatTime(log.time)}</td>
                  <td className="px-6 py-2">{log.email}</td>
                  <td className="px-6 py-2">{String(log.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </Modal>
  )
}

const auditLogDlg = confirmable(AuditLogDialog)

const createAuditLogDlg = createConfirmation(auditLogDlg)

export const openAuditLog = (options: Record<string, any> = {}) => createAuditLogDlg({ options })
