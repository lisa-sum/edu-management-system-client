import type { Status } from '@/type'

const METHODS = ['POST', 'PUT', 'PATCH']
export const fetcher = async (
	uri: string = import.meta.env.VITE_APP_BASE,
	method = 'GET',
	query?: string,
	params?: string,
	body?: any,
): Promise<Status<any>> => {
	if (METHODS.includes(method.toUpperCase())) {
		return await fetch(uri, {
			method,
			headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
			body: JSON.stringify(body),
		})
			.then(async (res) => {
				const response = await res.json()
				if (response.code === 200 || response.code === 201) {
					return response
				}
				throw new Error('请求失败')
			})
			.catch((err) => {
				return err
			})
	}
	const queryStr = query ? `?query=${query}` : ''
	const paramList = params ? `?${params}` : ''
	return await fetch(`${uri}${queryStr}${paramList}`, {
		method,
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	})
		.then((res) => {
			if (res.ok) {
				return res.json()
			}
			throw new Error('请求失败')
		})
		.catch((err) => {
			console.error(err)
		})
}
