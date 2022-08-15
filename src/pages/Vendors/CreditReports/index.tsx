import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { vendorCreditReport } from 'services'
import svgLoading from 'stories/assets/loading.svg'
import { Input2Read } from 'stories/components'

export function CreditReports() {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    name: '',
    password: '',
  })

  useEffect(() => {
    setIsLoading(true)
    vendorCreditReport()
      .then((data) => setValues(data))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="CreditReports-container">
      <h2 className="text-2xl font-bold flex items-center">
        Credit Report USCIS
        {isLoading && (
          <span className="ml-3">
            <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin" />
          </span>
        )}
      </h2>
      <div className="mt-5 shadow p-2 w-fit">
        <div className="md:w-96">
          <Input2Read title="USCIS USER NAME" value={values.name} />
        </div>
        <div className="md:w-96 mt-3">
          <Input2Read title="USCIS PASSWORD" value={values.password} />
        </div>
      </div>
      <div className="mt-5">
        <div
          className="bg-gray-100 flex items-center border border-gray-400 text-gray-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="mr-2">
            <ExclamationCircleIcon className="w-4 h-4" />
          </span>
          <span className="block sm:inline">
            If you want to change the username and password, then please contact the developer.
          </span>
        </div>
      </div>
    </div>
  )
}
