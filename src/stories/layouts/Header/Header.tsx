import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { logout } from 'actions'
import { ReactComponent as LogoBlue } from 'assets/logo-blue.svg'
import cloneDeep from 'clone-deep'
import { Permissions } from 'config'
import { usePermissions } from 'hooks/usePermissions'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface menuType {
  label: String
  visible: Boolean | undefined
  href: any
}

type tpNavigation = {
  [key: string]: any
}

let draftNavigations: tpNavigation = {
  about: { name: 'About Us', href: '/about_us', visible: true },
  investors: { name: 'Investors', href: '/investors', visible: true },
  how_it_works: { name: 'How it works', href: '/how_it_works', visible: true },
  where_we_lend: { name: 'Where we lend', href: '/where_we_lend', visible: true },
  pricing: { name: 'Pricing', href: '/pricing', visible: true },
  // faqs: { name: 'FAQs', href: '/faqs', visible: true },
  contacts: { name: 'Contact Us', href: '/contacts', visible: true },
  register: {
    name: 'Become a Broker',
    href: '/register',
    visible: true,
    className: 'bg-shade-blue rounded text-white hover:bg-white',
  },
  login: { name: 'Login', href: '/login', visible: true, className: 'bg-shade-blue rounded text-white hover:bg-white' },
  pipeline: { name: 'Pipeline', href: '/pipeline', visible: false },
  guideline: { name: 'Guidelines', href: '/guidelines', visible: false },
  document: { name: 'Documents', href: '/documents', visible: false },
  bridgequal: {
    name: 'BridgeQual&#8482;',
    href: '/loan_process/overview/new',
    visible: false,
    className: 'bg-shade-blue rounded text-white hover:bg-white',
  },
}

