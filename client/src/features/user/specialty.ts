import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { Specialty } from '@/type'

const initialState: { value: { specialtyList: Specialty[] } } = {
	value: {
		specialtyList: [
			{
				name: '',
				college: '',
				code: '',
			},
		],
	},
}

export const specialtySlice = createSlice({
	name: 'specialty',
	initialState,
	reducers: {
		updateSpecialty(state, { payload }: PayloadAction<Specialty[]>) {
			state.value.specialtyList = payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { updateSpecialty } = specialtySlice.actions

export default specialtySlice.reducer
