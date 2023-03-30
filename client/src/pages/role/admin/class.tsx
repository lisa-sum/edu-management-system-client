import { Box } from '@mui/material'
import { useState } from 'react'

import SelectClass from '@/components/selectClass'
import SelectCollege from '@/components/selectCollege'
import SelectSpecialty from '@/components/selectSpecialty'

export default function Class() {
	const [college, setCollege] = useState<string>('')
	const [specialty] = useState<string>('')

	return (
		<Box>
			<SelectCollege setCollegeType={setCollege} />
			<SelectSpecialty college={college} />
			<SelectClass specialty={specialty} />
		</Box>
	)
}
