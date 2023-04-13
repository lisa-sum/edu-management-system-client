import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

import type {RoomBasic} from '@/type'

const initialState: {value: RoomBasic} = {
  value: {
    userIdentity: '',
    avatar: '',
    info: '',
    name: '',
    number: '',
    createdTime: new Date().getTime(),
    updatedTime: new Date().getTime(),
  },
}

export const profileSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // TODO 未来可能需要修改
    activeRoom: (
      state,
      {payload}: PayloadAction<Pick<RoomBasic, 'name' | 'number'>>,
    ) => {
      state.value.name = payload.name
      state.value.number = payload.number
    },
  },
})

// Action creators are generated for each case reducer function
export const {activeRoom} = profileSlice.actions

export default profileSlice.reducer
