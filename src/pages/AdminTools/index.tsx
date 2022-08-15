import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'utils/pageTitle'
import { PermissionGate } from 'utils/PermissionGate'

import { Permissions } from './Permissions'

type menuType = {
  [key: string]: string //fix this
}

const leftMenuItems: menuType = {
  permissions: 'Permissions',
  loanSettings: 'Loan Settings',
  deletedLoans: 'Deleted Loans',
  deletedTasks: 'Deleted Tasks',
  deletedNotes: 'Deleted Notes',
  secondaryMarketing: 'Secondary Marketing',
}

export function AdminTools() {
  useTitle(`Admin Tools - ${process.env.REACT_APP_COMPANY}`)

  const navigate = useNavigate()
  const [selectedMenu, setSelectedMenu] = useState('')

  const setMenu = (menuItem: string) => {
    setSelectedMenu(menuItem)
    navigate(`/admin_tool/${menuItem}`)
  }

  const renderFragment = useMemo(() => {
    switch (selectedMenu) {
      case 'permissions':
        return (
          <PermissionGate permission={'MANAGE_PERMISSIONS'}>
            <Permissions />
          </PermissionGate>
        )
      default: {
        return <div>Comming Soon...</div>
      }
    }
  }, [selectedMenu])

  useEffect(() => {
    setMenu(Object.keys(leftMenuItems)[0])
  }, [])

  return (
    <div className="admin-tools-container py-6">
      <div className="admin-tools-wrapper max-w-screen-2xl m-auto grid grid-cols-12 gap-6 px-2">
        <div className="sidebar-left col-span-12 md:col-span-3 shrink-0 bg-white shadow1 rounded">
          <ul className="sidebar-items flex flex-col p-4 pb-20">
            {Object.keys(leftMenuItems).map((item: string, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setMenu(item)
                  }}
                  className="border-b py-2"
                >
                  <p
                    className={`hover:underline cursor-pointer ${
                      selectedMenu === item ? 'border px-4 py-1 bg-zinc-100' : 'py-1'
                    }`}
                  >
                    {index + 1}. {leftMenuItems[item as keyof typeof leftMenuItems]}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="content-right col-span-12 md:col-span-9 bg-white p-4 rounded shadow1">{renderFragment}</div>
      </div>
    </div>
  )
}
