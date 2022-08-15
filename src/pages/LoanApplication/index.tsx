// import { LayoutLoading } from 'components/LayoutLoading'
import { useEffect, useMemo, useState } from 'react'
import svgLoading from 'stories/assets/loading.svg'

import { AssetInformation } from './AssetInformation'
import { BorrowerInformation } from './BorrowerInformation'
import { Employment } from './Employment'
import { PropertyInformation } from './PropertyInformation'
import { TrackRecord } from './TrackRecord'

type menuType = {
  [key: string]: string //fix this
}

const leftMenuItems1: menuType = {
  property: 'Property Information',
  borrower: 'Borrower Information',
  asset: 'Asset Information',
  // employment: 'Employment',
  track: 'Track Record',
  hmda: 'Declarations & HMDA',
  credit: 'Credit Score',
  sign: 'Sign Application',
}

const leftMenuItems2: menuType = {
  borrower2: 'Borrower Information',
  // employment: 'Employment',
  hmda2: 'Declarations & HMDA',
  credit2: 'Credit Score',
  sign2: 'Sign Application',
}

export function LoanApplication() {
  const [loading, setLoading] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('')
  const [menuIndex, setMenuIndex] = useState(0)

  const setMenu = (index: number, menuItem: string) => {
    setMenuIndex(index)
    setSelectedMenu(menuItem)
  }

  const renderFragment = useMemo(() => {
    if (menuIndex == 0) {
      switch (selectedMenu) {
        case 'property':
          return <PropertyInformation setLoading={setLoading} />

        case 'borrower':
          return <BorrowerInformation borrowerSeperator="borrower" setLoading={setLoading} />

        case 'asset':
          return <AssetInformation />

        case 'employment':
          return <Employment />

        case 'track':
          return <TrackRecord />

        default: {
          return <div>Comming Soon...</div>
        }
      }
    } else if (menuIndex == 1) {
      switch (selectedMenu) {
        case 'borrower2':
          return <BorrowerInformation borrowerSeperator="coBorrower" setLoading={setLoading} />

        default: {
          return <div>Comming Soon...</div>
        }
      }
    }
  }, [menuIndex, selectedMenu])

  useEffect(() => {
    setMenu(0, Object.keys(leftMenuItems1)[0])
  }, [])

  const renderMenu = (mIndex: number, menus: Record<string, string>) => {
    return (
      <ul className="sidebar-items flex flex-col p-4 pb-10">
        {Object.keys(menus).map((item: string, index) => {
          const isActive = mIndex == menuIndex && selectedMenu === item
          return (
            <li
              key={index}
              onClick={() => {
                setMenu(mIndex, item)
              }}
              className="border-b py-2"
            >
              <p className={`hover:underline cursor-pointer ${isActive ? 'border px-4 py-1 bg-zinc-100' : 'py-1'}`}>
                {index + 1}. {menus[item as keyof typeof menus]}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

  // const onSubmit = () => {}

  return (
    <div className="LoanApplication-container px-2">
      <div className="max-w-screen-2xl m-auto grid grid-cols-12 md:gap-6">
        <div className="sidebar-left col-span-12 md:col-span-3 shrink-0 bg-white shadow1 rounded mb-4">
          {renderMenu(0, leftMenuItems1)}

          <p className="border-b px-4 py-1 font-bold">Co-Borrower</p>
          {renderMenu(1, leftMenuItems2)}
        </div>
        <div className="relative h-fit content-right col-span-12 md:col-span-9 bg-white p-4 rounded shadow1 mb-4">
          {/* <LayoutLoading show={loading}></LayoutLoading> */}
          <h2 className="text-2xl font-bold flex items-center mb-3">
            {menuIndex == 0 ? (
              leftMenuItems1[selectedMenu]
            ) : (
              <span>
                {leftMenuItems2[selectedMenu]}
                <span className="text-[16px] ml-2">(CoBorrower)</span>
              </span>
            )}
            <span className="text-base ml-3">
              {loading && <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />}
            </span>
          </h2>
          {renderFragment}

          {/* <div className="block text-center">
            <Button onClick={onSubmit} className="px-10">
              Save Information
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
