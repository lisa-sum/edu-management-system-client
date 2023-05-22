import {Autocomplete, Box} from '@mui/material'
import TextField from '@mui/material/TextField'
import {useQuery} from '@tanstack/react-query'
import {SyntheticEvent, useState} from 'react'

import type {College} from '@/type'
import {fetcher} from '@/utils/fether'

export default function SelectCollege({
  updateCollege,
}: {
  updateCollege: (newValue: string) => void
}) {
  const [open, setOpen] = useState(false)
  const {data, isLoading, isError} = useQuery({
    queryKey: ['college'],
    queryFn: () => {
      return fetcher<College[]>(import.meta.env.VITE_APP_COLLEGE)('all')
        .then((res) => {
          console.log(res)
          return res.body
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    },
  })

  if (isLoading) {
    return <Box>Loading</Box>
  }

  if (isError) {
    return <Box>Err</Box>
  }

  return (
    <Autocomplete
      getOptionLabel={(option) => option.name}
      id="asynchronous"
      isOptionEqualToValue={(option, value) => option.name === value.name}
      open={open}
      options={data}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: <p>{params.InputProps.endAdornment}</p>,
          }}
          label="学院类别"
        />
      )}
      sx={{width: 300}}
      onChange={(
        _event: SyntheticEvent<Element, Event>,
        newValue: College | null,
      ) => updateCollege(newValue?.name || '')}
      onClose={() => {
        setOpen(false)
      }}
      onOpen={() => {
        setOpen(true)
      }}
    />
  )
}
