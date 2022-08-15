import {
  ArrowCircleRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BookOpenIcon,
  DownloadIcon,
  EyeIcon,
  PencilAltIcon,
  SearchIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { SourceBox } from 'components/DragDrop'
import { PlainInput } from 'components/PlainInput'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Checkbox, Input2, Select } from 'stories/components'
import { formatTime } from 'utils'

import { docCategory, docStatus } from './constants'

export const DocumentsSlide = ({ documents, onUpdate, onOpen, onRemove }: any) => {
  const token = useSelector((state: any) => state.auth.token)
  const [isShowDocuments, setShowDocuments] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  // const [name, setName] = useState('')
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [sortKey, setSortKey] = useState('')
  const [sortDir, setSortDir] = useState(true)

  const sortedDocuments = useMemo(() => {
    let docs = documents
      .filter((doc: any) => {
        if (!searchQuery) return true
        return (
          String(doc.conditionNo).toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })
      .sort((a: any, b: any) => {
        const aV = a[sortKey]
        const bV = b[sortKey]
        if (aV > bV) return 1
        if (aV == bV) return 0
        return -1
      })
    if (sortDir) docs = docs.reverse()
    return docs
  }, [documents, sortDir, sortKey, searchQuery])

  const onUpdateDocument = (key: string, value: string | boolean, documentKey: string) => {
    const index = documents.findIndex((doc: any) => doc.key == documentKey)
    if (index == -1) return
    const newDocs = cloneDeep(documents)

    if (key == 'name') {
      newDocs[index].isEditing = false
      value = value + newDocs[index].name.substr(-4)
    }

    newDocs[index][key] = value

    onUpdate(newDocs, newDocs[index])
  }

  const onShowDocuments = () => {
    setShowDocuments(!isShowDocuments)
  }

  const onSelected = (key: string, value: boolean) => {
    const newData = cloneDeep(selected)
    if (!value) delete newData[key]
    else newData[key] = value
    setSelected(newData)
  }

  const onSelectAll = () => {
    const count = documents.length
    const selCount = Object.keys(selected).length
    let newData = cloneDeep(selected)
    if (count != selCount) documents.forEach((doc: any) => (newData[doc.key] = true))
    else newData = {}
    setSelected(newData)
  }

  const onSort = (key: string) => {
    setSortKey(key)
    if (sortKey == key) setSortDir(!sortDir)
  }

  const onDownload = (type: string) => {
    const baseUrl = process.env.REACT_APP_API_URL
    const params = location.pathname.split('/')
    const loanNumber = params[3]
    let url = `${baseUrl}/loan/downloadSubmissionDocuments/${loanNumber}/${type}?token=${token}`
    if (type == 'selected') url += `&keys=${Object.keys(selected).join(',')}`

    var windowReference: any = window.open()
    windowReference.document.title = 'Downloading Documents...'
    windowReference.location = url
  }

  const renderHeader = (key: string, title: any) => {
    return (
      <div className="flex flex-wrap font-normal items-center">
        <p>{title}</p>

        <span className="ml-2">
          {sortKey == key && (sortDir ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />)}
        </span>
      </div>
    )
  }

  const renderRow = (document: any, index: number) => {
    const clsName = document.status.replace(' ', '')
    return [
      <SourceBox item={document} type="document" key={index}>
        <tr className={`bg-gray-50 ${clsName}`} key={`first-${index}`}>
          <td rowSpan={2} className="px-3">
            <Checkbox
              id={`condition-no-${document.key}`}
              title={document.conditionNo || 'Other'}
              checked={!!selected[document.key]}
              onChange={(value) => onSelected(document.key, value)}
            />
          </td>
          <td colSpan={3}>
            <PlainInput
              value={document.name.substr(0, document.name.length - 4)}
              content={document.name}
              isEditing={document.isEditing}
              onChange={(newName: string) => onUpdateDocument('name', newName, document.key)}
            />
          </td>
          <td rowSpan={2}>
            <div className="grid grid-cols-2">
              <button className="p-1 cursor-pointer" onClick={() => onOpen(document)}>
                <EyeIcon className="w-4 h-4" />
              </button>

              <button className="p-1 cursor-pointer" onClick={() => onOpen(document)}>
                <DownloadIcon className="w-4 h-4" />
              </button>

              <button className="p-1 cursor-pointer" onClick={() => onUpdateDocument('isEditing', true, document.key)}>
                <PencilAltIcon className="w-4 h-4" />
              </button>

              <button className="p-1 cursor-pointer" onClick={() => onRemove(document)}>
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
        <tr className={`border-b ${clsName}`} key={`second-${index}`}>
          <td className="pb-2 px-1">
            <Select
              id={`side-document-status-${document.key}`}
              size={3}
              className="-mb-4 bg-white"
              options={docStatus}
              value={document.status}
              onChange={(value) => onUpdateDocument('status', value, document.key)}
            />
          </td>

          <td className="pb-2 px-1">
            <Select
              id={`side-document-category-${document.key}`}
              size={3}
              className="-mb-4 bg-white"
              options={docCategory}
              value={document.category}
              onChange={(value) => onUpdateDocument('category', value, document.key)}
            />
          </td>

          <td className="pb-2">{formatTime(document.createdAt)}</td>
        </tr>
      </SourceBox>,
    ]
  }

  return (
    <>
      <div className="fixed right-0 top-[50%] z-20">
        <button
          className="p-3 rounded-r-none bg-shade-blue text-white border hover:bg-white border-shade-blue hover:text-shade-blue rounded flex items-center gap-2 border-r-0"
          onClick={onShowDocuments}
        >
          <BookOpenIcon className="w-6 h-6" /> Documents
        </button>
      </div>
      <div
        className={`shadow1 fixed bg-white border rounded-l z-30 right-0 top-[5vh] bottom-0 transition-[right] w-[40rem] h-[90vh] overflow-auto ease-in-out ${
          isShowDocuments ? 'right-0' : '-right-[40rem]'
        }`}
      >
        <div className="w-[40rem] fixed z-20 rounded-t flex justify-between p-3 font-bold text-sm place-items-center items-center text-shade-blue border-b bg-white">
          <p className="text-lg text-gray-800">Documents</p>
          <button className="hover:underline" onClick={() => onDownload('all')}>
            <div className="flex">
              <p className="mr-1 font-bold">All</p> <DownloadIcon className="w-5 h-5" />
            </div>
          </button>

          <button className="hover:underline" onClick={() => onDownload('approved')}>
            <div className="flex">
              <p className="mr-1 font-bold font-bold">Approved</p> <DownloadIcon className="w-5 h-5" />
            </div>
          </button>

          <div className="flex items-center">
            <button
              className="hover:underline mr-4"
              onClick={() => onDownload('selected')}
              disabled={Object.keys(selected).length == 0}
            >
              <div className="flex">
                <p className="mr-1 font-bold">Selected</p> <DownloadIcon className="w-5 h-5" />
              </div>
            </button>
            <Checkbox
              title={`${Object.keys(selected).length}/${documents.length}`}
              id="documentSelected"
              checked={Object.keys(selected).length == documents.length}
              onClick={onSelectAll}
              disabled={documents.length == 0}
            />
          </div>

          <button className="hover:underline" onClick={onShowDocuments}>
            <ArrowCircleRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full pt-14 h-fit overflow-auto relative">
          <div className="w-full p-3">
            <Input2
              type="search"
              title="Search"
              hasIcon
              icon={<SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
            />
          </div>

          <table className="w-full font-normal text-sm text-left text-black">
            <thead className="border-b">
              <tr>
                <th
                  rowSpan={2}
                  className="bg-gray-100 px-3 border-r border-slate-300 cursor-pointer"
                  onClick={() => onSort('conditionNo')}
                >
                  {renderHeader(
                    'conditionNo',
                    <>
                      Condition
                      <br />
                      No
                    </>,
                  )}
                </th>
                <th
                  colSpan={4}
                  className="bg-gray-100 px-2 py-1 border-b border-slate-300 cursor-pointer"
                  onClick={() => onSort('name')}
                >
                  {renderHeader('name', 'Name')}
                </th>
              </tr>
              <tr>
                <th
                  className="bg-gray-100 px-2 py-1 border-r border-slate-300 cursor-pointer"
                  onClick={() => onSort('status')}
                >
                  {renderHeader('status', 'Status')}
                </th>
                <th
                  className="bg-gray-100 px-2 border-r border-slate-300 cursor-pointer"
                  onClick={() => onSort('category')}
                >
                  {renderHeader('category', 'Category')}
                </th>
                <th
                  className="bg-gray-100 px-2 border-r border-slate-300 cursor-pointer"
                  onClick={() => onSort('createdAt')}
                >
                  {renderHeader('createdAt', 'Uploaded Date')}
                </th>
                <th className="bg-gray-100 px-2 font-normal">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-900">
              {sortedDocuments.map((document: any, index: number) => renderRow(document, index))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
