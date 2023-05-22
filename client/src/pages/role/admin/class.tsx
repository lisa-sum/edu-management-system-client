import {Box} from '@mui/material'
import {useState} from 'react'

import SelectClass from '@/components/selectClass'
import SelectCollege from '@/components/selectCollege'
import SelectSpecialty from '@/components/selectSpecialty'

export default function Class() {
  const [college, setCollege] = useState<string>('')
  const [specialty, setSpecialty] = useState<string>('')

  const updateCollege = (newValue: string) => {
    setCollege(newValue)
  }

  const updateSpecialty = (newSpecialty: string) => {
    setSpecialty(newSpecialty)
  }

  return (
    <Box>
      <SelectCollege updateCollege={updateCollege} />
      <SelectSpecialty
        college={college}
        updateSpecialty={updateSpecialty}
      />
      <SelectClass specialty={specialty} />
    </Box>
  )
}
