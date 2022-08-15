import { XIcon } from '@heroicons/react/outline'
import { ReactElement, useEffect, useState } from 'react'
import svgLoading from 'stories/assets/loading.svg'

type Function = () => void

interface ModalProps {
  /**
   * Button
   */
  button?: ReactElement | null
  /**
   * Title
   */
  title?: string
  /**
   * Title for okay button
   */
  titleOkay?: string
  /**
   * Okay button handler
   */
  onOk?: Function
  /**
   * Title for cancel button
   */
  titleCancel?: string
  /**
   * Cancel button handler
   */
  onCancel?: Function
  /**
   * Custom class name
   */
  className?: string
  /**
   * Button contents
   */
  children: JSX.Element | string
  /**
   * Is loading
   */
  loading?: boolean
  /**
   * Is disabled
   */
  disabled?: boolean
  /**
   * Is loading
   */
  init?: boolean
  /**
   * Is modal's modal
   */
  childLevel?: number
  /**
   * Is Open
   */
  isOpen?: boolean
  lastUpdatedAt?: number
  /**
   * Optional click handler
   */
  onClick?: () => void

  onOpen?: () => void

  onClose?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Modal = ({
  button = null,
  title = 'Title',
  titleOkay = 'Okay',
  onOk = () => {},
  titleCancel = 'Cancel',
  loading = false,
  init = false,
  children,
  isOpen: parentIsOpen = false,
  lastUpdatedAt = 0,
  childLevel = 0,
  disabled = false,
  onOpen = () => {},
  onClose = () => {},
}: ModalProps) => {
  const [showModal, setShowModal] = useState<boolean | 0>(0)
  disabled = disabled || loading

  useEffect(() => {
    setShowModal(parentIsOpen)
  }, [lastUpdatedAt])

  useEffect(() => {
    if (showModal === 0) return
    if (showModal) onOpen()
    else onClose()
  }, [showModal])

  const _onOk = async () => {
    const result: any = await onOk()
    if (result === true) setShowModal(false)
  }

  return (
    <>
      {button && <span onClick={() => setShowModal(true)}>{button}</span>}
      {showModal ? (
        <>
          <div
            className={`w-100 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-${
              30 + childLevel * 10
            } outline-none focus:outline-none`}
          >
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-auto max-h-[calc(100vh-2rem)] max-w-[calc(100vw-4rem)]">
                {/*header*/}
                <div className="flex items-start justify-between p-5 pb-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="flex items-center text-xl font-semibold">
                    {title}
                    {init && <img src={svgLoading} className="inline w-6 h-6 ml-3 text-white animate-spin" />}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowModal(false)}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{children}</div>
                {/*footer*/}
                <div className="flex items-center justify-end px-6 py-4 border-t border-solid border-slate-200 rounded-b">
                  {titleCancel !== '' && (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      disabled={loading}
                      onClick={() => setShowModal(false)}
                    >
                      {titleCancel}
                    </button>
                  )}
                  {titleOkay !== '' && (
                    <button
                      className={`text-white ${
                        disabled ? 'bg-sky-300' : 'bg-sky-500 hover:bg-sky-700'
                      } focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`}
                      type="button"
                      onClick={_onOk}
                      disabled={disabled || loading}
                    >
                      {loading && <img src={svgLoading} className="inline w-4 h-4 mr-3 text-white animate-spin" />}
                      {titleOkay}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={`opacity-25 fixed inset-0 z-${20 + childLevel * 10} bg-black`}></div>
        </>
      ) : null}
    </>
  )
}
