import { usePermissions } from 'hooks/usePermissions'
import svgLoading from 'stories/assets/loading.svg'

export const PermissionGate = (props: any) => {
  const { children, permission, hidden = false } = props
  const { hasPermission } = usePermissions()

  const permissionGranted = hasPermission(permission)
  if (permissionGranted === undefined) {
    if (hidden) return <span></span>
    else {
      return (
        <div className="flex justify-center">
          <div className="p-1 bg-white absolute top-1/3 rounded">
            <img src={svgLoading} className="inline w-10 h-10 m-1 text-white animate-spin" />
          </div>
        </div>
      )
    }
  }
  if (permissionGranted === false) {
    if (hidden) return <span></span>
    else {
      return (
        <div
          className="p-4 mb-4 text-center text-[16px] text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="">Access Forbidden!</span>
        </div>
      )
    }
  }
  return <>{children}</>
}
