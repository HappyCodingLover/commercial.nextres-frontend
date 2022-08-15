import { DownloadIcon } from '@heroicons/react/outline'
import { thousandSeperator } from 'utils/convertor'

interface InputProps {
  status: string
  amount: number
  loans: number
  color: string
  percent: number
  download?: boolean
}

export function StatusDetail({ status, amount, loans, color, percent, download = false }: InputProps) {
  return (
    <div className="StatusDetail-container w-80 my-1">
      <div
        className={`bg-${color}-100 rounded-l-lg border-l-4 border-${color}-500 text-${color}-700 px-2 md:px-4 py-2 md:py-3`}
        role="alert"
      >
        <p className="flex items-center justify-between">
          {status}{' '}
          {download && (
            <span className="ml-4 hover-shadow1 px-2 rounded hover:cursor-pointer">
              <DownloadIcon className="h-5 w-5" />
            </span>
          )}
        </p>
        <p className="font-bold text-[20px] my-1">${thousandSeperator(amount)}</p>
        <p className="flex justify-between">
          {thousandSeperator(loans)} Loans
          <span className="font-semibold">{percent}%</span>
        </p>
      </div>
    </div>
  )
}
