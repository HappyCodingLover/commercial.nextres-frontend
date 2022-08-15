import { DownloadIcon } from '@heroicons/react/outline'
import { downloadS3Documents } from 'services'
import { useTitle } from 'utils/pageTitle'

const documents = ['Nextres and Fresh Start DSCR', 'One Time Fix to Rent', 'Fix and Flip']

export function Guidelines() {
  useTitle(`Guidelines - ${process.env.REACT_APP_COMPANY}`)
  const downloadDocument = async (name: string) => {
    const res = await downloadS3Documents(`Guidelines/${name}.pdf`)
    var windowReference: any = window.open()
    windowReference.location = res.url
  }
  return (
    <div className="Guidelines-container">
      <div className="px-5 pb-12 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">Guidelines</div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mt-4">
            <div className="text-slate-500">Mortgagee Clause for CPL</div>
            <div className="text-blue-900 font-bold">
              Nextres, LLC ISAOA/ATIMA 12 Penns Trail Suite 138 Newtown, PA 18940
            </div>
          </div>
          <div className="mt-4">
            <div className="text-slate-500">Mortgagee Clause for Insurance</div>
            <div className="text-blue-900 font-bold">
              Nextres, LLC ISAOA/ATIMA 12 Penns Trail Suite 138 Newtown, PA 18940
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="table-container mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table-auto w-full text-sm text-left text-gray-900 dark:text-gray-400 pl-6">
              <thead className="text-xs text-gray-700 uppercase bg-sky-100">
                <tr>
                  <th scope="col" className="pl-6 py-4">
                    No
                  </th>
                  <th scope="col" className="pl-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="pl-6 py-4">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="text-[16px]">
                {documents.map((item, index) => {
                  return (
                    <tr key={index} className={`${index % 2 === 1 && 'bg-sky-50'}`}>
                      <td className="pl-6 py-3">{index + 1}</td>
                      <td className="pl-6 py-3">{item}</td>
                      <td className="pl-10 py-3">
                        <DownloadIcon
                          className="h-5 w-8 hover:cursor-pointer hover-shadow1 rounded"
                          onClick={() => downloadDocument(item)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
