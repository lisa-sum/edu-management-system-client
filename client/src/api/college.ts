/**
 * @description 增加学院
 * @since 17/03/2023 11:41 am
 * @param collegeName {string} 学院名称
 * @param collegeInfo {string} 学院描述
 * @return 创建成功的文档ID
 *  */
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

/**
 * @description 删除学院
 * @since 17/03/2023 11:41 am
 * @param collegeName {string} 学院名
 * @return
 *  */
export const deleteCollege = (collegeName: string) => {
	return fetch(`${import.meta.env.VITE_APP_COLLEGE_URL}?delete=${collegeName}`, {
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

/**
 * @description 修改学院
 * @since 17/03/2023 11:41 am
 * @param oldCollegeName {string} 原有学院名称
 * @param newCollegeName {string} 修改后学院名称
 * @param collegeInfo {string} 修改后的学院描述
 * @return 修改后的信息
 *  */
export const updateCollege = (oldCollegeName: string, newCollegeName: string, collegeInfo: string) => {
	return fetch(import.meta.env.VITE_APP_COLLEGE_URL, {
		method: 'POST',
		headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
		body: JSON.stringify({
			oldName: oldCollegeName,
			newName: newCollegeName,
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

/**
 * @description 获取学院列表
 * @since 17/03/202311:45 am
 * @param query { 'all' | 'specialty } 查询参数
 * @return 学院列表
 *  */
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
