export const getSpecialtyList = (query = 'all') => {
	return fetch(`${import.meta.env.VITE_APP_SPECIALTY_LIST}?query=${query}`, {
		method: 'GET',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	}).then(async (res) => {
		const result = await res.json()
		if ((result.code >= 200 && result.code < 400) || res.body !== null) {
			return result
		}
		throw new Error(result.message)
	})
}
