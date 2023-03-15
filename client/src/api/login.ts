import { Users } from '@/type'

type UserBasicResponse = {
	body: {
		data: Users
		token: string
	}
	message: any
	code: number
}

export const getAuthLogin = (usr: string, pwd: string): Promise<UserBasicResponse> => {
	return (
		fetch(import.meta.env.VITE_APP_USER_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				account: usr,
				password: pwd,
			}),
		})
			// 获取用户信息
			.then(async (res) => {
				const result = await res.json()
				const { message, code } = result
				if (code >= 400) {
					throw new Error(`code:${code} message:${message}`)
				}
				return result
			})
	)
}
