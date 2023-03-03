import { Send as SendIcon } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

import { updateMessage } from '@/features/im/message'
import { useAppDispatch } from '@/utils/hooks/index'
import { messageBasic } from '@/utils/message'

export default function SendMessage({ msg }: { msg: MessageBasic }) {
	const dispatch = useAppDispatch()
	const sendMessage = (msg: MessageBasic) => {
		const ws: WebSocket = new WebSocket(import.meta.env.VITE_APP_WS_IM)
		ws.onopen = () => {
			ws.send(messageBasic(msg))
		}
		ws.onmessage = (event: MessageEvent<any>) => {
			dispatch(updateMessage(event.data))
		}
		ws.onerror = () => {
			console.info('WebSocket连接异常!')
		}
		ws.onclose = () => {
			console.info('WebSocket连接关闭!')
		}
	}
	return (
		<Box
			sx={{
				position: 'absolute',
				width: '130px',
				height: '40px',
				right: '20px',
				bottom: '20px',
			}}
		>
			<Button
				endIcon={<SendIcon />}
				sx={{
					color: '#fff',
					height: '40px',
					lineHeight: '40px',
				}}
				variant="contained"
				onClick={() => sendMessage(msg)}
			>
				发送(S)
			</Button>
		</Box>
	)
}
