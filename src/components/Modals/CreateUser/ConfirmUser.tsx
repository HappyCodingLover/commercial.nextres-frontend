import { useEffect, useState } from 'react'
import { confirmable, createConfirmation, ReactConfirmProps } from 'react-confirm'

import { ChildConfirmModal } from './ChildConfirmModal'

const ConfirmDialog = ({ show, proceed, options }: ReactConfirmProps | any) => {
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  useEffect(() => {
    setLastUpdatedAt(Date.now())
  }, [show])

  return (
    <ChildConfirmModal
      isOpen={show}
      onOk={(value) => proceed(value)}
      onCancel={() => proceed(false as any)}
      lastUpdatedAt={lastUpdatedAt}
      options={options}
    />
  )
}

const confirmDlg = confirmable(ConfirmDialog)

const createConfirm = createConfirmation(confirmDlg)

export const confirmChildUsers = (options: Record<string, any> = {}) => createConfirm({ options })
