import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import { store } from './store'

const queryClient = new QueryClient()

export default function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Layout />
				</BrowserRouter>
				{/* 开发模式浮动查询窗口 */}
				<ReactQueryDevtools initialIsOpen={true} />
			</QueryClientProvider>
		</Provider>
	)
}
