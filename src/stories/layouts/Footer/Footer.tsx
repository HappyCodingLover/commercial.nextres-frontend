import { ArrowRightIcon, LocationMarkerIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { ReactComponent as LogoBlue } from 'assets/logo-blue.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { requestNewsletter } from 'services'
import svgLoading from 'stories/assets/loading.svg'
import { Input2 } from 'stories/components'
import { validateEmail } from 'utils/validator'

export const Footer = () => {
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const onChangeEmail = (value: string) => {
    setEmail(value)
    setEmailError('')
  }

  const onSubmitNewsletter = () => {
    if (!email) {
      setEmailError('Required')
      return
    }
    if (!validateEmail(email)) {
      setEmailError('Email address is not in a valid format.')
      return
    }

    setLoading(true)
    requestNewsletter(email)
      .then(() => {
        toast('Newsletter is submitted', { type: 'info' })
        setEmail('')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="footer-container bg-slate-50 w-full relative">
      <div className="max-w-screen-2xl m-auto bg-slate-50 bottom-0 pt-10 pb-6">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 md:gap-8 sm:gap-4 border-b px-4">
          <div className="logo-newslater-container mb-5">
            <LogoBlue />
            <div className="mt-8 flex">
              <div className="flex-1">
                <Input2
                  title="Newsletter Signup"
                  value={email}
                  type="email"
                  error={emailError}
                  required
                  onChange={onChangeEmail}
                />
              </div>
              <button
                disabled={isLoading}
                className="ml-2 mt-2 h-fit text-white rounded p-[7px] bg-shade-blue hover:bg-sky-600 cursor-pointer"
                onClick={onSubmitNewsletter}
              >
                {isLoading && <img src={svgLoading} className="h-5 w-5 animate-spin" />}
                {!isLoading && <ArrowRightIcon className="h-7 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
          <div className="about-us-container mb-5">
            <div className="font-black text-[16px] mb-3 text-shade-blue">About Us</div>
            <div className="text-slate-700 text-[15px]">This webpage isn't the main site of Nextres, LLC</div>
            <div className="link font-black text-[14px] mt-3 hover:underline">
              <a
                href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2321794"
                rel="noopener noreferrer"
                target="_blank"
              >
                Company NMLS: 2321794
              </a>
            </div>
            <div className="link font-black text-[14px] mt-1 hover:underline">
              <a href="https://nextres.com/abouts/licensing-information" rel="noopener noreferrer" target="_blank">
                Licensing Information
              </a>
            </div>
          </div>
          <div className="contact-us-container mb-5">
            <div className="font-black text-[16px] mb-3 text-shade-blue">Contact Us</div>
            <div className="text-slate-700 text-[15px]">
              If you have any questions, please don't hesitate to give us a call or email
            </div>
            <div className="link font-black text-[14px] mt-3 hover:underline">
              <a href="tel:+18582995570" className="flex items-center">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                <span className="ml-2">858-299-5570</span>
              </a>
            </div>
            <div className="link font-black text-[14px] mt-1 hover:underline">
              <a href="tel:+18336394140" className="flex items-center">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                <span className="ml-2">833-639-4140</span>
                <span className="text-slate-700 text-[13px] ml-1 font-normal">(Toll free)</span>
              </a>
            </div>
            <div className="link font-black text-[14px] mt-1 hover:underline">
              <a href="mailto:info@nextres.com" className="flex items-center">
                <MailIcon className="h-4 w-4" aria-hidden="true" />
                <span className="ml-2">info@nextres.com</span>
              </a>
            </div>
            <div className="link font-black text-[14px] mt-3 hover:underline">
              <a href="https://www.facebook.com/nextresllc" rel="noopener noreferrer" target="_blank">
                <button className="bg-blue-500 p-1 font-semibold text-white inline-flex items-center space-x-2 rounded">
                  <svg
                    className="w-5 h-5 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </a>
              <a href="https://twitter.com/nextresllc" rel="noopener noreferrer" target="_blank" className="ml-3">
                <button className="bg-blue-400 p-1 font-semibold text-white inline-flex items-center space-x-2 rounded">
                  <svg
                    className="w-5 h-5 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
              </a>
              <a href="https://www.instagram.com/nextresllc" rel="noopener noreferrer" target="_blank" className="ml-3">
                <button className="bg-red-500 p-1 font-semibold text-white inline-flex items-center space-x-2 rounded">
                  <svg
                    className="w-5 h-5 fill-current"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                </button>
              </a>
            </div>
          </div>
          <div className="office-container mb-5">
            <div className="font-black text-[16px] mb-3 text-shade-blue">Corporate Office</div>
            <div className="text-slate-700 text-[15px] flex items-center">
              <LocationMarkerIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              12 Penns Trail, Suite 138, Newtown, PA 18940
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between mt-3 px-3">
          <div className="text-slate-700 text-[15px] mb-3">Copyright 2022 @ Nextres, LLC. All right reserved.</div>
          <div className="flex flex-wrap gap-2 md:gap-8">
            <Link to="/faqs" className="hover:underline">
              FAQs
            </Link>
            <Link to="/careers" className="hover:underline">
              Careers
            </Link>
            <a
              href="https://nextres.com/#/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
              className="ml-3 hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="https://nextres.com/#/terms-and-conditions"
              rel="noopener noreferrer"
              target="_blank"
              className="ml-3 hover:underline"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
