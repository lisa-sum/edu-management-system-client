import { Box, List, ListItem } from '@mui/material'

export default function InputAssist() {
	const menuList = [
		{ icon: '1', text: '1' },
		{ icon: '2', text: '2' },
		{ icon: '3', text: '3' },
		{ icon: '4', text: '4' },
	]
	return (
		<List
			sx={{
				width: '280px',
				columnCount: 4,
			}}
		>
			{menuList.map((item) => (
				<ListItem key={item.text}>
					<Box
						alt={item.text}
						component="img"
						src={item.icon}
					/>
				</ListItem>
			))}
		</List>
	)
}
