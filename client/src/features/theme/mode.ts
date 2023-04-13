import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ThemeMode} from '@/type'

const initialValue: {
  value: ThemeMode
} = {
  value: {
    mode: 'light',
  },
}

const cache = localStorage.getItem('state') || initialValue
const initialState = typeof cache === 'string' ? JSON.parse(cache).theme : cache

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    toggleThemeMode: (state, {payload}: PayloadAction<any>) => {
      console.log(payload)
      state.value = payload
      console.log(state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const {toggleThemeMode} = themeSlice.actions

export default themeSlice.reducer
