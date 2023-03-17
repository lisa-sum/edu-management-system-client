import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'

import { getCollegeList } from '@/api/college'
import { CollegeList } from '@/type'

export default function CreateOptionDialog({ setCollegeType }: { setCollegeType: Dispatch<SetStateAction<string>> }) {
	const [open, setOpen] = useState(false)
	const [options, setOptions] = useState<readonly CollegeList[]>([])
	const loading = open && options.length === 0

	useEffect(() => {
		//		let active = true
		getCollegeList()
			.then((res: CollegeList[]) => {
				console.log(res)
				setOptions([...res])
			})
			.catch((err) => {
				console.error(err)
			})

		if (!loading) {
			return undefined
		}
	}, [loading])

	useEffect(() => {
		if (!open) {
			setOptions([])
		}
	}, [open])

	return (
		<Autocomplete
			getOptionLabel={(option) => option.name}
			id="asynchronous-demo"
			isOptionEqualToValue={(option, value) => option.info === value.info}
			loading={loading}
			open={open}
			options={options}
			renderInput={(params) => (
				<TextField
					{...params}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
					label="学院类别"
				/>
			)}
			sx={{ width: 300 }}
			onChange={(_event: SyntheticEvent<Element, Event>, newValue: CollegeList | null) => {
				setCollegeType(newValue?.name || '')
			}}
			onClose={() => {
				setOpen(false)
			}}
			onOpen={() => {
				setOpen(true)
			}}
		/>
	)
}
