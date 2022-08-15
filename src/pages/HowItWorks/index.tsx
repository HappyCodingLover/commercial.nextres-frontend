import './index.scss'

import icon_2 from 'assets/bridge-3.png'
import icon_1 from 'assets/broker-1.png'
import icon_3 from 'assets/broker-3.png'
import imgHowWorks from 'assets/how-it-works.png'
import { ImageTextCard } from 'components/ImageTextCard'
import { Link } from 'react-router-dom'
import { useTitle } from 'utils/pageTitle'

const Step = (order: number, title: string, content: string, type?: number) => {
  let text_color_class = 'text-white',
    bg_class = 'bg-gray-50',
    bg_class_order = 'bg-sky-500'
  if (type === 1) {
    text_color_class = ''
    bg_class = 'bg-sky-500'
    bg_class_order = 'bg-white'
  }
  if (type === 2) {
    text_color_class = ''
    bg_class = 'bg-green-500'
    bg_class_order = 'bg-white'
  }
  return (
    <div className={`step-container ${bg_class} rounded-2xl	p-4 md:p-10 w-full mb-5 z-40`}>
      <div
        className={`rounded-full flex justify-center items-center w-12 h-12 text-[27px] ${bg_class_order} ${text_color_class} mr-4 font-black`}
      >
        {order}
      </div>
      <div
        className={`title-container pt-4 font-bold ${
          type !== undefined ? 'text-white' : 'text-shade-blue'
        } text-[20px] md:text-[28px]`}
      >
        {title}
      </div>
      <div className={`${type !== undefined && 'text-white'} content-container pt-4 md:text-[20px]`}>{content}</div>
    </div>
  )
}

export function HowItWorks() {
  useTitle(`How it Works - ${process.env.REACT_APP_COMPANY}`)
  return (
    <div className="HowItWorks-container">
      <div className="px-5 pb-12 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">Transaction Timeline</div>

        <div className="mt-3 grid md:grid-cols-2 md:gap-10">
          <div className="text-[20px]">
            <div className="mt-5 text-[20px] md:text-[26px] font-black mt-3 text-shade-blue">
              Our process is simple and transparent every step of the way.
            </div>
          </div>
          <div className="about-image relative">
            <img src={imgHowWorks} alt="about-us-img" />
          </div>
        </div>
        <div className="mt-5 md:mt-10 grid md:grid-cols-3 md:gap-20">
          {Step(
            1,
            'LOAN SETUP',
            'All documents pursuant to our provided Document Submission Checklist are uploaded to our file delivery system and tasked for a quality control review prior to underwriting submission.',
            1,
          )}
          {Step(
            2,
            'UNDERWRITING',
            'Once a file has been submitted, we will provide a review furnishing you with what conditions may be outstanding in order to initiate a closing review.',
          )}
          {Step(
            3,
            'CLOSING',
            'Upon clearance from underwriting, a closing request is initiated by you through our portal. A closing package is composed after final HUD approval.',
          )}
        </div>
        <div className="mt-5 md:mt-6 grid md:grid-cols-2 md:gap-20">
          {Step(
            4,
            'FUNDING',
            'Executed Closing Package returned to us for immediate review. Funding authorization is granted after a satisfactory review.',
          )}
          {Step(
            5,
            'SERVICING',
            'Welcome Letter is issued to client detailing remittance to us. If renovation financing then draw procedures are also outlined. Fulfillment is complete.',
            2,
          )}
        </div>

        <div className="mt-5 md:mt-10 text-[30px] md:text-[42px] font-black text-shade-blue">
          Become an Approved Broker
        </div>
        <div className="mt-5 md:mt-10 grid md:grid-cols-3 md:gap-10">
          <ImageTextCard
            img={icon_1}
            title={'Apply Online'}
            content={'Complete our simple application process in minutes.'}
          />
          <ImageTextCard
            img={icon_2}
            title={`We'll Get In Touch`}
            content={
              'We’ll let you know if anything is outstanding for onboarding, or otherwise will issue your Broker approval.'
            }
          />
          <ImageTextCard
            img={icon_3}
            title={'Start Closing Loans'}
            content={'Submit your loan package and see how easy it is to fund with Nextres, LLC.'}
          />
        </div>
        <div className="mt-5">
          <Link className="button" to="/register">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
