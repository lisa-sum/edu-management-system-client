import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

import type {Specialty} from '@/type'

type InitialValue = {specialtyList: Specialty[]; specialtyName: string}

const initialValue: InitialValue = {
  specialtyName: '',
  specialtyList: [
    {
      code: '',
      college: '',
      description: '',
      name: '',
    },
  ],
}

const cache: string | InitialValue =
  localStorage.getItem('state') || initialValue
const state = {
  value: typeof cache === 'string' ? JSON.parse(cache).specialty : cache,
}

const initialState = {
  value: state.value.specialty,
}

export const specialtySlice = createSlice({
  name: 'specialty',
  initialState,
  reducers: {
    updateSpecialtyName(state, {payload}: PayloadAction<string>) {
      console.log(payload)
      state.value.specialtyName = payload
    },
    updateSpecialtyList(state, {payload}: PayloadAction<Specialty[]>) {
      state.value.specialtyList = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {updateSpecialtyName, updateSpecialtyList} = specialtySlice.actions

export default specialtySlice.reducer
