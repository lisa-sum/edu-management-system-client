import { Status } from '@/type'

const HEADERS = {
	'Authorization': `Bearer ${localStorage.getItem('token')}`,
	'Origin': location.origin,
	'Access-Control-Allow-Origin': location.origin,
}
const METHODS_PARAMS = ['GET', 'DELETE']
const METHODS_BODY = ['POST', 'PUT', 'PATCH']
const METHODS = [...METHODS_BODY, ...METHODS_PARAMS]

export const fetcher = <T>(
	uri: string = import.meta.env.VITE_APP_BASE,
	method = 'GET',
	headers?: Record<string, string>,
) => {
	if (!METHODS.includes(method.toUpperCase())) {
		throw new Error(`请传入正确的请求方法! 请求方法为:${METHODS}其中之一`)
	} else if (METHODS_BODY.includes(method.toUpperCase())) {
		return async (body: any): Promise<Status<T>> => {
			return await bodyMethod<T>(uri, method, body, headers)
		}
	}
	return async (query: string, params?: string): Promise<Status<T>> => {
		return await paramsMethod(uri, method, query, params, headers)
	}
}

const bodyMethod = async <T>(
	uri: string = import.meta.env.VITE_APP_BASE,
	method = 'POST',
	body: Record<string, string>,
	headers?: Record<string, string>,
): Promise<Status<T>> => {
	return fetch(uri, {
		method,
		headers: {
			...HEADERS,
			...headers,
		},
		body: JSON.stringify(body),
	}).then(async (res): Promise<Status<T>> => {
		const response = await res.json()
		if (response.code === 200 || response.code === 201) {
			console.log(response)
			return response
		}
		throw new Error('请求失败')
	})
}

const paramsMethod = async <T>(
	uri: string = import.meta.env.VITE_APP_BASE,
	method = 'GET',
	query: string,
	params?: string,
	headers?: { [key: string]: string },
) => {
	return await fetch(`${uri}?query=${query}&params=${params}`, {
		method,
		headers: {
			...HEADERS,
			...headers,
		},
	}).then(async (res): Promise<Status<T>> => {
		const response = await res.json()
		if (response.code === 200 || response.code === 201) {
			return response
		}
		throw new Error('请求失败')
	})
}
