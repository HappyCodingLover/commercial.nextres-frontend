import './style.scss'

import { UpdatePermission } from 'components/Modals/UpdatePermission'
import { API_GET_ALL_PERMISSIONS } from 'config'
import { usePermissions } from 'hooks/usePermissions'
import { useEffect, useState } from 'react'
import Api from 'services/api'
import svgLoading from 'stories/assets/loading.svg'
import { Table } from 'stories/components/Table/Table'

export function Permissions() {
  const [accessControlData, setAccessControlData] = useState<{ columns: any[]; data: any[] }>({
    columns: [],
    data: [],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState({
    roleName: '',
    permissionName: '',
    roleId: '',
    permissionId: '',
    isOpen: false,
    hasPermission: 0,
  })

  const { refetch: refetchPermissions } = usePermissions()
  const requestPermissionsAPI = () => {
    setIsLoading(true)

    setAccessControlData({
      columns: [],
      data: [],
    })

    Api.get(API_GET_ALL_PERMISSIONS)
      .then((result) => {
        const roles: [] = result?.roles?.map((x: { id: string; roleName: any }) => {
          return {
            Header: x.roleName,
            accessor: x.roleName,
            Cell: (data: any) => {
              return (
                <div
                  onClick={() => {
                    setSelectedPermission({
                      roleName: x.roleName,
                      permissionName: data.row.cells[0].value,
                      roleId: data.row.original[x.roleName].roleId,
                      permissionId: data.row.original[x.roleName].permissionId,
                      isOpen: true,
                      hasPermission: data.row.values[x.roleName].hasPermission,
                    })
                  }}
                >
                  {data.row.values[x.roleName].hasPermission === -1 ? (
                    <div className="restricted">Restricted</div>
                  ) : (
                    <div className="allowed">Allowed</div>
                  )}
                </div>
              )
            },
          }
        })

        const permissionsData = result?.permissions?.map((x: { id: string; permissionName: any }) => {
          return {
            permission: x.permissionName,
            ...result?.roles_permissions.reduce((roles: any, item: any) => {
              const hasPermission = item?.permissions.find(
                (permission: any) => permission.permissionName === x.permissionName,
              )
              roles[item.roleName] = {
                roleId: item.id,
                permissionName: x.permissionName,
                permissionId: x.id,
                hasPermission: hasPermission ? 1 : -1,
              }
              return roles
            }, {}),
          }
        })

        setAccessControlData({
          ...accessControlData,
          columns: [
            {
              Header: 'Permission',
              accessor: 'permission',
            },
            ...roles,
          ],
          data: permissionsData,
        })
      })
      .finally(() => {
        setIsLoading(false)
        refetchPermissions().then(() => {})
      })
  }

  useEffect(() => {
    requestPermissionsAPI()
  }, [])

  return (
    <div className="permissions-container">
      <h2 className="text-2xl font-bold">
        Manage Permissions
        {isLoading && (
          <span className="ml-3">
            <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
          </span>
        )}
      </h2>
      <div className="mt-4">
        <Table columns={accessControlData.columns} data={accessControlData.data} />
      </div>
      <UpdatePermission
        roleName={selectedPermission.roleName}
        permissionName={selectedPermission.permissionName}
        roleId={selectedPermission.roleId}
        permissionId={selectedPermission.permissionId}
        isOpen={selectedPermission.isOpen}
        onClose={() => {
          setSelectedPermission({
            roleName: '',
            permissionName: '',
            roleId: '',
            permissionId: '',
            isOpen: false,
            hasPermission: 0,
          })
        }}
        onOk={() => {
          requestPermissionsAPI()
        }}
        hasPermission={selectedPermission.hasPermission}
      />
    </div>
  )
}
