import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import type {AlertType} from '@/type'

const initialValue: {
  value: AlertType
} = {
  value: {
    show: false,
  },
}

const cache = localStorage.getItem('state') || initialValue
const initialState = typeof cache === 'string' ? JSON.parse(cache).alert : cache

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    toggleShow: (state, {payload}: PayloadAction<any>) => {
      state.value = payload
      console.log(state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const {toggleShow} = alertSlice.actions

export default alertSlice.reducer
