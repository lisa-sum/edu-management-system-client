import {
	Alert,
	alpha,
	Box,
	Button,
	FormControl,
	InputBase,
	InputLabel,
	styled,
	Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { ChangeEvent, useState } from 'react'

import { addCollege, deleteCollege, updateCollege } from '@/api/college'
import SelectCollege from '@/components/selectCollege'
import type { Status } from '@/type'

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
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow',
		]),
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

const updateCollegeData = async (
	collegeType: string,
	collegeName: string,
	collegeInfo: string,
) => {
	await updateCollege(collegeType, collegeName, collegeInfo)
		.then((res) => {
			console.log(res)
		})
		.catch((err) => {
			console.error(err)
		})
}

export default function College() {
	const [collegeType, setCollegeType] = useState<string>('')
	const [collegeInfo, setCollegeInfo] = useState<string>('')
	const [collegeName, setCollegeName] = useState<string>('')
	const [show, setShow] = useState<boolean>(false)
	const [status, setStatus] = useState<Status<any>>({
		code: 200,
		message: '',
		body: '',
		state: 'success',
	})
	const addCollegeData = async (collegeName: string, collegeInfo: string) => {
		if (collegeName === '' || collegeInfo === '') {
			setShow(true)
			setStatus({
				code: 201,
				body: '',
				state: 'error',
				message: '数据不能为空, 请输入数据!',
			})
			return
		}
		await addCollege(collegeName, collegeInfo)
			.then((res) => {
				console.log(res)
				setShow(true)
				if (res.code === 409) {
					setStatus({
						state: 'info',
						...res,
					})
				}
				setStatus(res)
			})
			.catch((err) => {
				setStatus({
					state: 'error',
					...err,
				})
				console.error(err)
			})
	}

	const deleteCollegeData = async (collegeType: string) => {
		await deleteCollege(collegeType)
			.then((res) => {
				console.log(res)
				if (res.body.DeletedCount === 0) {
					console.log(1)
					setStatus({
						code: 201,
						body: '',
						message: '该数据已经删除, 请刷新页面',
						state: 'info',
					})
					return
				}
				setShow(true)
				setStatus(res)
			})
			.catch((err) => {
				setStatus({
					state: 'error',
					...err,
				})
				console.error(err)
			})
	}
	return (
		<Box>
			{show && (
				<Alert
					severity={status.state}
					onClose={() => setShow(false)}
				>
					{status.message}
				</Alert>
			)}
			<GridBox
				container
				spacing={3}
			>
				<Grid2
					lg={6}
					md={12}
				>
					<Typography>更新学院</Typography>
				</Grid2>
				<Grid2
					lg={6}
					md={12}
				>
					<SelectCollege setCollegeType={setCollegeType} />
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
							学院名称
						</InputLabel>
						<BootstrapInput
							id="input"
							placeholder="输入新学院名称"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setCollegeName(event.target.value)
							}
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
							学院介绍
						</InputLabel>
						<BootstrapInput
							id="input"
							placeholder="输入新学院介绍"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setCollegeInfo(event.target.value)
							}
						/>
					</FormControl>

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
							onClick={() =>
								updateCollegeData(collegeType, collegeName, collegeInfo)
							}
						>
							更新
						</Button>
					</Grid2>
				</Grid2>

				<Grid2
					lg={6}
					md={12}
				>
					<Typography>添加学院</Typography>
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
							学院名称
						</InputLabel>
						<BootstrapInput
							id="input"
							placeholder="输入新学院名称"
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
							学院介绍
						</InputLabel>
						<BootstrapInput
							id="input"
							placeholder="输入新学院介绍"
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
						onClick={() => addCollegeData(collegeInfo, collegeName)}
					>
						添加
					</Button>
				</Grid2>

				<Grid2
					lg={6}
					md={12}
				>
					<Typography>添加学院</Typography>
				</Grid2>

				<Grid2
					lg={6}
					md={12}
				>
					<SelectCollege setCollegeType={setCollegeType} />
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
						onClick={() => deleteCollegeData(collegeType)}
					>
						删除
					</Button>
				</Grid2>
			</GridBox>
		</Box>
	)
}
