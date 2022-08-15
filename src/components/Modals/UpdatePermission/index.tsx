import { API_SET_PERMISSION_TO_ROLE } from 'config'
import { useEffect, useState } from 'react'
import Api from 'services/api'
import { Modal, Select } from 'stories/components'

interface IUpdatePermission {
  roleName: string
  permissionName: string
  roleId: string
  permissionId: string
  isOpen: boolean
  hasPermission: number
  onClose: () => void
  onOk: () => void
}
export const UpdatePermission = ({
  roleName,
  permissionName,
  roleId,
  permissionId,
  isOpen,
  onClose,
  onOk,
  hasPermission,
}: IUpdatePermission) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSelectedOption(() => {
      return hasPermission === -1 ? 'Restricted' : 'Allowed'
    })
  }, [roleId, permissionId])
  return (
    <Modal
      title="Update Permission"
      titleOkay="Update"
      lastUpdatedAt={Date.now()}
      loading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onOk={() => {
        setIsLoading(true)
        switch (selectedOption) {
          case 'Allowed': {
            Api.post(API_SET_PERMISSION_TO_ROLE, {
              roleId,
              permissionIds: [permissionId],
            })
              .then(() => {
                onClose()
                onOk()
              })
              .finally(() => {
                setIsLoading(false)
              })
            break
          }
          case 'Restricted': {
            Api.delete(API_SET_PERMISSION_TO_ROLE, {
              roleId,
              permissionIds: [permissionId],
            })
              .then(() => {
                onClose()
                onOk()
              })
              .finally(() => {
                setIsLoading(false)
              })
            break
          }
        }
      }}
    >
      <div className="text-gray-700">
        <div className="mb-2">
          <span className="text-sm">Account Type:</span>
          <span className="text-sm font-semibold ml-2">{roleName}</span>
        </div>
        <div className="mb-3">
          <span className="text-sm">Permission Name:</span>
          <span className="text-sm font-semibold ml-2">{permissionName}</span>
        </div>
        <div className="w-96">
          <Select
            id={'permission-select'}
            options={['Allowed', 'Restricted']}
            value={selectedOption}
            disabled={roleName === 'ADMIN'}
            onChange={(e) => {
              setSelectedOption(e)
            }}
          />
        </div>
      </div>
    </Modal>
  )
}
