export const getCollegeList = (query = 'all') => {
	return fetch(`${import.meta.env.VITE_APP_COLLEGE_URL}?query=${query}`, {
		method: 'GET',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	}).then(async (res) => {
		const result = await res.json()
		if (result.code !== 200 || result.body === null) {
			return new Error(result.message)
		}
		return result.body
	})
}
