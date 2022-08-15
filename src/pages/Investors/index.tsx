import './index.scss'

import bridge2 from 'assets/bridge-2.png'
import aboutHeroImg from 'assets/investors.png'
import investor2 from 'assets/investors-2.png'
import { ImageTextCard } from 'components/ImageTextCard'
import { useTitle } from 'utils/pageTitle'

export function Investors() {
  useTitle(`Investors - ${process.env.REACT_APP_COMPANY}`)
  return (
    <div className="investors-container">
      <div className="px-5 pb-12 max-w-screen-xl m-auto mt-4">
        <div className="text-[30px] md:text-[42px] font-black text-shade-blue">Investors</div>

        <div className="mt-3 grid md:grid-cols-2 md:gap-10">
          <div className="text-[20px]">
            <div className="mt-5 text-[20px] md:text-[26px] font-black mt-3 text-shade-blue">
              Nextres, LLC is the long-term Investment partner with a{' '}
              <span className="text-sky-500">flawless concierge experience.</span>
            </div>
            <div className="mt-8">
              A big part of our customer-focused business model is seen in the effort we've put forth in creating our
              online application process. It's a seamless, stress-free experience. Simply upload the needed documents
              with a screenshot from your phone,tablet, or laptop and get approved instantly.
            </div>
          </div>
          <div className="about-image relative">
            <img src={aboutHeroImg} alt="about-us-img" />
          </div>
        </div>
        <div className="mt-5 md:mt-14 grid md:grid-cols-2 md:gap-20">
          <ImageTextCard
            img={bridge2}
            content="Once you agree to the negotiated rate, Nextres, LLC solidifies our commitment to you by contributing no less than 10% of our own funds for your venture. In other words, if you need $100k, we give you the first $10k from our own coffers. This leaves you needing only $90k. With this gesture, we hope are letting you know we care about your success. We have something at stake too."
          />
          <ImageTextCard
            img={investor2}
            content="And knowing that entrepreneurs are on the go 24/7, so is Nextres, LLC. In addition to giving you a 10% contribution and the best possible rates, we provide unprecedented concierge service anywhere, anytime, from any device."
          />
        </div>
      </div>
    </div>
  )
}
