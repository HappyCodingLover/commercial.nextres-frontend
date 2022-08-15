import { useEffect, useState } from 'react'
import { getUserTree } from 'services/apis/user'
import svgLoading from 'stories/assets/loading.svg'
import svgSearch from 'stories/assets/search.svg'
import { Input } from 'stories/components'

import { clearActiveStyle, getSearchResult, setSearchResult } from './getSearchResult'
import style from './style'
const { Treebeard } = require('react-treebeard')
type countState = {
  [key: string]: number //fix this
}

export function Tree() {
  const [total, setTotal] = useState('')
  const [action, setAction] = useState('')
  const [search, setSearch] = useState('')
  const [cursor, setCursor] = useState({ name: '' })
  const [data, setData] = useState({})
  const [count, setCount] = useState<countState>({})
  const [searchResultArray, setSearchResultArray] = useState([])
  const [currentResultIndex, setCurrentResultIndex] = useState(0)

  const getTree = async () => {
    setAction('getTree')
    const res = await getUserTree()
    setData(res.data)
    setCount(res.count)
    setTotal(res.total)
    setAction('')
  }

  useEffect(() => {
    getTree()
  }, [])

  const onToggle = (node: any, toggled: boolean) => {
    clearActiveStyle(data)
    node.active = true
    if (node.children) {
      node.toggled = toggled
    }
    setData(Object.assign({}, data))
    setCursor(node)
  }

  const onBtnClick = (e: any) => {
    let index = 0
    let tempObj: any
    if (e.target.id === 'prev') {
      index = currentResultIndex - 1
      tempObj = setSearchResult(data, searchResultArray, index)
      setData(tempObj.data)
      setCurrentResultIndex(index)
      setCursor(tempObj.cursor)
    }
    if (e.target.id === 'next') {
      index = currentResultIndex + 1
      tempObj = setSearchResult(data, searchResultArray, index)
      setData(tempObj.data)
      setCurrentResultIndex(index)
      setCursor(tempObj.cursor)
    }
  }

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    let term = e.target.value

    let tempObj: any
    let results: any
    let newData: any

    if (term.length > 0) {
      results = getSearchResult(term, data)
    }
    if (results.length > 0) {
      tempObj = setSearchResult(data, results, 0)
      newData = tempObj.data
    } else {
      newData = data
    }

    setSearchResultArray(results)
    setData(newData)
    setCurrentResultIndex(0)
    setCursor(tempObj.cursor)
  }

  return (
    <div className="tree-container">
      <div className="flex flex-wrap justify-between mb-5">
        <h1 className="text-2xl font-bold flex items-center">
          <span>Account System</span>{' '}
          <span className="text-base ml-3">
            {action === 'getTree' ? (
              <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
            ) : (
              `(${total})`
            )}
          </span>
          {action !== 'getTree' && (
            <span
              className="border px-3 py-1 rounded hover:bg-gray-200 ml-5 text-sm font-normal cursor-pointer"
              onClick={getTree}
            >
              Refresh
            </span>
          )}
        </h1>
      </div>
      <div className="flex flex-wrap">
        {Object.keys(count).map((key, index) => {
          return (
            <div className="border py-1 px-2 mb-3 mr-2 text-sm" key={index}>
              <span>{key}:</span>
              <span className="ml-2 font-semibold text-sky-800">{count[key]}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-2">
        <Input type="search" title="Search Accounts" hasIcon icon={svgSearch} value={search} onChange={changeSearch} />
      </div>
      <div className="mb-4">
        {searchResultArray.length > 0 && search.length > 0 ? (
          <div className="flex justify-center items-center">
            <button
              id="prev"
              className="border px-3 py-1 rounded hover:bg-gray-200 cursor-pointer"
              onClick={onBtnClick}
              disabled={currentResultIndex === 0 ? true : false}
            >
              Previous
            </button>
            <div className="flex justify-center ml-3 mr-3">
              {searchResultArray.length > 0 ? currentResultIndex + 1 + '/' + searchResultArray.length : null}
            </div>
            <button
              id="next"
              className="border px-3 py-1 rounded hover:bg-gray-200 cursor-pointer"
              onClick={onBtnClick}
              disabled={
                currentResultIndex === searchResultArray.length - 1 || searchResultArray.length === 0 ? true : false
              }
            >
              Next
            </button>
          </div>
        ) : null}

        {searchResultArray.length === 0 && search ? (
          <div>No results found</div>
        ) : (
          cursor.name.length > 0 && <div className="ml-3">{cursor.name}</div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          overflow: 'auto',
          backgroundColor: '#21252B',
        }}
        className="p-3 rounded"
      >
        <Treebeard data={data} onToggle={onToggle} style={style} />
      </div>
    </div>
  )
}
