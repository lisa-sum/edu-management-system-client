import { Box } from '@mui/material'

import SelectClass from '@/components/selectClass'
import SelectCollege from '@/components/selectCollege'
import SelectSpecialty from '@/components/selectSpecialty'

export default function Class() {
	return (
		<Box>
			<SelectCollege />
			<SelectSpecialty />
			<SelectClass specialty="all" />
		</Box>
	)
}
