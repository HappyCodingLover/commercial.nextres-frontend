import { CheckIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useTitle } from 'utils/pageTitle'

const renderFeature = (title: string) => {
  return (
    <div className="features-container flex border-b pb-4">
      <div className="text-green-600">
        <CheckIcon className="w-6 h-6"></CheckIcon>
      </div>
      <div className="ml-2">{title}</div>
    </div>
  )
}

const features = [
  [
    'Fannie Mae 3.2/3.4 upload',
    'Sign Application with DocMagic',
    'Pull Credit Score with Universal Credit',
    'Multiple Documents Generation',
    'Pricing Playground with Finresi',
  ],
  [
    'Useful Conditions Management',
    'Interact with Bytepro Application',
    'Task Managements',
    'Email Notifications of Loan Progress',
  ],
]

export function Pricing() {
  useTitle(`Pricing - ${process.env.REACT_APP_COMPANY}`)

  const [plan, setPlan] = useState(1)

  return (
    <div className="Pricing-container">
      <div className="px-5 pb-12 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">Pricing</div>
        <div className="rounded bg-gradient-to-b from-blue-100 p-4 md:p-8 mt-2">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <div className="mt-4">
                <div className="flex rounded-t bg-white p-1 w-fit">
                  <div
                    className={`w-32 cursor-pointer text-center p-2 rounded-t ${
                      plan === 1 ? 'bg-sky-500 text-white' : 'hover:bg-slate-100'
                    }`}
                    onClick={() => setPlan(1)}
                  >
                    Monthly
                  </div>
                  <div
                    className={`w-32 cursor-pointer text-center p-2 rounded-t ${
                      plan === 2 ? 'bg-sky-500 text-white' : 'hover:bg-slate-100'
                    }`}
                    onClick={() => setPlan(2)}
                  >
                    Yearly
                  </div>
                </div>
              </div>
              <div className="mt-4 text-[24px] md:text-[30px] font-black mt-3 text-shade-blue">
                Everything you need for
                <span className="ml-2 text-sky-600 text-[28px] md:text-[36px]">
                  {plan === 1 ? '$99 a month' : '$1,000 a year'}
                </span>
              </div>
              <div className="text-[20px] mt-2 text-gray-600 mb-4">
                Includes every feature we offer plus unlimited documents generation
              </div>
            </div>
            <div>
              <button className="px-4 py-3 border border-shade-blue text-[18px] hover:bg-white hover:text-shade-blue text-white bg-shade-blue rounded">
                Get started today
              </button>
            </div>
          </div>
          <div className="border-b mt-8"></div>
          <div className="mt-8 grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="text-sky-700">EVERYTHING YOU NEED</div>
              <div className="mt-1 text-[20px] md:text-[26px] font-black mt-3">All-in-one Platform</div>
              <div className="mt-2 text-gray-500">
                At Nextres, LLC, we understand that the real estate market never sleeps so you and your clients need
                answers fast. That’s why we have a no-nonsense online loan application system, approvals as soon as the
                same day, and the support you need all day, every day.
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              {features[0].map((item, index) => {
                return (
                  <div className="my-2" key={index}>
                    {renderFeature(item)}
                  </div>
                )
              })}
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              {features[1].map((item, index) => {
                return (
                  <div className="my-2" key={index}>
                    {renderFeature(item)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
