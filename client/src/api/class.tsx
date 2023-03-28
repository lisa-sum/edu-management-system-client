export const getClass = async (specialty: string) => {
	return await fetch(`${import.meta.env.VITE_APP_CLASS}?query=${specialty}`).then((res) => {
		if (res.ok) {
			return res.json()
		}
		throw new Error('请求失败')
	})
}
