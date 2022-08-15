import './index.scss'

import map from 'assets/map.png'
import { useTitle } from 'utils/pageTitle'

const tableBodyData = [
  {
    state: 'AL',
    license: 'Yes if Individal, No if Borrower is LLC or Corp',
    type: 'Mortgage Broker Required for Individual Ownership',
  },
  { state: 'AK', license: 'No', type: 'N/A' },
  {
    state: 'AZ',
    license: 'Yes, unless Exempt (“Institutional Investors” for loans of more than $250,000)',
    type: 'Mortgage Broker Comercial Liscense',
  },
  { state: 'CA', license: 'Yes', type: 'Real Estate Broker' },
  { state: 'CO', license: 'No', type: 'N/A' },
  { state: 'CT', license: 'No', type: 'N/A' },
  { state: 'DE', license: 'No', type: 'N/A' },
  { state: 'DC', license: 'No', type: 'N/A' },
  {
    state: 'FL',
    license: 'Yes, if individal, No if Borrower is LLC or Corp',
    type: 'Mortgage Broker',
  },
  {
    state: 'GA',
    license: 'Yes if Individual, No if Borrower is LLC or Corp',
    type: 'Mortgage Broker',
  },
  { state: 'HI', license: 'No', type: 'N/A' },
  { state: 'ID', license: 'Yes', type: 'Mortgage Broker' },
  { state: 'IL', license: 'Yes', type: 'Mortgage Broker' },
  { state: 'IN', license: 'No', type: 'N/A' },
  {
    state: 'IA',
    license: 'Yes (exmption for first three commerical mortgages secured by 1 to 4 family)',
    type: 'Mortgage Broker',
  },
  {
    state: 'KS',
    license: 'Yes if Individual, No if Borrower is LLC or Corp',
    type: 'Mortgage Broker',
  },
  { state: 'KY', license: 'No', type: 'N/A' },
  { state: 'LA', license: 'No', type: 'N/A' },
  { state: 'ME', license: 'No', type: 'N/A' },
  { state: 'MD', license: 'No', type: 'N/A' },
  { state: 'MA', license: 'No', type: 'N/A' },
  { state: 'MI', license: 'Yes', type: 'Real Estate Broker' },
  { state: 'MN', license: 'Yes', type: 'Real Estate Broker' },
  { state: 'MS', license: 'No', type: 'N/A' },
  { state: 'MO', license: 'No', type: 'N/A' },
  { state: 'MT', license: 'Yes', type: 'Mortgage Broker' },
  { state: 'NE', license: 'Yes', type: 'Mortgage Banker' },
  { state: 'NV', license: 'Yes', type: 'Mortgage Banker' },
  { state: 'NH', license: 'No', type: 'N/A' },
  { state: 'NJ', license: 'Yes', type: 'Real Estate Broker' },
  { state: 'NM', license: 'No', type: 'N/A' },
  { state: 'NY', license: 'Yes', type: 'Real Estate Broker' },
  { state: 'NC', license: 'Yes', type: 'Mortgage Broker' },
  { state: 'ND', license: 'Yes', type: 'Money Broker License' },
  { state: 'OH', license: 'No', type: 'N/A' },
  { state: 'OK', license: 'No', type: 'N/A' },
  { state: 'OR', license: 'Yes', type: 'Mortgage Broker' },
  { state: 'PA', license: 'No', type: 'N/A' },
  { state: 'RI', license: 'No', type: 'N/A' },
  { state: 'SC', license: 'No', type: 'N/A' },
  { state: 'SD', license: 'Yes', type: 'Mortgage Lender' },
  { state: 'TN', license: 'No', type: 'N/A' },
  { state: 'TX', license: 'No', type: 'N/A' },
  { state: 'UT', license: 'Yes', type: 'Mortgage Broker' },
  { state: 'VT', license: 'Yes', type: 'Mortgage Borker' },
  { state: 'VA', license: 'No', type: 'N/A' },
  { state: 'WA', license: 'No', type: 'N/A' },
  { state: 'WV', license: 'No', type: 'N/A' },
  { state: 'WI', license: 'No', type: 'N/A' },
  { state: 'WY', license: 'No', type: 'N/A' },
]

export function WhereWeLend() {
  useTitle(`Where we Lend - ${process.env.REACT_APP_COMPANY}`)
  return (
    <div className="WhereWeLend-container">
      <div className="px-5 pb-12 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">Nextres, LLC Lending Areas</div>
        <div className="mt-3">
          <div className="text-[20px]">
            <div className="mt-5 text-[20px] md:text-[26px] font-black mt-3 text-shade-blue">
              We are available in the following states.
            </div>
          </div>
        </div>
        <div className="p-4 md:p-10 rounded-lg bg-sky-50 mt-8 shadow">
          <div className="flex flex-wrap items-center justify-space gap-10">
            <img src={map} alt="map-img" />
            <div className="explain md:ml-20">
              <div className="text-[18px] text-shade-blue font-black text-right flex items-center">
                <span className="rounded-full mr-2 p-2 flex w-6 h-6 lending"></span>
                Currently Lending
              </div>
              <div className="text-[18px] text-shade-blue mt-8 font-black text-right flex items-center">
                <span className="rounded-full mr-2 p-2 flex w-6 h-6 coming"></span>
                Coming Soon
              </div>
            </div>
          </div>
        </div>
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue mt-10">Currently Lending Coming Soon</div>
        <div className="table-container mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-auto w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
            <thead className="text-xs text-gray-700 uppercase bg-sky-100">
              <tr>
                <th scope="col" className="pl-6 py-4">
                  State
                </th>
                <th scope="col" className="pl-6 py-4">
                  License Required to Broker Commercial?
                </th>
                <th scope="col" className="pl-6 py-4">
                  Type of License Required
                </th>
              </tr>
            </thead>
            <tbody className="">
              {tableBodyData.map((rowData: any, index: number) => (
                <tr key={index} className={`${index % 2 === 1 && 'bg-sky-50'}`}>
                  <td className="pl-6 py-3">{rowData.state}</td>
                  <td className="pl-6 py-3">{rowData.license}</td>
                  <td className="pl-6 py-3">{rowData.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
