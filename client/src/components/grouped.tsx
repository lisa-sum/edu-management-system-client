import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect } from 'react'
import { getSpecialtyList } from '@/api/getSpecialtyList'
import { useAppDispatch } from '@/utils/hooks/index'
import { updateSpecialty } from '@/features/user/specialty'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'

export default function Grouped() {
	const setSpecialtyList = useSelector((state: RootState) => state.specialty.value.specialtyList)
	const dispatch = useAppDispatch()
	useEffect(() => {
		getSpecialtyList()
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
			id="grouped-demo"
			options={setSpecialtyList}
			groupBy={(option) => option.college}
			getOptionLabel={(option) => option.name}
			sx={{
				width: '400px',
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label="选择一个专业"
				/>
			)}
		/>
	)
}
