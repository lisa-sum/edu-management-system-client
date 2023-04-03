import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import { store } from './store'

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
			{/* 开发模式浮动查询窗口 */}
		</Provider>
	)
}
