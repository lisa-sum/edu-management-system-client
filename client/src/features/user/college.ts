import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import type {College} from '@/type'

const initialValue: {
  value: College
} = {
  value: {
    name: '',
    description: '',
    collegeList: [
      {
        name: '',
        description: '',
      },
    ],
  },
}

const cache = localStorage.getItem('state') || initialValue
const initialState =
  typeof cache === 'string' ? JSON.parse(cache).college : cache

export const collegeSlice = createSlice({
  name: 'collegeSlice',
  initialState,
  reducers: {
    addCollegeList: (state, {payload}: PayloadAction<any>) => {
      console.log(payload)
      state.value.collegeList = payload
      console.log(state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const {addCollegeList} = collegeSlice.actions

export default collegeSlice.reducer