export function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [menus, setMenus] = useState<menuType[]>([])
  const [navigations, setNavigations] = useState({ ...draftNavigations })
  const auth = useSelector((state: any) => state.auth)
  const location = useLocation()
  const navigate = useNavigate()
  const activeMenu = (to: String) => {
    if (location.pathname === to) {
      return 'shadow'
    }
    return ''
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/home')
  }

  useEffect(() => {
    setShowMenu(false)
    const draft = cloneDeep(navigations)
    if (auth.isAuthenticated) {
      draft.about.visible = false
      draft.investors.visible = false
      draft.how_it_works.visible = false
      draft.where_we_lend.visible = false
      draft.pricing.visible = false
      // draft.faqs.visible = false
      draft.contacts.visible = false
      draft.register.visible = false
      draft.login.visible = false
      draft.pipeline.visible = true
      draft.guideline.visible = true
      draft.document.visible = true
      draft.bridgequal.visible = true
    } else {
      draft.about.visible = true
      draft.investors.visible = true
      draft.how_it_works.visible = true
      draft.where_we_lend.visible = true
      draft.pricing.visible = true
      // draft.faqs.visible = true
      draft.contacts.visible = true
      draft.register.visible = true
      draft.login.visible = true
      draft.pipeline.visible = false
      draft.guideline.visible = false
      draft.document.visible = false
      draft.bridgequal.visible = false
    }
    setNavigations(draft)
  }, [auth])

  const { data: permissionData, hasPermission } = usePermissions()

  useEffect(() => {
    if (!permissionData) return
    let draftMenus: menuType[] = [
      {
        label: 'Manage Accounts',
        href: '/registrations',
        visible: hasPermission(Permissions.MANAGE_ACCOUNTS as keyof Permissions),
      },
      {
        label: 'Edit My Profile',
        href: '/edit_profile',
        visible: true,
      },
      {
        label: 'divider',
        href: '#',
        visible: true,
      },
      {
        label: 'Vendors',
        href: '/vendors/creditReports',
        visible: hasPermission(Permissions.MANAGE_VENDORS as keyof Permissions),
      },
      {
        label: 'Conditions & Templates',
        href: '/condition_template/conditions',
        visible: hasPermission(Permissions.MANAGE_CONDITIONS_TEMPLATES as keyof Permissions),
      },
      // {
      //   label: 'Defaults',
      //   href: '/default',
      //   visible: hasPermission(Permissions.MANAGE_DEFAULTS as keyof Permissions),
      // },
      {
        label: 'Admin Tools',
        href: '/admin_tool/permissions',
        visible: hasPermission(Permissions.MANAGE_ADMIN_TOOLS as keyof Permissions),
      },
      {
        label: 'User Activity',
        href: '/user_activity',
        visible: hasPermission(Permissions.MANAGE_USER_ACTIVITY as keyof Permissions),
      },
      {
        label: 'divider',
        href: '#',
        visible: true,
      },
    ]
    setMenus(draftMenus)
  }, [permissionData])

  return (
    <Popover>
      <div className="max-w-screen-2xl m-auto relative py-4 px-2 bg-white">
        <nav className="relative flex items-center justify-between" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/home">
                <span className="sr-only">nextres</span>
                <LogoBlue />
              </Link>
              <div className="mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden flex-wrap items-center md:flex md:ml-10 md:pr-4 md:space-x-8">
            {Object.keys(navigations).map((key, index) => {
              const item: any = navigations[key]
              if (item.visible) {
                return (
                  <Link
                    key={`nav-${index}`}
                    to={item.href}
                    className={`hover:shadow font-bold px-3 py-2 my-2 text-gray-600 hover:text-gray-900 ${activeMenu(
                      item.href,
                    )} ${item.className} `}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.name }} />
                  </Link>
                )
              }
            })}
            {auth.isAuthenticated && [
              <div className="flex header-profile-name text-gray-600" key={0}>
                <UserIcon className="w-5 h-5"></UserIcon>
                <span className="font-normal ml-1 text-[15px]">{auth.profile.name}</span>
              </div>,
              <div
                key={1}
                className="relative p-2 space-y-1.5 hover:bg-gray-600 hover:cursor-pointer rounded shadow"
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
              >
                <span className={`block rounded w-8 h-1 bg-gray-${showMenu ? 100 : 600}`}></span>
                <span className={`block rounded w-8 h-1 bg-gray-${showMenu ? 100 : 600}`}></span>
                <span className={`block rounded w-8 h-1 bg-gray-${showMenu ? 100 : 600}`}></span>
                {showMenu && (
                  <div className="absolute p-5 bg-gray-600 w-72 rounded right-0 space-y-4 z-10">
                    {menus.map((item, index) => {
                      if (item.visible) {
                        if (item.label === 'divider') {
                          return <div key={`menu-${index}`} className="block rounded h-px bg-gray-400"></div>
                        }
                        return (
                          <div
                            className="text-white font-medium pl-1 hover:underline"
                            key={`menu-${index}`}
                            onClick={() => navigate(item.href)}
                          >
                            {item.label}
                          </div>
                        )
                      }
                    })}
                    <div className="text-white font-medium hover:underline pl-1" onClick={handleLogout}>
                      Sign Out
                    </div>
                  </div>
                )}
              </div>,
            ]}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <LogoBlue />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Close main menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.keys(navigations).map((key, index) => {
                const item: any = navigations[key]
                if (item.visible) {
                  return (
                    <Link
                      key={index}
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium text-gray-600 font-bold hover:text-gray-900 hover:bg-gray-50 ${activeMenu(
                        item.href,
                      )}`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: item.name }} />
                    </Link>
                  )
                }
              })}
              {auth.isAuthenticated && (
                <div>
                  <div className="block rounded h-px bg-gray-100"></div>
                  {menus.map(
                    (item, index) =>
                      item.visible &&
                      (item.label === 'divider' ? (
                        <div className="block rounded h-px bg-gray-100" key={index}></div>
                      ) : (
                        <Link
                          key={`trans-menu-${index}`}
                          to={item.href}
                          className={`block px-3 py-2 rounded-md text-base font-medium text-gray-600 font-bold hover:text-gray-900 hover:bg-gray-50 ${activeMenu(
                            item.href,
                          )}`}
                        >
                          {item.label}
                        </Link>
                      )),
                  )}
                  <div
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 font-bold hover:text-gray-900 hover:bg-gray-50"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
