import { PencilAltIcon, SearchIcon, TrashIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { deleteTemplate, getConditions } from 'services/apis/conditions'
import svgLoading from 'stories/assets/loading.svg'
import { Button, IconButton, Input2 } from 'stories/components'
import { confirm } from 'utils'

import { TemplateDetails } from './details'

export function Templates() {
  const [query, setQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [conditions, setConditions] = useState<Array<any>>([])
  const [templates, setTemplates] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    setIsLoading(true)
    getConditions()
      .then(({ data, templates }) => {
        setTotal(templates.length)
        setConditions(data)
        setTemplates(templates)
      })
      .finally(() => setIsLoading(false))
  }

  if (isEditing)
    return (
      <TemplateDetails
        lastUpdatedAt={lastUpdatedAt}
        conditions={conditions}
        templates={templates}
        defaults={selectedIndex == -1 ? null : templates[selectedIndex]}
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
    const { id, no } = templates[index]
    const result = await confirm(
      <div className="text-gray-400 mb-4 text-[18px]">
        Do you want to remove this template?
        <br />
        <span className="text-gray-600">Template No: {no}</span>
      </div>,
    )
    if (!result) return

    setIsLoading(true)
    deleteTemplate(id)
      .then(refresh)
      .catch(() => setIsLoading(false))
  }

  return (
    <div className="Templates-container">
      <h2 className="text-2xl font-bold flex items-center mb-3">
        Templates
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
              className="w-96"
              onChange={(value) => setQuery(value)}
            />
          </div>
          <p className="ml-5">- {total} templates</p>
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
                Name
              </th>
              <th scope="col" className="">
                Conditions
              </th>
              <th scope="col" className="">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {templates.map((template, index) => {
              if (query && !template.name.toLowerCase().includes(query.toLowerCase())) return null
              return (
                <tr
                  className="bg-white hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                  key={`${index}`}
                >
                  <th scope="row" className="pl-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {template.no}
                  </th>
                  <td>{template.name}</td>
                  <td>{template.conditions.length}</td>
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
