import { ClockIcon } from '@heroicons/react/outline'
import { LayoutLoading } from 'components/LayoutLoading'
import { useState } from 'react'
import { getLoanHistory } from 'services'
import { Modal } from 'stories/components'
import { formatTime } from 'utils'

export const History = ({ loanNumber }: { loanNumber: number }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState([])
  const [init, setInit] = useState(false)

  const onOpenModal = async () => {
    setInit(true)
    setIsOpen(true)
    const _history = await getLoanHistory()
    setHistory(_history)
    setInit(false)
  }

  return (
    <Modal
      button={
        <div className="fixed right-0 bottom-0 z-20">
          <button className="p-3 rounded-r-none rounded-b-none bg-shade-blue text-white border hover:bg-white border-shade-blue hover:text-shade-blue rounded flex items-center gap-2 border-r-0 border-b-0">
            <ClockIcon className="w-5 h-5" /> History
          </button>
        </div>
      }
      title={`Work History Loan Number: ${loanNumber}`}
      titleOkay=""
      titleCancel="Close"
      isOpen={isOpen}
      init={init}
      onOpen={onOpenModal}
    >
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <LayoutLoading show={init}></LayoutLoading>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {history.map((item: any, index) => (
              <tr key={`history-${index}`}>
                <td className="px-6 py-2">{index + 1}</td>
                <td className="px-6 py-2">{item.email}</td>
                <td className="px-6 py-2">{item.action}</td>
                <td className="px-6 py-2">{formatTime(new Date(item.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
