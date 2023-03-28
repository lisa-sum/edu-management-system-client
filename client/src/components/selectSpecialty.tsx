import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getSpecialty } from '@/api/specialty'
import { updateSpecialtyList } from '@/features/user/specialty'
import { RootState } from '@/store/index'
import { Specialty } from '@/type/index'
import { useAppDispatch } from '@/utils/hooks/index'

export default function SelectSpecialty({ setName }: { setName?: Dispatch<SetStateAction<string>> }) {
	const setSpecialtyList = useSelector((state: RootState) => state.specialty.value.specialtyList)
	const dispatch = useAppDispatch()
	useEffect(() => {
		;(async () => {
			await getSpecialty()
				.then((res) => {
					dispatch(updateSpecialtyList(res.body))
				})
				.catch((err) => {
					console.error(err)
				})
		})()
	}, [dispatch])

	if (setName) {
		return (
			<Autocomplete
				getOptionLabel={(option) => option.name}
				groupBy={(option) => option.college}
				id="grouped"
				options={setSpecialtyList}
				renderInput={(params) => (
					<TextField
						{...params}
						label="选择一个专业"
					/>
				)}
				sx={{
					width: '400px',
				}}
				onChange={(_, value: Specialty | null) => setName(value?.name || '')}
			/>
		)
	}

	return (
		<Autocomplete
			getOptionLabel={(option) => option.name}
			groupBy={(option) => option.college}
			id="grouped"
			options={setSpecialtyList}
			renderInput={(params) => (
				<TextField
					{...params}
					label="选择一个专业"
				/>
			)}
			sx={{
				width: '400px',
			}}
		/>
	)
}
