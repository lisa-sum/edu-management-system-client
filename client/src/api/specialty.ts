/**
 * @description 获取专业列表
 * @since 17/03/2023 11:50 am
 * @param query {'all' | string} 查询条件
 * @return 专业列表
 *  */
export const getSpecialty = async (query = 'all') => {
	return await fetch(`${import.meta.env.VITE_APP_SPECIALTY}?query=${query}`, {
		method: 'GET',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
	}).then(async (res) => {
		const result = await res.json()
		if ((result.code >= 200 && result.code < 400) || result.body !== null) {
			return result
		}
		throw new Error(result.message)
	})
}

/**
 * @description 修改专业
 * @since 17/03/2023 11:48 am
 * @param oldSpecialtyName {string} 原专业名称
 * @param newSpecialtyName {string} 新专业名称
 * @param newSpecialtyDescription {string} 新专业描述
 * @return 修改信息
 *  */
export const updateSpecialtyOne = async (oldSpecialtyName: string, newSpecialtyName: string, newSpecialtyDescription: string) => {
	return await fetch(`${import.meta.env.VITE_APP_SPECIALTY}`, {
		method: 'PATCH',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
		body: JSON.stringify({
			oldSpecialtyName,
			newSpecialtyName,
			newSpecialtyDescription,
		}),
	}).then(async (res) => {
		const result = await res.json()
		if (result.code !== 200 || result.body === null) {
			return new Error(result.message)
		}
		return result
	})
}
