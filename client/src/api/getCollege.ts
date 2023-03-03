export const getCollege = () => {
	return fetch(import.meta.env.VITE_APP_COLLEGE_URL, {
		method: 'GET',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	}).then(async (res) => {
		const result = await res.json
		if (res.ok) {
			console.log(result)
			return result
		}
		return new Error(res as any)
	})
}
