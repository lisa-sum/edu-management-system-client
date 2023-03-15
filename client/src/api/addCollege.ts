export const addCollege = (collegeName: string, collegeInfo: string) => {
	return fetch(import.meta.env.VITE_APP_COLLEGE_URL, {
		method: 'PUT',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
		body: JSON.stringify({
			name: collegeName,
			description: collegeInfo,
		}),
	}).then(async (res) => {
		const result = await res.json()
		if (result.code !== 200 || !res.ok) {
			throw new Error(result.message)
		}
		return result
	})
}
