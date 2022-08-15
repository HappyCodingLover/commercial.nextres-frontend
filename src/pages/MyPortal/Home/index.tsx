import { CogIcon, HandIcon, HomeIcon } from '@heroicons/react/outline'

export function Home() {
  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center p-5 w-full font-bold text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <HomeIcon className="w-7 h-7 mr-2 text-gray-700" />
          <span>Home Dashboard</span>
        </button>
      </h2>
      <div>
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to{' '}
            <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">
              get started
            </a>{' '}
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </div>
      </div>

      <h2>
        <button
          type="button"
          className="flex items-center p-5 w-full font-bold text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <CogIcon className="w-7 h-7 mr-2 text-gray-700" />
          <span>Notification Information</span>
        </button>
      </h2>
      <div>
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
            has a design equivalent in our Figma file.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the{' '}
            <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">
              Figma design system
            </a>{' '}
            based on the utility classes from Tailwind CSS and components from Flowbite.
          </p>
        </div>
      </div>

      <h2>
        <button
          type="button"
          className="flex items-center p-5 w-full font-bold text-left text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <HandIcon className="w-7 h-7 mr-2 text-gray-700" />
          <span>Whats Next</span>
        </button>
      </h2>
      <div>
        <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Welcome to your personal secure loan portal. In this portal you will be able to pull your credit report,
            order your appraisal, upload your required documents, and check the status of your loan. You will also be
            able to send us messages by using the chat box below for any questions or concerns you have 24/7.
          </p>
        </div>
      </div>
    </div>
  )
}
