import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Box, styled, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthLogin } from '@/api/login'
import student from '@/assets/images/团队-1.svg'
import defaultAvatar from '@/assets/images/头像-默认.svg'
import { pwdVerifyRex, usrVerifyRex } from '@/config/verify'
import { toggleRole, updateUserInfo } from '@/features/user/profile'
import { useAppDispatch } from '@/utils/hooks/index'

const LoginSubmit = ({
	usr,
	pwd,
	loading,
	setLoading,
	setLoadingIndicator,
	setErrorStatus,
}: {
	usr: string
	pwd: string
	loading: boolean
	setLoading: (boolean: boolean) => void
	setLoadingIndicator: (statusText: string) => void
	setErrorStatus: (status: boolean) => void
}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const getProfile = (usr: string, pwd: string, setLoading: (boolean: boolean) => void) => {
		setLoading(true)
		getAuthLogin(usr, pwd)
			.then((res) => {
				setLoadingIndicator(res.message)
				setLoading(false) // 按钮禁用状态
				const { role, username, account, avatar } = res.body.data
				dispatch(updateUserInfo({ role, account, username, avatar }))
				localStorage.setItem('token', res.body.token) // 设置token
				toggleRole(role) // 切换到对应用户角色
				navigate('/') // 跳转到首页
				return res.body.token
			})
			// 获取用户角色权限
			.then((token: string | null) => {
				if (!token) {
					throw new Error('未获取到token')
				}
			})
			.catch((err) => {
				setLoadingIndicator(err.message || '请求失败, 检查网络')
				setErrorStatus(false)
				localStorage.removeItem('token')
				console.error(err)
			})
	}

	return (
		<LoadingButton
			loading={loading}
			loadingIndicator="登录中..."
			sx={{ width: '200px' }}
			variant="outlined"
			onClick={() => {
				setLoading(true)
				getProfile(usr, pwd, setLoading)
			}}
		>
			Submit
		</LoadingButton>
	)
}
const Align = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}))

const LoginBox = styled(Box)(({ theme }) => ({
	width: '80vw',
	height: '80vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	margin: '0 auto',
	[theme.breakpoints.down('md')]: {
		width: '350px',
		margin: '0 auto',
		columnCount: 1,
	},
}))

const InputBox = styled(Box)(({ theme }) => ({
	width: '40vw',
	height: '80vh',
	[theme.breakpoints.down('md')]: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'space-between',
		flexDirection: 'column',
	},
}))

export default function Login() {
	const [usr, setUsr] = useState<string>('')
	const [pwd, setPwd] = useState<string>('')
	const [usrErr, setUsrErr] = useState<boolean>(false) // 账号是否校验错误
	const [pwdErr, setPwdErr] = useState<boolean>(false) // 密码是否校验错误
	const [usrInputStatus, setUsrInputStatus] = useState<boolean>(false) // 账号是否校验错误的边框提示
	const [pwdInputStatus, setPwdInputStatus] = useState<boolean>(false) // 密码是否校验错误的边框提示
	const [usrHelperText, setUsrHelperText] = useState<string>('请输入账号') // 账号是否校验错误的文字提示
	const [pwdHelperText, setPwdHelperText] = useState<string>('请输入账号') // 密码是否校验错误的文字提示
	const [loading, setLoading] = useState<boolean>(false) // 登录按钮的进度提示
	const [loadingIndicator, setLoadingIndicator] = useState<string>('网络链接失败!') // 登录按钮的登录状态文字提示
	const [errorStatus, setErrorStatus] = useState<boolean>(false) // 登录异常的状态

	// 账号校验
	const usrHandle = (event: string) => {
		setUsr(event)
		setUsrErr(true)
		setUsrInputStatus(true)
		setUsrHelperText('4-16位数字字母!')
		setUsrHelperText('4-16位数字字母!')

		// 校验成功
		if (usrVerifyRex.test(event)) {
			setUsrErr(false)
			setUsrHelperText('账号规则正确')
		}
	}

	// 密码校验
	const pwdHandle = (event: string) => {
		setPwdErr(true)
		setPwdInputStatus(true)
		setPwdHelperText('至少6位数字！')
		setPwd(event)

		// 校验成功
		if (pwdVerifyRex.test(event)) {
			setPwdErr(false)
			setPwdHelperText('密码规则正确')
		}
	}

	return (
		<Box>
			{errorStatus ? (
				<Alert severity="error">
					<AlertTitle>错误!</AlertTitle>
					<Typography>{loadingIndicator}</Typography>
				</Alert>
			) : null}

			<LoginBox>
				<Align>
					<Box
						alt="插画"
						component="img"
						src={student}
						sx={{
							display: 'block',
							width: '40vw',
							height: '80vh',
						}}
					/>
				</Align>
				<InputBox>
					<Box
						sx={{
							width: '40vw',
							maxWidth: '400px',
							height: '150px',
							position: 'relative',
						}}
					>
						<Box
							alt="defaultAvatar"
							component="img"
							src={defaultAvatar}
							sx={{
								position: 'absolute',
								left: '50%',
								transform: 'translateX(-50%)',
								width: '150px',
								height: '150px',
								borderRadius: '7px',
							}}
						/>
					</Box>

					<Box
						sx={{
							width: '40vw',
						}}
					>
						<TextField
							color={usrInputStatus ? 'success' : 'warning'}
							error={usrErr}
							helperText={usrHelperText}
							label="账号/邮箱"
							sx={{
								minHeight: '50px',
								mt: '50px',
								width: '40vw',
								maxWidth: ' 450px',
							}}
							variant="standard"
							onChange={(event: ChangeEvent<HTMLInputElement>) => usrHandle(event.currentTarget.value)}
						/>

						<TextField
							color={pwdInputStatus ? 'success' : 'warning'}
							error={pwdErr}
							helperText={pwdHelperText}
							label="密码"
							sx={{
								minHeight: '50px',
								mt: '50px',
								width: '40vw',
								maxWidth: ' 450px',
							}}
							type="password"
							variant="standard"
							onChange={(event: ChangeEvent<HTMLInputElement>) => pwdHandle(event.currentTarget.value)}
						/>
					</Box>

					<Box
						sx={{
							width: '40vw',
							mt: '60px',
							columnCount: 2,
						}}
					>
						<Typography>忘记密码?</Typography>
						<LoginSubmit
							loading={loading}
							pwd={pwd}
							setErrorStatus={setErrorStatus}
							setLoading={setLoading}
							setLoadingIndicator={setLoadingIndicator}
							usr={usr}
						/>
					</Box>
				</InputBox>
			</LoginBox>
		</Box>
	)
}
