import {AlertColor, InputBaseProps, PaletteMode} from '@mui/material'
import {Reducer} from '@reduxjs/toolkit'

export type Error = {
  body: string | Reducer<string, any>
  message: string
  code: number
}

// 路由结构
export type RouteList = {
  element: JSX.Element
  path: string
  label: string
}

// user结构
export type User = {
  role: string
  account: string
  username: string
  avatar: string
  createdTime?: number
  updatedTime?: number
}

// user_admin 管理员角色结构
export type AdminBasic = {
  account: string
  avatar: string
  createdTime?: string
  updatedTime?: string
  username: string
}

// user_student 学生角色结构
export type StudentBasic = {
  account: string
  address: string
  avatar: string
  birthdate: string
  class: string
  college: string
  createdTime?: string
  updatedTime?: string
  enrollmentDate: string
  gender: string
  nativePlace: string
  username: string
}

// user_teacher教师角色结构
export type TeacherBasic = {
  account: string
  address: string
  avatar: string
  birthdate: string
  college: string
  createdTime?: string
  updatedTime?: string
  enrollmentDate: string
  gender: string
  nativePlace: string
  username: string
  politicsStatus: string
}

// im 群聊结构
export type RoomBasic = {
  userIdentity: string
  avatar: string
  info: string
  name: string
  number: string
  createdTime: number
  updatedTime: number
}

// im 消息结构
export type MessageBasic = {
  userIdentity: string
  roomIdentity: string
  data: any
  createdTime: number | string
  updatedTime: number | string
}

// 学院列表
export type College = {
  id?: string
  name: string
  description: string
  collegeList: {
    name: string
    description: string
  }[]
}

// 专业列表
export type Specialty = {
  code: string
  college: string
  description: string
  name: string
}

// 标准返回状态
export type Status<T> = {
  code: number
  message: string
  body: T
  state: AlertColor
}

// 班级列表
export type ClassList = {
  specialty: string
  college: string
  name: string
  person: number
}

// 主题
export type ThemeMode = {
  mode: PaletteMode
  color?: string
  bgcolor?: string
}

// Reducers
export type ReducersType = {
  profile: Reducer<{value: Users}>
  room: Reducer<{value: RoomBasic}>
  message: Reducer<{value: {messageList: MessageBasic[]}}>
  specialty: Reducer<{value: Specialty}>
  theme: Reducer<{value: ThemeMode}>
  alert: Reducer<{value: AlertType}>
  college: Reducer<{value: College[]}>
}

// MUI的BootstrapInput类型的参数定义
export type BootstrapInputProps = {
  mode: string
} & InputBaseProps

// 提示框
export type AlertType = {
  show: boolean
}
