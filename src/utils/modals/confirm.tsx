import { useEffect, useState } from 'react'
import { confirmable, createConfirmation, ReactConfirmProps } from 'react-confirm'
import { ConfirmModal } from 'stories/components'

const ConfirmDialog = ({ show, proceed, confirmation, options }: ReactConfirmProps | any) => {
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  useEffect(() => {
    setLastUpdatedAt(Date.now())
  }, [show])

  return (
    <ConfirmModal
      isOpen={show}
      onOk={() => proceed(true as any)}
      onCancel={() => proceed(false as any)}
      lastUpdatedAt={lastUpdatedAt}
      content={confirmation}
      options={options}
    />
  )
}

const confirmDlg = confirmable(ConfirmDialog)

const createConfirm = createConfirmation(confirmDlg)

export const confirm = (content: string | JSX.Element, options: Record<string, any> = {}) =>
  createConfirm({ confirmation: content, options })
