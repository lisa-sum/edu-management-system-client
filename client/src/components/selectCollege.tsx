import {Autocomplete} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import {useQuery} from '@tanstack/react-query'
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'

import type {College} from '@/type'
import {fetcher} from '@/utils/fether'

export default function SelectCollege({
  setCollegeName,
}: {
  setCollegeName?: Dispatch<SetStateAction<string>>
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<College[]>([])
  const {data, isLoading, isError} = useQuery({
    queryKey: ['food'],
    queryFn: () => {
      return fetcher<College[]>(`${import.meta.env.VITE_APP_COLLEGE}`)('all')
        .then((res) => {
          console.log(res)
          return res.body
        })
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
          console.log(error.body)
          throw new Error(error.message)
        })
    },
  })

  useEffect(() => {
    console.log(isLoading)
    console.log(isError)
    setOptions(data as College[])
    if (data) {
      setLoading(false)
    }
  }, [data, isError, isLoading])

  if (setCollegeName) {
    return (
      <Autocomplete
        getOptionLabel={(option) => option.name}
        id="asynchronous"
        isOptionEqualToValue={(option, value) => option.name === value.name}
        loading={loading}
        open={open}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            label="学院类别"
          />
        )}
        sx={{width: 300}}
        onChange={(
          _event: SyntheticEvent<Element, Event>,
          newValue: College | null,
        ) => {
          setCollegeName(newValue?.name || '')
        }}
        onClose={() => {
          setOpen(false)
        }}
        onOpen={() => {
          setOpen(true)
        }}
      />
    )
  }

  return (
    <Autocomplete
      getOptionLabel={(option) => option.name}
      id="asynchronous"
      isOptionEqualToValue={(option, value) =>
        option.description === value.description
      }
      loading={loading}
      open={open}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          label="学院类别"
        />
      )}
      sx={{width: 300}}
      onClose={() => {
        setOpen(false)
      }}
      onOpen={() => {
        setOpen(true)
      }}
    />
  )
}
