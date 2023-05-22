import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import {useQuery} from '@tanstack/react-query'

import type {ClassList} from '@/type'
import {fetcher} from '@/utils/fether'

const getClassList = (specialty: string) => {
  return fetcher<ClassList[]>(import.meta.env.VITE_APP_CLASS)({
    'specialty': specialty,
  })
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.error(err)
    })
}

const ShowClass = ({specialty}: {specialty: string}) => {
  const {data, isLoading} = useQuery<ClassList[]>(['getClassList'], () =>
    getClassList(specialty),
  )

  if (isLoading) {
    return <p>Loading</p>
  }

  if (data) {
    return (
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        id="select-class"
        options={data}
        renderInput={(params) => (
          <TextField
            {...params}
            label="选择班级"
          />
        )}
        sx={{width: '400px'}}
      />
    )
  }
  return <p>Error</p>
}

export default function SelectClass({specialty}: {specialty: string}) {
  if (specialty !== '') {
    return <ShowClass specialty={specialty} />
  }

  return <p>请选择专业</p>
}
