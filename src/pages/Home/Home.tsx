import './index.scss'

import bridge1 from 'assets/bridge-1.png'
import bridge2 from 'assets/bridge-2.png'
import bridge3 from 'assets/bridge-3.png'
import image from 'assets/hero-img.png'
import turn1 from 'assets/turn-1.png'
import turn2 from 'assets/turn-2.png'
import cloneDeep from 'clone-deep'
import { ImageTextCard } from 'components/ImageTextCard'
import { useState } from 'react'
import { Button, Input2 } from 'stories/components'
import { useTitle } from 'utils/pageTitle'
import { validateEmail } from 'utils/validator'

const explain = (key: string, value: string) => {
  return (
    <div className="">
      <div className="text-slate-200 text-[12px]">{key}</div>
      <div className="font-black text-[18px] md:text-[20px]">{value}</div>
    </div>
  )
}

const ImageText = (img: string, label: string, hrs: string) => {
  return (
    <div className="image-text-card-container w-fit	flex bg-sky-50 rounded-2xl p-4 md:p-8 w-full mb-5 items-center">
      <div className="img-container h-18">
        <img src={img} alt="image-card-img" />
      </div>
      <div className="ml-3">
        <div className="title-container font-bold text-shade-blue text-[20px] md:text-[24px]">{label}</div>
        <div className="content-container text-[20px] md:text-[24px] text-sky-500 font-black">{hrs}</div>
      </div>
    </div>
  )
}

export function Home() {
  useTitle(`Home - ${process.env.REACT_APP_COMPANY}`)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })
  const [action, setAction] = useState('')

  const onChange = (key: string, value: string) => {
    if (key == 'name') setName(value)
    else if (key == 'email') setEmail(value)
    const newErrors = cloneDeep(errors) as any
    newErrors[key] = ''
    setErrors(newErrors)
  }

  const onDownload = () => {
    const errors = { name: '', email: '' }
    if (!name) errors.name = 'Required'
    if (!email) errors.email = 'Required'
    else if (!validateEmail(email)) {
      errors.email = 'Email address is not in a valid format.'
    }
    setErrors(errors)
    if (errors.name || errors.email) return

    setAction('onDownload')
  }

  return (
    <div className="home-container">
      <div className="px-5 pb-16 max-w-[1440px] m-auto">
        <div className="hero-container">
          <div className="hero-content">
            <div className="text-white text-[20px] md:text-[32px] mb-3">The Brokers' Bridge Lending Partner</div>
            <div className="text-white text-[32px] md:text-[54px] font-black">Simple. Efficient. Transparent.</div>
          </div>
          <div className="hero-img">
            <img src={image} alt="MacBook" width={806} height={492} />
          </div>
        </div>
      </div>
      <div className="section2 max-w-[1440px] m-auto px-5 pb-10 md:pb-16 md:px-20">
        <div className="text-[24px] md:text-[48px] font-bold text-shade-blue">
          Bridge Loan Financing for
          <br />
          Today’s
          <span className="pl-3 text-sky-500">Broker’s Distinctive Lending Needs</span>
        </div>
      </div>
      <div className="section2 max-w-[1440px] m-auto px-5 md:px-10 pb-6 md:pb-16 grid md:grid-cols-3	md:gap-12">
        <ImageTextCard
          img={bridge1}
          title="A Quick, Convenient Process"
          content="Nextres’s, LLC technology lets you screen shot and upload what’s required for processing from any device."
        />
        <ImageTextCard
          img={bridge2}
          title="Same Day Approvals"
          content="Nextres’s, LLC seasoned team knows your client needs money now. Your client’s deal depends on it."
        />
        <ImageTextCard
          img={bridge3}
          title="Broker Protection"
          content="Nextres, LLC protects broker fees and relationships in the broker agreement so you never have to worry about the client calling us directly."
        />
      </div>
      <div className="section2 max-w-[1440px] m-auto px-5 md:px-20 pb-10 md:pb-16 flex flex-wrap items-center justify-around">
        <div className="text-[24px] md:text-[48px] font-bold text-shade-blue mb-3">Turn Times</div>
        <div className="flex flex-wrap md:gap-8">
          {ImageText(turn1, 'New submissions', '24h')}
          {ImageText(turn2, 'Conditions', '24h')}
        </div>
      </div>
      <div className="section2 max-w-[1440px] m-auto px-5 pb-10 md:pb-16">
        <div className="credit-box-container p-5 md:p-8">
          <div className="content">
            <div className="text-white font-black text-[24px] md:text-[48px]">Credit box</div>
            <div className="list-container text-white">
              <div className="list-item-container py-3 md:py-6 flex wrap border-b border-sky-200 grid sm:grid-cols-3 md:gap-6">
                <div className="item-content col-span-3 md:col-span-1 mb-3">
                  <div className="">Loan Amount</div>
                  <div className="text-[20px] md:text-[32px] font-black">$75K to $5MM</div>
                </div>
                <div className="item-content col-span-3 md:col-span-2">
                  <div className="">Max Term</div>
                  <div className="grid grid-cols-2">
                    {explain('for Bridge', '2 years')}
                    {explain('for Perm', '40 years')}
                  </div>
                </div>
              </div>
              <div className="list-item-container py-3 md:py-6 flex wrap border-b border-sky-200 grid sm:grid-cols-3 md:gap-x-6 md-gap-y-3">
                <div className="item-content col-span-3 md:col-span-1 mb-3">
                  <div className="text-[20px] md:text-[32px] font-black">Interest Rate</div>
                </div>
                <div className="item-content col-span-3 md:col-span-2">
                  <div className="grid grid-cols-2">
                    {explain('for Bridge', '7.99%+')}
                    {explain('for Perm', '5.50%+')}
                  </div>
                </div>
                <div className="item-content col-span-3 mt-3">Loan-to-Value (LTV) Maximum:</div>
                <div className="item-content col-span-3">
                  <div className="grid grid-cols-3 mt-3">
                    {explain('As-is LTV', '80%')}
                    {explain('LTC', '90%')}
                    {explain('After Repaired LTV', '65%')}
                  </div>
                </div>
              </div>
              <div className="list-item-container py-3 md:py-6 flex wrap grid sm:grid-cols-3 md:gap-x-6 md-gap-y-3">
                <div className="item-content col-span-3 md:col-span-1 mb-3">
                  <div>Borrower's Minimum FICO</div>
                  <div className="font-black text-[18px] md:text-[20px] md:mt-3">550</div>
                </div>
                <div className="item-content col-span-3 md:col-span-2">
                  <div>Type</div>
                  <div className="font-black text-[18px] md:text-[20px] md:mt-3">
                    Exceptions may be granted on case by case basis
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="download md:mt-16">
            <div className="bg-white p-5 md:p-10 rounded-lg">
              <div className="text-[20px] md:text-[24px] text-shade-blue font-black">
                Download the <br />
                <span className="text-sky-500">Nextres, LLC</span> Loan Guidelines.
              </div>
              <div className="input-container mt-8">
                <div className="input-item">
                  <Input2
                    title="Name"
                    value={name}
                    required
                    error={errors.name}
                    onChange={(value) => onChange('name', value)}
                  />
                </div>
                <div className="input-item mt-6">
                  <Input2
                    title="Email"
                    value={email}
                    required
                    error={errors.email}
                    onChange={(value) => onChange('email', value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button className="mt-1" color="sky" full bold onClick={onDownload} loading={action === 'onDownload'}>
                  Download Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
