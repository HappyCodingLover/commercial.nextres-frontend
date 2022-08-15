import { useEffect, useMemo, useState } from 'react'

import { Home } from './Home'

type menuType = {
  [key: string]: string //fix this
}

const leftMenuItems: menuType = {
  home: 'Home',
  creditScorePull: 'Credit Score Pull',
  orderAppraisals: 'Order Appraisals',
  documentStorage: 'Document Storage',
  closingCalendar: 'Closing Calendar',
  documentGenie: 'Document Genie',
  trustLedger: 'Trust Ledger',
  servicingInformation: 'Servicing Information',
  adminDocuments: 'Admin Documents',
  postCloding: 'Post Closing',
}

export function MyPortal() {
  const [selectedMenu, setSelectedMenu] = useState('')

  const setMenu = (menuItem: string) => {
    setSelectedMenu(menuItem)
  }

  const renderFragment = useMemo(() => {
    switch (selectedMenu) {
      case 'home':
        return <Home />
      default: {
        return <div>Comming Soon...</div>
      }
    }
  }, [selectedMenu])

  useEffect(() => {
    setMenu(Object.keys(leftMenuItems)[0])
  }, [])

  return (
    <div className="vendors-container py-6">
      <div className="vendors-wrapper max-w-screen-2xl m-auto grid grid-cols-12 gap-6 px-2">
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
