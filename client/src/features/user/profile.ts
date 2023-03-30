import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Users } from '@/type'

const initialState: { value: Users } = {
	value: {
		role: '',
		account: '',
		username: '',
		avatar: '',
		createdTime: new Date().getTime(),
		updatedTime: new Date().getTime(),
	},
}

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		/**
		 * @description 更新个人信息
		 * @since 15/12/2022下午7:12
		 * @param state 状态
		 * @param payload { Users } 修改的内容
		 * @return 更新initialState的全部内容
		 *  */
		updateUserInfo: (state, { payload }: PayloadAction<Users>) => {
			state.value = { ...payload }
		},
		/**
		 * @description 替换role内容
		 * @since 15/12/2022下午7:13
		 * @param state 状态
		 * @param payload string  角色权限
		 * @return 更新角色权限
		 *  */
		toggleRole: (state, { payload }: PayloadAction<string>) => {
			state.value.role = payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { updateUserInfo, toggleRole } = profileSlice.actions

export default profileSlice.reducer
