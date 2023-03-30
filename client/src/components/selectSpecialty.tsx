import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

import type { Specialty as SpecialtyType } from '@/type'
import { fetcher } from '@/utils/fether'

export default function SelectSpecialty({ college }: { college?: string }) {
	const [specialtyList, setSpecialtyList] = useState<SpecialtyType[]>([])

	if (college) {
		fetcher(`${import.meta.env.VITE_APP_SPECIALTY}?college=${college}`).then(async (res) => {
			setSpecialtyList(res.body)
		})
	}
	useEffect(() => {
		fetcher(`${import.meta.env.VITE_APP_SPECIALTY}?query=all`).then(async (res) => {
			setSpecialtyList(res.body)
		})
	}, [])

	return (
		<Autocomplete
			disablePortal
			getOptionLabel={(option) => option.name}
			id="select-class"
			options={specialtyList}
			renderInput={(params) => (
				<TextField
					{...params}
					label="选择专业"
				/>
			)}
			sx={{ width: '400px' }}
		/>
	)
}
