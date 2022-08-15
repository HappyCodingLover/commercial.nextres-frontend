import { setUserPermissions } from 'actions'
import { API_USER_PERMISSIONS } from 'config'
import { useCallback, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import Api from 'services/api'

export const usePermissions = () => {
  const auth = useSelector((state: any) => state.auth)

  const { data, isLoading, error, refetch } = useQuery(
    'permissions',
    async () => {
      return Api.get(API_USER_PERMISSIONS)
    },
    {
      enabled: auth.isAuthenticated,
      refetchOnWindowFocus: true,
      retryDelay: 45000,
    },
  )

  useEffect(() => {
    data && setUserPermissions(data)
  }, [data])

  const hasPermission = useCallback(
    (permissionLevel: keyof Permissions) => {
      if (data === undefined) return undefined
      const matched = data?.role?.permissions?.find(
        (permission: { permissionName: string }) => permission.permissionName === permissionLevel,
      )
      if (matched === undefined) return false
      return true
    },
    [data],
  )
  return { data, isLoading, error, refetch, hasPermission }
}
