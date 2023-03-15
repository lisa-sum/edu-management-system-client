import { Alert, AlertTitle, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AppBar from '@/components/Layout/AppBar'
import { toggleRole } from '@/features/user/profile'
import Chat from '@/pages/im/chat'
import Login from '@/pages/Login'
// Admin Page
import Class from '@/pages/role/admin/class'
import College from '@/pages/role/admin/college'
import Mark from '@/pages/role/admin/mark'
import Register from '@/pages/role/admin/register'
import Specialty from '@/pages/role/admin/specialty'
import Teacher from '@/pages/role/admin/teacher'
// Admin Page End
// Student Page Start
import ApplyForClassRoom from '@/pages/role/student/ApplyForClassRoom/index'
import DropOut from '@/pages/role/student/DropOut/index'
import Inquiry from '@/pages/role/student/Inquiry/index'
import Profile from '@/pages/role/student/Profile'
import Schedule from '@/pages/role/student/Schedule/index'
// Student Page End
import { RootState } from '@/store/index'
import { RouteList } from '@/type'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/index'

// Teacher Router
const teacherRoutes: RouteList[] = [
	{ element: <Profile />, path: '/profile', label: '个人' },
	{ element: <Schedule />, path: '/schedule', label: '课程表' },
	{ element: <ApplyForClassRoom />, path: '/applyForClassRoom', label: '教室申请' },
	{ element: <Mark />, path: '/mark', label: '开设课程' },
	{ element: <Chat />, path: '/ws/chat', label: '即时聊天' },
	{ element: <Login />, path: '/login', label: '登录' },
]

// Student Router
const studentRoutes: RouteList[] = [
	{ element: <Register />, path: '/register', label: '注册' },
	{ element: <Profile />, path: '/profile', label: '个人' },
	{ element: <Mark />, path: '/mark', label: '课程管理' },
	{ element: <DropOut />, path: '/dropOut', label: '退课' },
	{ element: <Schedule />, path: '/schedule', label: '课程表' },
	{ element: <Inquiry />, path: '/inquiry', label: '成绩查询' },
	{ element: <Chat />, path: '/ws/chat', label: '即时聊天' },
	{ element: <Login />, path: '/login', label: '登录' },
]

// Admin Router
const adminRoutes: RouteList[] = [
	{ element: <College />, path: '/college', label: '学院管理' },
	{ element: <Specialty />, path: '/specialty', label: '专业管理' },
	{ element: <Class />, path: '/class', label: '班级管理' },
	{ element: <Mark />, path: '/mark', label: '课程管理' },
	{ element: <Teacher />, path: '/registration', label: '教师管理' },
	{ element: <Chat />, path: '/ws/chat', label: '即时聊天' },
	{ element: <Login />, path: '/login', label: '登录' },
]

const Role = ({
	roleName,
	show,
	setShow,
	username,
	routes,
}: {
	roleName: string
	show: boolean
	setShow: (bool: boolean) => void
	username: string
	routes: RouteList[]
}) => {
	return (
		<>
			{!show && (
				<Alert onClose={() => setShow(true)}>
					登录成功，欢迎您！{username}, 您的账号权限是: {roleName}角色{' '}
				</Alert>
			)}
			{/* <AppBar /> */}
			<AppBar routes={routes} />
		</>
	)
}
export default function Layout() {
	const { role, username } = useAppSelector((state: RootState) => state.profile.value) // 权限验证
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [show, setShow] = useState<boolean>(false) // 关闭按钮
	let routes = []

	switch (role) {
		case 'admin':
			routes = adminRoutes
			return (
				<Role
					roleName="管理员"
					routes={routes}
					setShow={setShow}
					show={show}
					username={username}
				/>
			)
		case 'teacher':
			routes = teacherRoutes
			return (
				<Role
					roleName="教师"
					routes={routes}
					setShow={setShow}
					show={show}
					username={username}
				/>
			)
		case 'student':
			routes = studentRoutes
			return (
				<Role
					roleName="学生"
					routes={routes}
					setShow={setShow}
					show={show}
					username={username}
				/>
			)
		case 'visitor':
			return <Login />
		// 未登录状态(访客)
		default:
			return (
				<Alert severity="info">
					<AlertTitle>提示</AlertTitle>
					你还没有登录,请
					<Button
						onClick={() => {
							dispatch(toggleRole('visitor'))
							navigate('login')
						}}
					>
						登录
					</Button>
				</Alert>
			)
	}
}
