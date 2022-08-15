import { PencilAltIcon, SearchIcon, TrashIcon } from '@heroicons/react/outline'
import { accountTypes } from 'components/Modals/CreateUser/config'
import { useEffect, useState } from 'react'
import { deleteTask, getTasks } from 'services/apis/conditions'
import svgLoading from 'stories/assets/loading.svg'
import { Button, IconButton, Input2 } from 'stories/components'
import { confirm } from 'utils'

import { taskPriority, taskSecurity } from '../constant'
import { TaskDetails } from './details'

export function Tasks() {
  const [query, setQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState<Array<any>>([])
  const [isEditing, setIsEditing] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    setIsLoading(true)
    getTasks()
      .then(({ data }) => {
        setTotal(data.length)
        setTasks(data)
      })
      .finally(() => setIsLoading(false))
  }

  if (isEditing)
    return (
      <TaskDetails
        lastUpdatedAt={lastUpdatedAt}
        defaults={selectedIndex == -1 ? null : tasks[selectedIndex]}
        onBack={() => setIsEditing(false)}
        onComplete={refresh}
      />
    )

  const onAdd = () => {
    setLastUpdatedAt(Date.now())
    setSelectedIndex(-1)
    setIsEditing(true)
  }

  const onEdit = (index: number) => {
    setLastUpdatedAt(Date.now())
    setSelectedIndex(index)
    setIsEditing(true)
  }

  const onTrash = async (index: number) => {
    const { id, no } = tasks[index]
    const result = await confirm(
      <div className="text-gray-400 mb-4 text-[18px]">
        Do you want to remove this task?
        <br />
        <span className="text-gray-600">Task No: {no}</span>
      </div>,
    )
    if (!result) return

    setIsLoading(true)
    deleteTask(id)
      .then(refresh)
      .catch(() => setIsLoading(false))
  }

  return (
    <div className="Tasks-container">
      <h2 className="text-2xl font-bold flex items-center mb-3">
        Tasks
        {isLoading && (
          <span className="ml-3">
            <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
          </span>
        )}
      </h2>
      <div className="flex flex-wrap justify-between mb-3">
        <div className="flex items-center flex-wrap">
          <div className="md:w-96 w-72">
            <Input2
              type="search"
              title="Search"
              hasIcon
              icon={<SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              value={query}
              onChange={(value) => setQuery(value)}
            />
          </div>
          <p className="ml-5">- {total} tasks</p>
        </div>
        <div className="w-32">
          <Button full onClick={onAdd}>
            Add
          </Button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="pl-6 py-3">
                No
              </th>
              <th scope="col" className="py-3">
                Description
              </th>
              <th scope="col" className="">
                Security
              </th>
              <th scope="col" className="">
                Priority
              </th>
              <th scope="col" className="">
                Assigned to
              </th>
              <th scope="col" className="">
                Due days
              </th>
              <th scope="col" className="">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {tasks.map((item, index) => {
              if (query && !item.description.toLowerCase().includes(query.toLowerCase())) return null
              return (
                <tr
                  className="bg-white hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                  key={`${index}`}
                >
                  <th scope="row" className="pl-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {item.no}
                  </th>
                  <td>{item.description}</td>
                  <td>{taskSecurity[item.security]}</td>
                  <td>{taskPriority[item.priority]}</td>
                  <td>{accountTypes[item.assignedTo]}</td>
                  <td>{item.dueDays}</td>
                  <td className="">
                    <IconButton icon={PencilAltIcon} onClick={() => onEdit(index)} />

                    <IconButton icon={TrashIcon} onClick={() => onTrash(index)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
