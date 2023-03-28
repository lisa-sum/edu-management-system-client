import { Autocomplete, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

import { getClass } from '@/api/class'
import { ClassList } from '@/type'

export default function SelectClass({ specialty }: { specialty: string }) {
	const [options, setOptions] = useState<readonly ClassList[]>([])

	useEffect(() => {
		getClass(specialty)
			.then((res) => {
				console.log(res)
				setOptions([...res.body])
			})
			.catch((err) => {
				console.error(err)
			})
	})

	return (
		<Autocomplete
			disablePortal
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
