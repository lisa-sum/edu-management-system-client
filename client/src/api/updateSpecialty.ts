export const updateSpecialty = (oldSpecialtyName: string, newSpecialtyName: string, newCollegeDescription: string) => {
	return fetch(`${import.meta.env.VITE_APP_COLLEGE_URL}`, {
		method: 'PATCH',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
		body: JSON.stringify({
			oldSpecialtyName,
			newCollegeDescription,
			newSpecialtyName,
		}),
	}).then(async (res) => {
		const result = await res.json()
		if (result.code !== 200 || result.body === null) {
			return new Error(result.message)
		}
		return result
	})
}
