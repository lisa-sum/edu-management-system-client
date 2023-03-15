import { Avatar, Box, Input, InputLabel, List, ListItem, Typography } from '@mui/material'
import { useState } from 'react'

import InputAssist from '@/components/inputAssist'
import SendMessage from '@/components/SendMessage'
import { RootState } from '@/store/index'
import { MessageBasic } from '@/type'
import { useAppSelector } from '@/utils/hooks/index'

export default function Room() {
	const messageList = useAppSelector((state: RootState) => state.message.value.messageList)
	const [chatBarList] = useState<{ text: string }[]>([{ text: '聊天' }, { text: '简介' }])

	const { roomNumber } = useAppSelector((state: RootState) => state.room.value)
	const { account, avatar } = useAppSelector((state: RootState) => state.profile.value)
	const [msg, setMsg] = useState<MessageBasic>({
		userIdentity: '',
		roomIdentity: '',
		data: undefined,
		createdTime: new Date().getTime(),
		updatedTime: new Date().getTime(),
	})

	const updateMessage = (message: string) => {
		setMsg((state: MessageBasic) => {
			return {
				...state,
				userIdentity: account,
				roomIdentity: roomNumber,
				data: message,
				updatedAt: new Date().getTime(),
			}
		})
	}
	return (
		<>
			<Box
				component="section"
				sx={{
					gridArea: 'main',
					bgcolor: '#fff',
				}}
			>
				<List
					sx={{
						p: 0,
						width: 'auto',
						height: '70px',
						columnCount: 6,
						borderBottom: '1px solid #ccc',
					}}
				>
					{chatBarList.map((item) => (
						<ListItem
							key={item.text}
							sx={{
								height: '70px',
							}}
						>
							<Typography
								sx={{
									lineHeight: '70px',
									color: '#000',
									textAlign: 'center',
									fontSize: '20px',
								}}
							>
								{item.text}
							</Typography>
						</ListItem>
					))}
				</List>

				<List
					sx={{
						overflowY: 'auto',
						minHeight: '410px',
						mt: '0 40px',
					}}
				>
					{messageList.map((message: MessageBasic, index: number) => (
						<ListItem
							key={index}
							sx={{
								width: 'auto',
								height: '85px',
								mb: '40px',
								position: 'relative',
							}}
						>
							<Typography
								sx={{
									position: 'absolute',
									left: '85px',
									top: '10px',
									color: '#ccc',
									fontSize: 20,
								}}
							>
								{message.userIdentity}
							</Typography>
							<Avatar
								alt={message.userIdentity}
								src={avatar}
								sx={{
									position: 'absolute',
									left: '20px',
									top: '20px',
									width: '50px',
									height: '50px',
									borderRadius: '50%',
								}}
							/>
							<Box
								sx={{
									position: 'absolute',
									top: '40px',
									left: '85px',
									bgcolor: '#e5e5e5',
									borderRadius: '12px',
								}}
							>
								<Typography
									sx={{
										m: '15px 15px',
										color: '#000',
										fontSize: 18,
									}}
								>
									{message.data}
								</Typography>
							</Box>
						</ListItem>
					))}
				</List>
			</Box>
			<Box
				component="section"
				sx={{
					gridArea: 'footer',
					bgcolor: 'green',
					position: 'relative',
				}}
			>
				<InputAssist />

				<InputLabel
					focused={true}
					htmlFor="inputMessage"
				>
					<Input
						fullWidth
						id="inputMessage"
						onChange={(event) => updateMessage(event.target.value)}
					/>
				</InputLabel>
				<SendMessage msg={msg} />
			</Box>
		</>
	)
}
