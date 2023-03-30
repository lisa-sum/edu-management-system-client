import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

import type { ClassList } from '@/type'
import { fetcher } from '@/utils/fether'

export default function SelectClass({ specialty }: { specialty: string }) {
	const [options, setOptions] = useState<readonly ClassList[]>([])

	console.log(options)
	useEffect(() => {
		fetcher(import.meta.env.VITE_APP_CLASS, 'GET', specialty)
			.then((res) => {
				console.log(res)
				// console.log(res.json())
				console.log(res.body)
				setOptions(res.body)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [specialty])

	return (
		<Autocomplete
			disablePortal
			getOptionLabel={(option) => option.className}
			id="select-class"
			options={options}
			renderInput={(params) => (
				<TextField
					{...params}
					label="选择班级"
				/>
			)}
			sx={{ width: '400px' }}
		/>
	)
}
