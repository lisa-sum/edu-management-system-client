import { alpha, Box, Button, FormControl, InputBase, InputLabel, styled } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { ChangeEvent, useState } from 'react'

import { updateSpecialtyOne } from '@/api/specialty'
import Grouped from '@/components/grouped'

const GridBox = styled(Grid2)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
	},
}))

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(3),
	},
	'& .MuiInputBase-input': {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
		border: '1px solid #ced4da',
		width: '275px',
		fontSize: 18,
		[theme.breakpoints.down('lg')]: {
			width: '374px',
			fontSize: 18,
		},
		[theme.breakpoints.up('lg')]: {
			width: 'auto',
			minWidth: '300px',
			fontSize: 17,
		},
		[theme.breakpoints.up('xl')]: {
			width: '550px',
			fontSize: 24,
		},
		padding: '10px 12px',
		transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
			borderColor: theme.palette.primary.main,
		},
	},
}))

export default function Specialty() {
	const [oldName, setOldName] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [info, setInfo] = useState<string>('')

	const updateSpecialtyData = async (oldName: string, name: string, info: string) => {
		await updateSpecialtyOne(oldName, name, info)
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.error(err)
			})
	}
	return (
		<Box>
			<GridBox
				container
				spacing={3}
			>
				<Grid2
					lg={6}
					md={12}
				>
					<Grouped setOldName={setOldName} />
				</Grid2>

				<Grid2
					lg={6}
					md={12}
				>
					<FormControl variant="standard">
						<InputLabel
							shrink
							htmlFor="input"
						>
							修改专业名称
						</InputLabel>
						<BootstrapInput
							id="input"
							placeholder="输入新的专业名称"
							onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
						/>
					</FormControl>
				</Grid2>
				<Grid2
					lg={6}
					md={12}
				>
					<FormControl variant="standard">
						<InputLabel
							shrink
							htmlFor="input"
						>
							修改专业介绍
						</InputLabel>
						<BootstrapInput
							id="input"
							placeholder="输入专业介绍"
							onChange={(event: ChangeEvent<HTMLInputElement>) => setInfo(event.target.value)}
						/>
					</FormControl>
				</Grid2>
				<Grid2
					lg={6}
					md={12}
				>
					<Button
						sx={{
							width: '325px',
							height: '46px',
							fontSize: 18,
						}}
						variant="contained"
						onClick={() => updateSpecialtyData(oldName, name, info)}
					>
						提交修改
					</Button>
				</Grid2>
			</GridBox>
		</Box>
	)
}
