import {configureStore} from '@reduxjs/toolkit'

import alertReducer from '@/features/feedback/alert'
import messageReducer from '@/features/im/message'
import roomReducer from '@/features/im/room'
import themeReducer from '@/features/theme/mode'
import collegeReducer from '@/features/user/college'
import profileReducer from '@/features/user/profile'
import specialtyReducer from '@/features/user/specialty'
import type {ReducersType} from '@/type'

const reducers: ReducersType = {
  profile: profileReducer,
  room: roomReducer,
  message: messageReducer,
  specialty: specialtyReducer,
  theme: themeReducer,
  alert: alertReducer,
  college: collegeReducer,
}

export const store = configureStore({
  reducer: reducers,
})

// 状态变化时自动存储到浏览器本地存储,实现刷新时状态不丢失
store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('state', JSON.stringify(state))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
