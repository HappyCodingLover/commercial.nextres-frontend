import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useTitle } from 'utils/pageTitle'

export const questions = [
  {
    title: 'Is Nextres, LLC a direct lender?',
    text: 'Yes. As a direct lender, we are in total control of our funds and all underwriting is done in house.',
  },
  {
    title: 'Does Nextres, LLC assign an exclusive representative to handle my business?',
    text: 'Yes. Nextres, LLC assigns you a dedicated concierge with the experience and know-how to make funding seamless.',
  },
  {
    title: 'What does Nextres, LLC look for when they are qualifying a borrower?',
    text: 'At Nextres, LLC, we understand that each borrower’s situation is unique. Our biggest motivator for funding is our equity position in the transaction, the borrower’s “skin in the game”, and the experience the borrower has in conducting similar transactions in the past.',
  },
  {
    title: 'Is there a down payment requirement on a purchase transaction?',
    text: 'Nextres, LLC requires at least 15% down of the purchase price. Additionally, all settlement charges must be paid out-of-pocket and may not be rolled into the loan.',
  },
  {
    title: 'What is hard money lending?',
    text: 'The term "hard money" typically refers to a very specific type of privately issued asset-based loan, usually secured by equity in real estate or a liquid financial asset. They are typically issued at much higher interest rate than conventional real estate loans. These loans are usually offered by non-traditional lenders such as private funding groups and non-deposit lending institutions.',
  },
  {
    title:
      'Why would a Borrower seek a comparatively expensive private mortgage rather than a conventional bank mortgage?',
    text: `
      There are many reasons but the two most likely are:
      <br/>
      1) Time Crunch: The Borrower has applied for a conventional bank mortgage, but the time-of-the-essence closing date is rapidly approaching, the bank is still completing its due diligence, yet the Buyer/Borrower simply has to close in a timely fashion in order to avoid losing a hefty contract deposit or missing out on some outstanding equity in a particular project. After closing the bridge loan with a Private Lender, the Borrower can then take as long as necessary to arrange permanent financing.
      <br/>
      2) Transitional Property: Another typical case would involve a Borrower purchasing a vacant property that he plans to convert to another use (office to residential, for example). A bank would rather finance the deal AFTER the Borrower has executed his business plan, rented the property and created cash flow. The Private Lender is willing to get more deeply involved than most banks, evaluating the Borrower’s past track record, the viability of the Borrower’s current business plan to convert/improve the property, as well as the value of the Borrower’s personal guarantee or other collateral. The savvy Borrower is also fully aware that he is only going to have the Private Loan outstanding for perhaps 12 months, and that paying 10.99% - 18% for such a brief period is far LESS expensive than bringing in much more expensive equity partners for the long haul. If an owner or developer raises additional equity by bringing in partners, it is certain that he will have to give up a substantial “piece of the pie”.
    
      `,
  },
  {
    title: 'What does Nextres, LLC want to see when they are qualifying a borrower?',
    text: 'We understand that each borrower’s situation is different, so we may require additional documentation than what we typical require. To get started, we require a valid ID, copy of the most 2 recent months bank statements from each borrower. We will also require every property to maintain insurance coverage that covers at least the amount being borrowed from Nextres, LLC.',
  },
  {
    title: 'Are there occupancy requirements for our loans?',
    text: 'Nextres, LLC does require that the property we give consideration for is a non-owner-occupied property. There are no exceptions to this policy.',
  },
  {
    title: 'Is there a minimum or maximum loan amount?',
    text: ' The minimum loan size is $30,000.00 US Dollars and the maximum loan size is $2,000,000.00 US Dollars.',
  },
  {
    title: 'Who appraises the property? Can I order my own appraisal?',
    text: 'All appraisals are ordered through our preferred appraisal vendor relationships. The borrower is responsible for payment for the appraisal in full at the time that it is ordered. Transferred appraisals may be accepted on a case by case basis and may be subject to second level review.',
  },
  {
    title: 'How long is the loan term?',
    text: 'Each loan is setup for a 12-month period however an additional 6-month extension may be permissible if a satisfactory payment history is proven during the initial period.',
  },
  {
    title: 'How is the monthly payment calculated?',
    text: 'At Nextres, LLC each loan is amortized into interest only payments and the full balance is due at the end of its term.',
  },
  {
    title: 'Are inspections required during the loan term?',
    text: 'There will be an initial appraisal prior to the inception of the loan for each transaction. The only transactions that involve inspections during the loan term are “fix and flip” or “renovation” loans at the completion of each phase. The cost for each inspection is $175.',
  },
]

export function FAQs() {
  useTitle(`FAQs - ${process.env.REACT_APP_COMPANY}`)
  const [active, setActive] = useState(-1)
  return (
    <div className="FAQs-container">
      <div className="px-5 pb-12 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">FAQs</div>
        <div className="mt-8">
          {questions.map((item: any, index: number) => {
            return (
              <div
                className="my-4 hover:cursor-pointer"
                key={index}
                onClick={() => setActive(active === index ? -1 : index)}
              >
                <div className="rounded-2xl	p-4 bg-sky-50">
                  <div className="font-black text-blue-900 text-[18px] flex justify-between">
                    {item.title}
                    {active !== index ? (
                      <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>

                  {index === active && <div className="mt-3" dangerouslySetInnerHTML={{ __html: item.text }} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
