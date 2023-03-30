import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Specialty } from '@/type'

const initialState: { value: { specialtyName: string; specialtyList: Specialty[] } } = {
	value: {
		specialtyName: '',
		specialtyList: [
			{
				code: '',
				college: '',
				description: '',
				name: '',
			},
		],
	},
}

export const specialtySlice = createSlice({
	name: 'specialty',
	initialState,
	reducers: {
		updateSpecialtyName(state, { payload }: PayloadAction<string>) {
			console.log(payload)
			state.value.specialtyName = payload
		},
		updateSpecialtyList(state, { payload }: PayloadAction<Specialty[]>) {
			state.value.specialtyList = payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { updateSpecialtyName, updateSpecialtyList } = specialtySlice.actions

export default specialtySlice.reducer
