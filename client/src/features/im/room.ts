import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState: { value: any } = {
	value: {
		roomName: '',
		roomNumber: '',
	},
}

export const profileSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		activeRoom: (state, { payload }: PayloadAction<{ roomName: string; roomNumber: string }>) => {
			state.value = { ...payload }
			console.log(state.value)
		},
	},
})

// Action creators are generated for each case reducer function
export const { activeRoom } = profileSlice.actions

export default profileSlice.reducer
