import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { MessageBasic } from '@/type'

const initialState: { value: { messageList: MessageBasic[] } } = {
	value: {
		messageList: [
			{
				userIdentity: 'userIdentity',
				roomIdentity: 'roomIdentity',
				data: 'data',
				createdTime: new Date().toLocaleString(),
				updatedTime: new Date().toLocaleString(),
			},
		],
	},
}

export const profileSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		updateMessage: (state, { payload }: PayloadAction<any>) => {
			state.value.messageList = [...state.value.messageList, JSON.parse(payload)]
		},
	},
})

// Action creators are generated for each case reducer function
export const { updateMessage } = profileSlice.actions

export default profileSlice.reducer
