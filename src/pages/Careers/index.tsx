import './index.scss'

import careersImg from 'assets/careers.png'
import { useTitle } from 'utils/pageTitle'

export function Careers() {
  useTitle(`Careers - ${process.env.REACT_APP_COMPANY}`)
  return (
    <div className="Careers-container">
      <div className="px-5 pb-12 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">Careers</div>

        <div className="mt-3 grid md:grid-cols-2 md:gap-10">
          <div className="mt-8 text-[18px]">
            <div>
              We are a bridge lender who customizes loans to suit real estate investors focusing on Fix to Flip, New
              Construction, Renovate to Rent, and Refinance. We have created a seamless online application process,
              often getting borrows approval the same day.
            </div>
            <div className="mt-5">
              Our goal is to exceed our client’s expectations by delivering a high degree of communication,
              transparency, and support. If you think you’ve got what it takes you join our team, check out our current
              openings.
            </div>
            <div className="mt-5">
              When you think about your career path, where do you see yourself going? A career at NextRes gives you the
              opportunity to grow both professionally and personally in a quickly expanding company. We are driven by
              the vision to deliver superior financial services to our clients – and that starts with our dedicated team
              of employees.
            </div>
            <div className="mt-5">
              With excellent benefits and competitive compensation packages, NextRes is your partner for professional
              success.
            </div>
            <div className="mt-5">
              If you believe you could be an asset to the NextRes team, please send your resume and a cover letter to
              jobs@nextres.com, or click the opportunities button below to find open job positions.
            </div>
          </div>
          <div className="about-image relative">
            <img src={careersImg} alt="careers-img" />
            <div className="image-text-card-container bg-sky-50 rounded-2xl	p-4 md:p-8 w-full mb-5 z-40">
              <div className="title-container pt-4 font-bold text-shade-blue text-[20px] md:text-[32px]">
                Quick Facts
              </div>
              <ol className="list-decimal pl-4 mt-3">
                <li className="mb-2">We are a division of a full-service mortgage banker.</li>
                <li className="mb-2">We provide employees with robust marketing and corporate support.</li>
                <li className="mb-2">We provide in-house underwriting and processing.</li>
                <li className="mb-2">
                  We offer a full suite of benefits, including: medical, dental, vision, healthcare flexible spending
                  accounts, disability insurance, life insurance programs, and 401(k) plans.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
