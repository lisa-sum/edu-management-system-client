export const deleteCollege = (collegeType: string) => {
	console.log(collegeType)
	return fetch(`${import.meta.env.VITE_APP_COLLEGE_URL}?delete=${collegeType}`, {
		method: 'DELETE',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	}).then(async (res) => {
		const result = await res.json()
		if (result.code !== 200 || !res.ok) {
			throw new Error(result.message)
		}
		return result
	})
}
