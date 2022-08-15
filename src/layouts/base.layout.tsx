import { Footer, Header } from 'stories/layouts'

export const BaseLayout = (props: any) => {
  const { children } = props

  return (
    <div className="relative bg-white overflow-hidden">
      <div className={`relative lg:w-full relative h-full-screen bg-white`}>
        <Header />
        <main className="relative mx-auto main">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
