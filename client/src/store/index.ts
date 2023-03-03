import { configureStore } from '@reduxjs/toolkit'

import messageReducer from '@/features/im/message'
import roomReducer from '@/features/im/room'
import profileReducer from '@/features/user/profile'

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		room: roomReducer,
		message: messageReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
