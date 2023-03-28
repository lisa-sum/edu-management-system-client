export const fetcher = async (uri: string = import.meta.env.VITE_APP_BASE, method: string, query?: string, body?: any) => {
	if (['POST', 'PUT', 'PATCH'].includes(method)) {
		return await fetch(uri, {
			method,
			headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
			body: JSON.stringify(body),
		}).then((res) => {
			if (res.ok) {
				return res.json()
			}
			throw new Error('请求失败')
		})
	}
	return await fetch(`${uri}?query=${query}`, {
		method,
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	}).then((res) => {
		if (res.ok) {
			return res.json()
		}
		throw new Error('请求失败')
	})
}
