import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getSpecialtyList } from '@/api/getSpecialtyList'
import { updateSpecialty } from '@/features/user/specialty'
import { RootState } from '@/store/index'
import { Specialty } from '@/type/index'
import { useAppDispatch } from '@/utils/hooks/index'

export default function Grouped({ setOldName }: { setOldName: Dispatch<SetStateAction<string>> }) {
	const setSpecialtyList = useSelector((state: RootState) => state.specialty.value.specialtyList)
	const dispatch = useAppDispatch()
	useEffect(() => {
		getSpecialtyList('all')
			.then((res) => {
				dispatch(updateSpecialty(res.body))
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	//	const options = setSpecialtyList.map((option) => {
	//		return {
	//			...option,
	//		}
	//	})

	return (
		<Autocomplete
			getOptionLabel={(option) => option.name}
			groupBy={(option) => option.college}
			id="grouped-demo"
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
			onChange={(_, value: Specialty | null) => setOldName(value?.name || '')}
		/>
	)
}
