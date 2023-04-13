import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {StrictMode} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import {store} from '@/store'

import Layout from './components/Layout'

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 用户在短暂离开后回来时，数据已被标记为过时, 是否在后台自动请求新的数据?
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <Layout />
          </StrictMode>
          <ReactQueryDevtools
            initialIsOpen={true}
            position="bottom-right"
          />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  )
}
