import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

import type {AdminBasic, StudentBasic, TeacherBasic} from '@/type'

const initialState: {
  value: {
    student: StudentBasic
    admin: AdminBasic
    teacher: TeacherBasic
  }
} = {
  value: {
    student: {
      account: '',
      address: '',
      avatar: '',
      birthdate: '',
      class: '',
      college: '',
      createdTime: '',
      updatedTime: '',
      enrollmentDate: '',
      gender: '',
      nativePlace: '',
      username: '',
    },
    admin: {
      account: '',
      avatar: '',
      username: '',
      createdTime: '',
      updatedTime: '',
    },
    teacher: {
      account: '',
      address: '',
      avatar: '',
      birthdate: '',
      college: '',
      createdTime: '',
      updatedTime: '',
      enrollmentDate: '',
      gender: '',
      nativePlace: '',
      username: '',
      politicsStatus: '',
    },
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateStudentProfile: (state, {payload}: PayloadAction<StudentBasic>) => {
      console.log({...payload})
      state.value.student = {...payload}
    },
    updateTeacherProfile: (state, {payload}: PayloadAction<TeacherBasic>) => {
      console.log({...payload})
      state.value.teacher = {...payload}
    },
    updateAdminProfile: (state, {payload}: PayloadAction<AdminBasic>) => {
      console.log({...payload})
      state.value.admin = {...payload}
    },
  },
})

// Action creators are generated for each case reducer function
export const {updateStudentProfile, updateTeacherProfile, updateAdminProfile} =
  profileSlice.actions

export default profileSlice.reducer
