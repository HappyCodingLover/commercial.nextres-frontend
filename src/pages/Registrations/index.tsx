import { ArrowDownIcon, ArrowUpIcon, DownloadIcon, KeyIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { LayoutLoading } from 'components/LayoutLoading'
import { ChangePassword, CreateUser } from 'components/Modals'
import { accountTypes } from 'components/Modals/CreateUser/config'
import { confirmChildUsers } from 'components/Modals/CreateUser/ConfirmUser'
import { AccountType, UserStatusFilters } from 'config'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteUser, filterUsers, getChildUsers, updateChildUserTypes, updateUserStatus } from 'services/apis/user'
import svgLoading from 'stories/assets/loading.svg'
import svgSearch from 'stories/assets/search.svg'
import { IconButton, Input, Pagination, Select, Toggle } from 'stories/components'
import { confirm } from 'utils'
import { useTitle } from 'utils/pageTitle'
import { PermissionGate } from 'utils/PermissionGate'

import { Tree } from './Tree'

const itemCountPerPage = 10

export function Registrations() {
  useTitle(`Accounts - ${process.env.REACT_APP_COMPANY}`)

  const [filters, setFilters] = useState<Record<string, string>>({
    query: '',
    status: 'active',
    accountType: '0',
    orderBy: 'companyName',
    orderDir: '1',
  })
  const [filterQuery, setFilterQuery] = useState('')

  const [users, setUsers] = useState<Array<any>>([])
  const [total, setTotal] = useState(0)
  const [action, setAction] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpenFromType, setIsOpenFromType] = useState(false)
  const [isOpenChangePwd, setIsOpenChangePwd] = useState(false)
  const [pageNum, setPageNum] = useState(0)
  const [isGetUsersOnce, setIsGetUsersOnce] = useState(false)
  const auth = useSelector((state: any) => state.auth)

  const downloadLink = useMemo(() => {
    return `${process.env.REACT_APP_API_URL}/home/downloadUser/${auth.profile.id}/${auth.token}`
  }, [auth.token])

  const filterUsersData = async (filters: any) => {
    setAction('getUsers')
    const { data, total } = await filterUsers({
      query: filters.query,
      status: filters.status,
      accountType: filters.accountType == '0' ? undefined : filters.accountType,
      count: itemCountPerPage,
      skip: pageNum * itemCountPerPage,
      orderBy: filters.orderBy,
      orderDir: filters.orderDir,
    })
    setUsers(data)
    setTotal(total)
    setAction('')
  }

  useEffect(() => {
    if (!isGetUsersOnce) return
    const timeOutId = setTimeout(() => action == '' && filterUsersData(filters), 700)
    return () => clearTimeout(timeOutId)
  }, [filterQuery])

  useEffect(() => {
    filterUsersData(filters).then(() => {
      setIsGetUsersOnce(true)
    })
  }, [pageNum])

  const onChangeFilter = (key: 'query' | 'status' | 'accountType' | 'orderBy' | 'orderDir', value: string) => {
    const newFilters = Object.assign({}, filters)
    newFilters[key] = value
    setFilters(newFilters)
    if (key === 'query') setFilterQuery(value)
    else filterUsersData(newFilters)
  }

  const onEdit = (index: number) => {
    setIsOpen(true)
    setSelectedIndex(index)
    setLastUpdatedAt(Date.now())
  }

  const onChangePassword = (index: number) => {
    setIsOpenChangePwd(true)
    setSelectedIndex(index)
    setLastUpdatedAt(Date.now())
  }

  const onUserSubmit = () => {
    filterUsersData(filters)
  }

  const onCloseUserModal = () => {
    setSelectedIndex(-1)
    setIsOpen(false)
    setIsOpenChangePwd(false)
    setLastUpdatedAt(Date.now())
    setIsOpenFromType(false)
  }

  const onTrash = async (index: number) => {
    const user = users[index]
    const isRemove = await confirm(`Are you sure you want to delete "${user.name}"?`)
    if (!isRemove) return
    const { id: userId, accountType } = user
    const askingTypes = [
      AccountType.ACCOUNT_EXECUTIVE,
      AccountType.BROKER,
      AccountType.CORRESPONDENT,
      AccountType.BRANCH,
    ]
    if (askingTypes.indexOf(accountType) != -1) {
      const childUsers = await getChildUsers(userId)
      if (childUsers.length) {
        const confirmResult = (await confirmChildUsers({
          isChangedAccountType: true,
          defaultData: user,
          users: childUsers,
        })) as any
        if (confirmResult === false) return
        if (confirmResult != true) {
          await updateChildUserTypes(userId, confirmResult)
        }
      }
    }
    const newUsers = Object.assign([], users)
    newUsers.splice(index, 1)
    setUsers(newUsers)

    setAction('getUsers')
    await deleteUser(userId)
    filterUsersData(filters)
  }

  const onChangeStatus = (index: number, status: boolean) => {
    updateUserStatus(index, status)
  }

  let selectedData = selectedIndex == -1 ? null : users[selectedIndex]

  if (isOpenFromType && selectedData) {
    const { id, accountType, accountExecutive, broker } = selectedData
    switch (accountType) {
      case AccountType.ACCOUNT_EXECUTIVE:
        selectedData = {
          accountType: AccountType.BROKER,
          accountExecutive: id,
        }
        break
      case AccountType.BROKER:
      case AccountType.CORRESPONDENT:
        selectedData = {
          accountType: AccountType.BRANCH,
          accountExecutive,
          broker: id,
        }
        break
      case AccountType.BRANCH:
        selectedData = {
          accountType: AccountType.LOAN_PROCESSOR,
          accountExecutive,
          broker,
          branch: id,
        }
        break
    }
  }

  const onPageNavigate = (num: number) => {
    setPageNum(num)
  }

  const renderHeader = (title: string, sortable: boolean = false, key: string, sortOrder: number = 1) => {
    if (!sortable)
      return (
        <th scope="col" className="py-3" key={title}>
          {title}
        </th>
      )

    const onSort = () => {
      if (sortOrder == 0) sortOrder = -1
      const newFilters = Object.assign({}, filters)
      newFilters['orderBy'] = key
      newFilters['orderDir'] = `${0 - sortOrder}`
      setFilters(newFilters)
      filterUsersData(newFilters)
    }

    return (
      <th scope="col" className="py-3" key={title}>
        <button className="flex uppercase bg-transparent font-bold" onClick={() => onSort()}>
          {title}
          {sortOrder !== 0 ? (
            sortOrder == 1 ? (
              <ArrowUpIcon className="w-3 h-3 ml-2" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 ml-2" />
            )
          ) : (
            <div className="w-3 h-3 ml-2" />
          )}
        </button>
      </th>
    )
  }

  const sortableHeaders = [
    { title: 'Company Name', key: 'companyName' },
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Phone Number', key: 'phone' },
    { title: 'NMLS #', key: 'companyNmls' },
    { title: 'User Type', key: 'accountType' },
  ]

  return (
    <div className="registration-container py-6 px-2">
      <div className="shadow1 max-w-screen-2xl m-auto bg-white rounded p-3 md:p-7 sm:text-center lg:text-left w-full">
        <div className="flex flex-wrap justify-between mb-5">
          <h1 className="text-2xl font-bold flex items-center mb-3">
            <span>Manage Accounts</span>{' '}
            <span className="text-base ml-3">
              {action === 'getUsers' ? (
                <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
              ) : (
                `(${total})`
              )}
            </span>
          </h1>
          <CreateUser
            isOpen={isOpen}
            defaultData={selectedData}
            lastUpdatedAt={lastUpdatedAt}
            onAfterSubmit={onUserSubmit}
            onClose={onCloseUserModal}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-2">
          <Input
            type="search"
            title="Search Accounts"
            hasIcon
            icon={svgSearch}
            value={filters.query}
            onChange={(value) => onChangeFilter('query', value)}
          />
          <Select
            id="search-status"
            title="Status"
            options={UserStatusFilters}
            value={filters.status}
            onChange={(value) => onChangeFilter('status', value)}
          />
          <Select
            id="search-user-type"
            title="User Type"
            options={accountTypes}
            value={filters.accountType}
            hasDefaultOption
            defaultOptionText="All"
            onChange={(value) => onChangeFilter('accountType', value)}
          />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <LayoutLoading show={action === 'getUsers'} />

          <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-6 py-3">
                  No
                </th>
                {sortableHeaders.map(({ title, key }) =>
                  renderHeader(title, true, key, filters.orderBy == key ? parseInt(filters.orderDir) : 0),
                )}
                <th scope="col" className="py-3">
                  Executive
                </th>
                <th scope="col" className="">
                  Actions
                </th>
                <th scope="col" className="">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user, index) => {
                const { id } = user
                return (
                  <tr
                    className="bg-white hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                    key={`${index}`}
                  >
                    <th scope="row" className="pl-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {pageNum * itemCountPerPage + index + 1}
                    </th>
                    <td>{user.companyName}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.companyNmls}</td>
                    <td>{(accountTypes as any)[user.accountType]}</td>
                    <td>{user.executive}</td>
                    <td className="">
                      <IconButton icon={PencilAltIcon} onClick={() => onEdit(index)} />

                      <IconButton icon={KeyIcon} onClick={() => onChangePassword(index)} />

                      <IconButton icon={TrashIcon} onClick={() => onTrash(index)} />
                    </td>
                    <td>
                      <Toggle
                        id={`status-${id}`}
                        key={`status-${id}`}
                        value={user.isActive}
                        onChange={(checked) => onChangeStatus(id, checked)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-3 mb-3">
            <Pagination
              totalCount={total}
              itemCountPerPage={itemCountPerPage}
              onNavigate={onPageNavigate}
              pageNum={pageNum}
            />
            <a className="my-2 mr-5 px-2 py-1 rounded hover-shadow1" href={downloadLink} target="_blank">
              <DownloadIcon className="h-5 w-5 text-blue-500" />
            </a>
          </div>

          {isOpenChangePwd && selectedData && (
            <ChangePassword
              userId={users[selectedIndex].id}
              title={users[selectedIndex].email}
              isOpen={isOpenChangePwd}
              lastUpdatedAt={lastUpdatedAt}
              onClose={onCloseUserModal}
            />
          )}
        </div>
      </div>
      <PermissionGate permission={'ACCOUNT_SYSTEM_VIEW'} hidden={true}>
        <div className="tree">
          <div className="shadow1 max-w-screen-2xl m-auto bg-white rounded p-3 md:p-7 mt-8 sm:text-center lg:text-left w-full">
            <Tree />
          </div>
        </div>
      </PermissionGate>
    </div>
  )
}
