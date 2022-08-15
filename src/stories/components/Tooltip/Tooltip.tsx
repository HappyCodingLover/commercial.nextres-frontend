import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'

export const Tooltip = ({ message }: { message: string }) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="text-gray-500 cursor-pointer">
        <QuestionMarkCircleIcon className="w-[14px] h-[14px]" />
      </span>
      {show && (
        <div className="absolute bottom-0 flex flex-col items-center mb-6 flex w-72">
          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
            {message}
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
        </div>
      )}
    </div>
  )
}
