import './index.scss'

import { PhoneIcon } from '@heroicons/react/outline'
import aboutHeroImg from 'assets/about-us-hero.png'
import bridge1 from 'assets/bridge-1.png'
import bridge2 from 'assets/bridge-2.png'
import { ImageTextCard } from 'components/ImageTextCard'
import { useTitle } from 'utils/pageTitle'

export function AboutUs() {
  useTitle(`About Us - ${process.env.REACT_APP_COMPANY}`)
  return (
    <div className="aboutus-container">
      <div className="px-5 pb-16 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">About Us</div>
        <div className="mt-3 grid md:grid-cols-2 md:gap-10">
          <div className="text-[20px]">
            At Nextres, LLC, we understand that the real estate market never sleeps so you and your clients need answers
            fast. That’s why we have a no-nonsense online loan application system, approvals as soon as the same day,
            and the support you need all day, every day.
          </div>
          <div className="about-image relative">
            <img src={aboutHeroImg} alt="about-us-img" />
          </div>
        </div>
        <div className="mt-5 md:mt-16 grid md:grid-cols-2 md:gap-20">
          <ImageTextCard
            img={bridge1}
            title="Why They Recommend Us"
            content="Our dedicated team specializes exclusively in real estate financing, and we understand every deal is unique. Therefore, if the structure does not meet our preferred credit box, we have an out-of-the box approach and a commonsense mentality when we review those transactions. Why? Because the fate of your financial future rests on it."
          />
          <ImageTextCard
            img={bridge2}
            title="What Are You Waiting For?"
            content="Whether your borrower intend to fix to flip, renovate to rent, refinance, or simply acquire real estate, Nextres, LLC has the financial solutions you need and our promise is to deliver them with the absolute highest level of honesty, integrity, transparency, and professionalism."
          />
        </div>
        <div className="mt-5">
          <a className="button" href="tel:+18582995570">
            <PhoneIcon className="h-6 w-6" aria-hidden="true" />
            Contact Us Now
          </a>
        </div>
      </div>
    </div>
  )
}
