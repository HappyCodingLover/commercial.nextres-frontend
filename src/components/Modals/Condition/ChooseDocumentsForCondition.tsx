import { ArrowDownIcon, ArrowUpIcon, EyeIcon, SearchIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { useEffect, useMemo, useState } from 'react'
import { Checkbox, Input2, Modal } from 'stories/components'

export const ChooseDocumentsForCondition = ({
  documents: allDocuments = [],
  conditionNo = 0,
  isOpen = false,
  onAfterSubmit = () => {},
  onClose = () => {},
  onOpenDocument = () => {},
}: any) => {
  const [documents, setDocuments] = useState<Array<any>>([])
  const [query, setQuery] = useState('')
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const [sortKey, setSortKey] = useState('')
  const [sortDir, setSortDir] = useState(true)

  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({})

  const sortedDocuments = useMemo(() => {
    let docs = documents.sort((a: any, b: any) => {
      const aV = a[sortKey]
      const bV = b[sortKey]
      if (aV > bV) return 1
      if (aV == bV) return 0
      return -1
    })
    if (sortDir) docs = docs.reverse()
    return docs
  }, [documents, sortDir, sortKey])

  useEffect(() => {
    setLastUpdatedAt(Date.now())
  }, [isOpen])

  useEffect(() => {
    if (conditionNo == 0) return

    const data = allDocuments.sort((a: any, b: any) => {
      if (a.conditionNo > b.conditionNo) return 1
      else if (a.conditionNo == b.conditionNo) return 0
      return -1
    })
    setDocuments(data)

    const newSelDocs: Record<string, boolean> = {}
    allDocuments.forEach((doc: any) => {
      if (doc.conditionNo == conditionNo) newSelDocs[doc.key] = true
    })
    setSelectedDocs(newSelDocs)
  }, [conditionNo])

  const onChangeCheck = (key: string, value: boolean) => {
    const newData = cloneDeep(selectedDocs)
    if (value) newData[key] = value
    else delete newData[key]
    setSelectedDocs(newData)
  }

  const onSubmit = async () => {
    const docKeys = Object.keys(selectedDocs)
    onAfterSubmit(docKeys)
  }

  const onSort = (key: string) => {
    setSortKey(key)
    if (sortKey == key) setSortDir(!sortDir)
  }

  const renderHeader = (key: string, title: any) => {
    return (
      <div className="flex font-normal items-center">
        {title}

        <span>
          {sortKey == key && (sortDir ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />)}
        </span>
      </div>
    )
  }

  return (
    <Modal
      title={`Choose Documents For Condition NO: ${conditionNo}`}
      titleOkay="Confirm"
      isOpen={isOpen}
      lastUpdatedAt={lastUpdatedAt}
      onClose={onClose}
      onOk={onSubmit}
    >
      <div className="w-144">
        <Input2
          type="search"
          title="Search"
          hasIcon
          icon={<SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
          className="mb-3"
          value={query}
          onChange={(value) => setQuery(value)}
        />

        <table className="text-left text-sm">
          <thead>
            <tr className="border-b cursor-pointer">
              <th className=""></th>
              <th className="w-[20%]" onClick={() => onSort('conditionNo')}>
                {renderHeader('conditionNo', 'Current Condition')}
              </th>
              <th onClick={() => onSort('name')}>{renderHeader('name', 'Name')}</th>
              <th onClick={() => onSort('status')}>{renderHeader('status', 'Status')}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedDocuments.map((document) => {
              let className = ''
              if (
                query &&
                !`${document.conditionNo} ${document.name} ${document.status}`
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
                className = 'hidden'

              return (
                <tr key={`tr-${document.key}`} className={`border-b ${className}`}>
                  <td className="py-2">
                    <Checkbox
                      title=""
                      id={document.key}
                      checked={Object.keys(selectedDocs).includes(document.key)}
                      onChange={(value) => onChangeCheck(document.key, value)}
                    />
                  </td>
                  <td>{document.conditionNo || 'Other'}</td>
                  <td>{document.name}</td>
                  <td>{document.status}</td>
                  <td>
                    <button
                      className="text-gray-700 p-1 hover-shadow1 cursor-pointer"
                      onClick={() => onOpenDocument(document)}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
