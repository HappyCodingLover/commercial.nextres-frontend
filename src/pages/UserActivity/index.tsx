import { accountTypes } from 'components/Modals/CreateUser/config'
import { UserActivityType } from 'config'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { filterUserActivities, filterUserActivity } from 'services/apis/user'
import svgLoading from 'stories/assets/loading.svg'
import { Button, Input2, Pagination } from 'stories/components'
import { openUserActivityDlg } from 'utils'
import { formatDate, formatTime } from 'utils/convertor'
import { useTitle } from 'utils/pageTitle'

const itemCountPerPage = 10

export function UserActivity() {
  useTitle(`User Activity - ${process.env.REACT_APP_COMPANY}`)

  const [filters, setFilters] = useState<Record<string, string>>({
    startDate: '',
    endDate: '',
    email: '',
  })

  const [users, setUsers] = useState<Array<any>>([])
  const [activeUser, setActiveUser] = useState<any>(null)
  const [activities, setActivities] = useState<Array<any>>([])
  const [total, setTotal] = useState(0)
  const [action, setAction] = useState('')
  const [pageNum, setPageNum] = useState(0)
  const [lastDays, setLastDays] = useState(0)

  useEffect(() => {
    onLastDays(7)
  }, [])

  const filterUsersData = async (filters: any) => {
    setAction('getUsers')
    const data = await filterUserActivity({
      startDate: filters.startDate,
      endDate: filters.endDate,
      email: filters.email,
    })
    setUsers(data)
    setAction('')
    setActivities([])
    if (data.length) onSelectUser(data[0])
    else setActiveUser(null)
  }

  const onChangeFilter = (key: 'startDate' | 'endDate' | 'email', value: string) => {
    const newFilters = Object.assign({}, filters)
    newFilters[key] = value
    setFilters(newFilters)
    if (key !== 'email') {
      setLastDays(0)
      filterUsersData(newFilters)
    }
  }

  const onLastDays = (days: number) => {
    const newFilters = Object.assign({}, filters)
    let today = moment().add(1, 'days').format('YYYY-MM-DD')
    newFilters.startDate = moment().add(-days, 'days').format('YYYY-MM-DD')
    newFilters.endDate = today

    filterUsersData(newFilters)
    setFilters(newFilters)
    setLastDays(days)
  }

  const onGetResult = () => {
    filterUsersData(filters)
  }

  const onSelectUser = async (user: any) => {
    setAction('getUsersActivities')
    setActiveUser(user)
    const { data, total } = await filterUserActivities(user.id, {
      startDate: filters.startDate,
      endDate: filters.endDate,
      count: itemCountPerPage,
      skip: 0,
    })
    setActivities(data)
    setTotal(total)
    setPageNum(0)
    setAction('')
  }

  const onSelectActivity = async (activity: any) => {
    if (
      [UserActivityType.LOGIN, UserActivityType.FORGET_PASSWORD, UserActivityType.RESET_PASSWORD].indexOf(
        activity.type,
      ) !== -1
    )
      return
    openUserActivityDlg(activity)
  }

  const onPageNavigate = async (num: number) => {
    if (!activeUser) return
    setPageNum(num)

    setAction('getUsersActivities')
    const { data, total } = await filterUserActivities(activeUser.id, {
      startDate: filters.startDate,
      endDate: filters.endDate,
      count: itemCountPerPage,
      skip: num * itemCountPerPage,
    })
    setActivities(data)
    setTotal(total)
    setAction('')
  }

  return (
    <div className="registration-container py-6 px-2">
      <div className="shadow1 max-w-screen-2xl m-auto bg-white rounded p-3 md:p-5 sm:text-center lg:text-left w-full">
        <div className="flex flex-wrap justify-between mb-1">
          <h1 className="text-xl font-bold flex items-center">
            <span>User Activity Filter Options</span>{' '}
          </h1>
        </div>
        <div className="block rounded h-px bg-gray-300 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          <Input2
            type="date"
            title="Start Date"
            value={filters.startDate}
            onChange={(value) => onChangeFilter('startDate', value)}
          />
          <Input2
            type="date"
            title="End Date"
            value={filters.endDate}
            onChange={(value) => onChangeFilter('endDate', value)}
          />
          <Button size="sm" full={false} outline={lastDays !== 7} onClick={() => onLastDays(7)}>
            Last 7 days
          </Button>
          <Button size="sm" full={false} outline={lastDays !== 30} onClick={() => onLastDays(30)}>
            Last 30 days
          </Button>
          <Input2
            type="email"
            title="Search by email"
            value={filters.email}
            onChange={(value) => onChangeFilter('email', value)}
          />
          <Button size="sm" onClick={onGetResult}>
            Get Result
          </Button>
        </div>
      </div>

      <div className="max-w-screen-2xl m-auto flex justify-between lg:flex-row flex-col mt-4">
        <div className="shadow1 mb-4 lg:w-[30%] w-full bg-white rounded p-3 md:p-4 sm:text-center lg:text-left mr-3">
          <div className="flex flex-wrap justify-between mb-1">
            <h1 className="text-xl font-bold flex items-center">
              <span>Users</span>
            </h1>
          </div>
          <div className="block rounded h-px bg-gray-300 mb-3"></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-6 py-3">
                    No
                  </th>
                  <th scope="col" className="py-3">
                    Email
                  </th>
                  <th scope="col" className="">
                    Type
                  </th>
                  <th scope="col" className="">
                    Activities
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {users.map((user, index) => {
                  const isActive = activeUser && activeUser.id == user.id
                  return (
                    <tr
                      className={`hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer ${
                        isActive ? 'bg-gray-200' : 'bg-white'
                      }`}
                      key={`${index}`}
                      onClick={() => onSelectUser(user)}
                    >
                      <th scope="row" className="pl-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {index + 1}
                      </th>
                      <td>{user.email}</td>
                      <td>{(accountTypes as any)[user.accountType]}</td>
                      <td className="text-center">{user.count}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="shadow1 mb-4 max-w-screen-2xl bg-white rounded p-3 md:p-4 sm:text-center lg:text-left flex-auto">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex flex-wrap mb-1">
              <h1 className="text-xl font-bold flex items-center mr-3">
                <span>Activity of</span>
              </h1>
              {activeUser && (
                <h1 className="text-xl font-bold flex items-center text-shade-blue mr-3">
                  <span>{activeUser.email}</span>
                </h1>
              )}
              <h1 className="text-md flex items-center mt-1">
                <span>
                  ({formatDate(filters.startDate)} - {formatDate(filters.endDate)})
                </span>
              </h1>
            </div>
            {action === 'getUsersActivities' ? (
              <div className="absolute left-0 top-0 right-0 bottom-0 bg-white/50 place-items-center flex">
                <div className="flex flex-col w-full place-items-center">
                  <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
                </div>
              </div>
            ) : null}

            <div className="block rounded h-px bg-gray-300 mb-3"></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="pl-6 py-3">
                      No
                    </th>
                    <th scope="col" className="py-3">
                      Loan Number
                    </th>
                    <th scope="col" className="">
                      Action
                    </th>
                    <th scope="col" className="">
                      Date
                    </th>
                    <th scope="col" className=""></th>
                  </tr>
                </thead>
                <tbody className="">
                  {activities.map((activity, index) => {
                    return (
                      <tr
                        className="bg-white hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                        key={`${pageNum * itemCountPerPage + index}`}
                      >
                        <th
                          scope="row"
                          className="pl-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {pageNum * itemCountPerPage + index + 1}
                        </th>
                        <td>{activity.loanNumber}</td>
                        <td>{activity.action}</td>
                        <td>{formatTime(activity.createdAt)}</td>
                        <td>
                          {Object.keys(activity.detail).length > 0 ? (
                            <span
                              className="cursor-pointer hover:underline hover:font-black"
                              onClick={() => onSelectActivity(activity)}
                            >
                              Details
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end items-center mt-3 mb-3">
              <Pagination
                totalCount={total}
                itemCountPerPage={itemCountPerPage}
                onNavigate={onPageNavigate}
                pageNum={pageNum}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
