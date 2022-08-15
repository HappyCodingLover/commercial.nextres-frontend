import { BaseLayout } from 'layouts'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BaseRoute } from 'routes'
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <BaseRoute />
      </BaseLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
