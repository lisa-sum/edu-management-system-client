// 路由结构
type RouteList = {
	element: JSX.Element
	path: string
	label: string
}

// users结构
type Users = {
	role: string
	account: string
	username: string
	avatar: string
	createdTime?: number
	updatedTime?: number
}

// user_admins 管理员角色结构
type AdminBasic = {
	account: string
	avatar: string
	createdTime?: string
	updatedTime?: string

	username: string
}

// user_students 学生角色结构
type StudentBasic = {
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
type TeacherBasic = {
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
type RoomBasic = {
	userIdentity: string
	avatar: string
	info: string
	name: string
	number: string
	createdTime: number
	updatedTime: number
}

// im 消息结构
type MessageBasic = {
	userIdentity: string
	roomIdentity: string
	data: any
	createdTime: number | string
	updatedTime: number | string
}

// 学院列表
type CollegeList = {
	inputValue?: string
	name: string
	info: string
}

// 专业列表
type Specialty = {
	name: string
	college: string
	code: string
}
