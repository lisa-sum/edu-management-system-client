import '../assets/style/register.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const [account, setAccount] = useState<string>('sun')
	const [password, setPassword] = useState<string>('123')
	const [avatar, setAvatar] = useState<string>('avatar')
	const [email, setEmail] = useState<string>('xicon@qq.com')
	const [nickname, setNickname] = useState<string>('s')
	const [gender, setGender] = useState<string>('girl')
	const navigate = useNavigate()

	const submit = () => {
		const userInfo: FormData = new FormData()
		userInfo.append('account', account)
		userInfo.append('password', password)
		userInfo.append('avatar', avatar)
		userInfo.append('email', email)
		userInfo.append('nickname', nickname)
		userInfo.append('gender', gender)
		userInfo.append('createdTime', new Date().getTime().toString())
		userInfo.append('updatedTime', new Date().getTime().toString())

		fetch('http://localhost:4000/register', {
			method: 'PUT',
			body: userInfo,
		})
			.then(async (res) => {
				const body = await res.json()
				if (body.ok) {
					return body
				} else if (body.code === 403) {
					navigate('/register')
				}
				throw new Error('请求失败')
			})
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<form>
			<label htmlFor="account">
				account:
				<input
					id="account"
					name="account"
					type="text"
					value={account}
					onChange={(e) => setAccount(e.target.value)}
				/>
			</label>

			<label htmlFor="password">
				password:
				<input
					id="password"
					name="password"
					type="text"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>

			<label htmlFor="email">
				email:
				<input
					id="email"
					name="email"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>

			<label htmlFor="avatar">
				avatar:
				<input
					id="avatar"
					name="avatar"
					type="text"
					value={avatar}
					onChange={(e) => setAvatar(e.target.value)}
				/>
			</label>

			<label htmlFor="nickname">
				nickname:
				<input
					id="nickname"
					name="nickname"
					type="text"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
				/>
			</label>

			<label htmlFor="gender">
				gender:
				<input
					id="gender"
					name="gender"
					type="text"
					value={gender}
					onChange={(e) => setGender(e.target.value)}
				/>
			</label>

			<button
				type="button"
				onClick={submit}
			>
				Submit
			</button>
		</form>
	)
}
