// 路由结构
import { AlertColor } from '@mui/material'

export type RouteList = {
	element: JSX.Element
	path: string
	label: string
}

// users结构
export type Users = {
	role: string
	account: string
	username: string
	avatar: string
	createdTime?: number
	updatedTime?: number
}

// user_admins 管理员角色结构
export type AdminBasic = {
	account: string
	avatar: string
	createdTime?: string
	updatedTime?: string

	username: string
}

// user_students 学生角色结构
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

// user_teachers教师角色结构
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
	inputValue?: string
	name: string
	info: string
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
	code?: number
	message: string
	body: T
	state: AlertColor
}

// 班级列表
export type ClassList = {
	name: string
	specialty: string
	className: string
	population: number
}
