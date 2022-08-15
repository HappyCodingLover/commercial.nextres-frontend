// import type { Color } from 'stories/types'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useMemo } from 'react'

interface PaginationProps {
  /**
   * Total Count
   */
  totalCount: number
  /**
   * Item count per page
   */
  itemCountPerPage?: number
  /**
   * Data
   */
  onNavigate?: (num: number) => void
  /**
   * Page Number
   */
  pageNum?: number
  /**
   * Maximum page count
   */
  maxPageCount?: number
}

/**
 * Primary UI component for user interaction
 */
// @ts-ignore
export const Pagination = ({
  totalCount = 0,
  itemCountPerPage = 10,
  onNavigate = () => {},
  pageNum = 0,
  maxPageCount = 7,
}: PaginationProps) => {
  const pageCount = useMemo(() => {
    const needPlus = totalCount % itemCountPerPage != 0
    return Math.floor(totalCount / itemCountPerPage) + (needPlus ? 1 : 0)
  }, [totalCount, itemCountPerPage])

  const renderPageElement = (
    content: string | number | JSX.Element,
    isActive: boolean,
    isDisabled: boolean,
    num: number,
  ) => {
    return (
      <li key={`${num}`}>
        <button
          className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
            isDisabled
              ? 'bg-gray-100'
              : 'dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:text-gray-700'
          } ${isActive ? 'z-10 text-blue-600 bg-blue-50' : ''}`}
          onClick={() => !isDisabled && !isActive && onNavigate(num)}
          disabled={isDisabled}
        >
          {content}
        </button>
      </li>
    )
  }

  const isShowDots = useMemo(() => pageCount >= maxPageCount, [pageCount])
  const from = useMemo(() => itemCountPerPage * pageNum + 1, [pageNum])
  const to = useMemo(() => Math.min(itemCountPerPage * (pageNum + 1), totalCount), [pageNum, totalCount])

  const renderDotPagination = () => {
    const pageNums = [0]
    // let max = 0
    const maxCnt = maxPageCount - 2
    let from = Math.floor(Math.min(pageNum, pageCount - maxCnt / 2) - maxCnt / 2) + 1
    if (from < 1) from = 1
    let to = Math.min(from + maxCnt, pageCount - 1)
    from = Math.max(1, to - maxCnt)
    for (let i = from; i < to; i++) {
      if (i <= 0 || i >= pageCount - 1) continue
      pageNums.push(i)
    }
    pageNums.push(pageCount - 1)

    return (
      <>
        {pageNums.map((num, index) => {
          if (
            0 < index &&
            index < pageNums.length - 1 &&
            (num != pageNums[index - 1] + 1 || num != pageNums[index + 1] - 1)
          )
            return renderPageElement('...', num == pageNum, false, num)
          return renderPageElement(num + 1, num == pageNum, false, num)
        })}
      </>
    )
  }

  return (
    <div className="w-full p-3 flex flex-wrap justify-end place-items-center text-gray-900">
      <p className="text-[15px] mr-4">
        Showing {from} to {to} of {totalCount} results
      </p>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => pageNum > 0 && onNavigate(pageNum - 1)}
            disabled={pageNum == 0}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </li>
        {isShowDots
          ? renderDotPagination()
          : Array.from(Array(pageCount).keys()).map((num: number) =>
              renderPageElement(num + 1, num == pageNum, false, num),
            )}
        <li>
          <button
            className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => pageNum < pageCount - 1 && onNavigate(pageNum + 1)}
            disabled={pageNum == pageCount - 1}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </div>
  )
}
